import asyncio
from flask import Flask, request, jsonify
from flask_cors import CORS
from yandex_music import ClientAsync

app = Flask(__name__)
CORS(app)

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


if __name__ == '__main__':
    app.run(debug=True, port=8000)