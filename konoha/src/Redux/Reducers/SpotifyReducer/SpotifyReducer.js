import { POST_TRANSFER_TO_SPOTIFY, SUCCESS_AUTH_SPOTIFY } from './../../Actions/SpotifyActions'

const initialState = {
  list: [],
  headersSpotify: null,
  authRequest: false,
  postRequest: false,
  namePlaylist: '',
}

export default function SpotifyReducer(state = initialState, { type, payload }) {
  switch (type) {
    case SUCCESS_AUTH_SPOTIFY:
      return {
        ...state,
        authRequest: false,
        headersSpotify: payload,
      }

    case POST_TRANSFER_TO_SPOTIFY:
      return {
        ...state,
        postRequest: true,
      }

    default:
      return state
  }
}
