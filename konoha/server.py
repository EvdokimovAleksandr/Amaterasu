import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
from yandex_music import ClientAsync
import requests

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

# Создание нового плейлиста
@app.route('/api/create_playlist', methods=['POST'])
def create_playlist():
    data = request.json
    user_id = data.get('user_id')
    playlist_name = data.get('playlist_name')
    description = data.get('description', '')
    token = request.headers.get('Authorization')

    if not (user_id and playlist_name and token):
        return jsonify({'error': 'Missing required fields'}), 400

    url = f"https://api.spotify.com/v1/users/{user_id}/playlists"
    payload = {
        "name": playlist_name,
        "description": description,
        "public": False
    }
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return jsonify(response.json())
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 400

# Добавление треков в плейлист
@app.route('/api/add_tracks', methods=['POST'])
def add_tracks():
    data = request.json
    playlist_id = data.get('playlist_id')
    tracks = data.get('tracks')
    token = request.headers.get('Authorization')

    if not (playlist_id and tracks and token):
        return jsonify({'error': 'Missing required fields'}), 400

    url = f"https://api.spotify.com/v1/playlists/{playlist_id}/tracks"
    payload = {"uris": tracks}
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }

    try:
        response = requests.post(url, json=payload, headers=headers)
        response.raise_for_status()
        return jsonify({'message': 'Tracks added successfully'})
    except requests.exceptions.RequestException as e:
        return jsonify({'error': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8000)