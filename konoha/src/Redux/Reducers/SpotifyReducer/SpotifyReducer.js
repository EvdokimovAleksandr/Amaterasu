import {
  CLEAR_DATA_SPOTIFY,
  POST_TRANSFER_TO_SPOTIFY,
  SUCCESS_AUTH_SPOTIFY,
  TRANSFER_END,
} from './../../Actions/SpotifyActions'

const initialState = {
  headersSpotify: null,
  authRequest: false,
  postRequest: false,
  endTransfer: false,
  namePlaylist: '',
  notification: {
    message: '',
    status: null,
    listNotFound: [],
  },
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

    case CLEAR_DATA_SPOTIFY:
      return {
        ...state,
        headersSpotify: null,
      }

    case TRANSFER_END:
      return {
        ...state,
        endTransfer: true,
        notification: {
          ...state.notification,
          message: payload.message,
          status: payload.status,
          listNotFound: payload.listNotFound,
        },
      }

    default:
      return state
  }
}
