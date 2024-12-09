import api from 'Api/api'

export async function getRequestLikeTracksYM(query) {
  const response = await api.get(`/api/liked_tracks`, query, {
    headers: {
      Authorization: query.token,
    },
  })
  return response
}
