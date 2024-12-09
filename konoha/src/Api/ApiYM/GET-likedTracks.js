import api from 'Api/api'

export async function getRequestLikeTracksYM(query) {
  const response = await api.get(`/api/liked_tracks`, {
    headers: {
      Authorization: query.token,
    },
  })
  return response
}
