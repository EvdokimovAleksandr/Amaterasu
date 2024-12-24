import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
from yandex_music import ClientAsync
import requests
import time

import logging

logging.basicConfig(
    level=logging.INFO,  # Устанавливаем уровень логирования
    format="%(asctime)s - %(levelname)s - %(message)s",
    handlers=[
        logging.StreamHandler()  # Логи выводятся в терминал
    ]
)

app = Flask(__name__)
CORS(app)

# =============================
# API для работы с Яндекс Музыкой
# =============================

# Маршрут для получения понравившихся треков
@app.route('/api/liked_tracks', methods=['GET'])
def get_liked_tracks():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'status': 'error', 'message': 'Missing token'}), 401

    try:
        # Асинхронный вызов функции для получения треков
        tracks_data = asyncio.run(fetch_liked_tracks(token))
        return jsonify({'status': 'success', 'liked_tracks': tracks_data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400


async def fetch_liked_tracks(token):
    client = await ClientAsync(token).init()

    # Получаем список понравившихся треков
    liked_tracks = await client.users_likes_tracks()
    fetched = await liked_tracks.fetch_tracks_async()

    # Формируем список треков
    results = []
    for track in fetched:
        if track:
            title = track.title
            artists = ", ".join(artist.name for artist in track.artists)
            results.append({'title': title, 'artists': artists})
    return results

# =============================
# API для работы с Spotify
# =============================

CLIENT_ID = '54e94f78b3704be5b0e7c5ad5d57a8db'
CLIENT_SECRET = '074d749de3df441a8f6e6bc5278258d3'
REDIRECT_URI = 'http://localhost:3000/callback'

@app.route('/api/get_access_token', methods=['POST'])
def get_access_token():
    data = request.json
    auth_code = data.get('auth_code')

    if not auth_code:
        return jsonify({'error': 'Missing authorization code'}), 400

    url = "https://accounts.spotify.com/api/token"
    payload = {
        "grant_type": "authorization_code",
        "code": auth_code,
        "redirect_uri": REDIRECT_URI,
        "client_id": CLIENT_ID,
        "client_secret": CLIENT_SECRET
    }
    headers = {"Content-Type": "application/x-www-form-urlencoded"}

    try:
        # Логирование запроса
        app.logger.info(f"Request URL: {url}")
        app.logger.info(f"Payload: {payload}")
        app.logger.info(f"Headers: {headers}")

        response = requests.post(url, data=payload, headers=headers)

        # Логирование ответа
        app.logger.info(f"Response status code: {response.status_code}")
        app.logger.info(f"Response text: {response.text}")

        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        # Логирование ошибки
        app.logger.error(f"Request failed: {str(e)}")
        return jsonify({'error': str(e)}), 400


@app.route('/api/create_playlist_with_tracks', methods=['POST'])
def create_playlist_with_tracks():
    data = request.json
    playlist_name = data.get('playlist_name')
    tracks = data.get('tracks')  # Список объектов { "title": "Song Title", "artists": "Artist Name" }
    token = request.headers.get('Authorization')

    if not (playlist_name and tracks and token):
        logging.error("Missing required fields: playlist_name=%s, tracks=%s, token=%s", playlist_name, tracks, token)
        return jsonify({'error': 'Missing required fields'}), 400

    logging.info("ТОКЕН: %s", token)

    # 1. Получить ID пользователя
    user_url = "https://api.spotify.com/v1/me"
    headers = {"Authorization": f"Bearer {token}"}

    try:
        logging.info("Fetching user ID from Spotify...")
        user_response = requests.get(user_url, headers=headers)
        user_response.raise_for_status()
        user_id = user_response.json().get('id')
        logging.info("User ID fetched successfully: %s", user_id)
        if not user_id:
            logging.error("Failed to fetch user ID: response=%s", user_response.json())
            return jsonify({'error': 'Failed to fetch user ID'}), 400
    except requests.exceptions.RequestException as e:
        logging.error("Error fetching user ID: %s", str(e))
        return jsonify({'error': f'Failed to get user ID: {str(e)}'}), 400

    # 2. Поиск URI треков
    search_url = "https://api.spotify.com/v1/search"
    track_uris = []

    for track in tracks:
        query = f"{track['title']} artist:{track['artists']}"
        params = {
            'q': query,
            'type': 'track',
            'limit': 1
        }

        try:
            logging.info("Searching for track: %s by %s", track['title'], track['artists'])
            search_response = requests.get(search_url, headers=headers, params=params)
            search_response.raise_for_status()
            results = search_response.json().get('tracks', {}).get('items', [])
            if results:
                track_uri = results[0]['uri']
                track_uris.append(track_uri)
                logging.info("Track found: %s", track_uri)
            else:
                logging.warning("No results found for track: %s by %s", track['title'], track['artists'])
        except requests.exceptions.RequestException as e:
            logging.error("Error searching for track %s by %s: %s", track['title'], track['artists'], str(e))
            continue  # Переходим к следующему треку

        time.sleep(0.1)  # Минимизируем риск превышения лимита запросов

    if not track_uris:
        logging.error("No tracks found for the given input.")
        return jsonify({'error': 'No tracks found for the given input'}), 400

    # 3. Создать плейлист
    playlist_url = f"https://api.spotify.com/v1/users/{user_id}/playlists"
    playlist_payload = {
        "name": playlist_name,
        "description": "Created via Spotify API with search",
        "public": False
    }

    try:
        logging.info("Creating playlist: %s", playlist_name)
        playlist_response = requests.post(playlist_url, json=playlist_payload, headers=headers)
        playlist_response.raise_for_status()
        playlist_id = playlist_response.json().get('id')
        logging.info("Playlist created successfully: ID=%s", playlist_id)
        if not playlist_id:
            logging.error("Failed to create playlist: response=%s", playlist_response.json())
            return jsonify({'error': 'Failed to create playlist'}), 400
    except requests.exceptions.RequestException as e:
        logging.error("Error creating playlist: %s", str(e))
        return jsonify({'error': f'Failed to create playlist: {str(e)}'}), 400

    # 4. Добавить треки в плейлист
    add_tracks_url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    add_tracks_payload = {"uris": track_uris}

    try:
        logging.info("Adding tracks to playlist: %s", playlist_id)
        add_tracks_response = requests.post(add_tracks_url, json=add_tracks_payload, headers=headers)
        add_tracks_response.raise_for_status()
        logging.info("Tracks added successfully to playlist: %s", playlist_id)
    except requests.exceptions.RequestException as e:
        logging.error("Error adding tracks to playlist: %s", str(e))
        return jsonify({'error': f'Failed to add tracks: {str(e)}'}), 400

    return jsonify({'message': 'Playlist created and tracks added successfully', 'playlist_id': playlist_id})

if __name__ == '__main__':
    app.run(debug=True, port=8000)