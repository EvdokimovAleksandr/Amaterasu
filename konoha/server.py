from flask import Flask, request, jsonify
from flask_cors import CORS
import yandex_music

app = Flask(__name__)
CORS(app)  # Разрешаем запросы с фронтенда

# Маршрут для входа в аккаунт Яндекс.Музыки
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    username = data.get('username')
    password = data.get('password')

    try:
        client = yandex_music.Client.from_credentials(username, password)
        # Вернем токен сессии для последующих запросов
        return jsonify({'status': 'success', 'token': client.access_token})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

# Маршрут для получения плейлистов
@app.route('/api/playlists', methods=['GET'])
def get_playlists():
    token = request.headers.get('Authorization')
    if not token:
        return jsonify({'status': 'error', 'message': 'Missing token'}), 401

    try:
        client = yandex_music.Client(token).init()
        playlists = client.users_playlists_list()
        playlists_data = [{'id': pl.kind, 'title': pl.title} for pl in playlists]
        return jsonify({'status': 'success', 'playlists': playlists_data})
    except Exception as e:
        return jsonify({'status': 'error', 'message': str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=8080)
