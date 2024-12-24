import api from 'Api/api'

const CLIENT_ID = '54e94f78b3704be5b0e7c5ad5d57a8db'
const REDIRECT_URI = 'http://localhost:3000/callback'
const SCOPES = [
  'playlist-modify-private',
  'playlist-modify-public',
  'user-read-private',
  'user-read-email',
  'user-library-read',
].join(' ')

export const startSpotifyAuth = () => {
  const authUrl = `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&response_type=code&redirect_uri=${encodeURIComponent(
    REDIRECT_URI
  )}&scope=${encodeURIComponent(SCOPES)}`

  // Перенаправляем пользователя на страницу авторизации Spotify
  window.location.href = authUrl
}

export const handleAuthCallback = async (code) => {
  if (code) {
    try {
      // Отправляем `auth_code` на сервер для обмена на токен
      const response = await api.post('api/get_access_token', {
        auth_code: code,
      })

      // Сохраняем данные в localStorage
      const spotifyData = {
        accessToken: response.data.access_token,
        refreshToken: response.data.refresh_token,
        expiresIn: response.data.expires_in,
        scope: response.data.scope,
        tokenType: response.data.token_type,
      }
      localStorage.setItem('spotifyData', JSON.stringify(spotifyData))

      // Очищаем строку запроса после успешного обмена
      window.history.replaceState({}, document.title, '/')
    } catch (error) {
      console.error('Ошибка при получении токена доступа:', error)
    }
  } else {
    console.error('Код авторизации не найден в URL')
  }
}
