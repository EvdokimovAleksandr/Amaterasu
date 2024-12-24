import api from 'Api/api'

export async function postRequestSpotifyAddTracks({ accessToken, playlistName, tracks }) {
  const response = await api.post(
    `/api/create_playlist_with_tracks`,
    {
      playlist_name: playlistName,
      tracks: tracks.slice(0, 100),
    },
    {
      headers: {
        Authorization: accessToken, // Передаем токен через заголовок
      },
    }
  )
  return response
}
