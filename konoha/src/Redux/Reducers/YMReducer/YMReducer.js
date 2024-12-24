import { CLEAR_DATA_YM, GET_LIST_ACTION_YM, RESPONSE_LIST_LIKED_YM } from './../../Actions/YMActions'

const initialState = {
  list: [],
  requestGet: false,
}

export default function YMReducer(state = initialState, { type, payload }) {
  switch (type) {
    case GET_LIST_ACTION_YM:
      return {
        ...state,
        requestGet: true,
      }

    case RESPONSE_LIST_LIKED_YM:
      return {
        ...state,
        requestGet: false,
        list: payload,
      }

    case CLEAR_DATA_YM:
      return {
        ...state,
        list: [],
      }

    default:
      return state
  }
}
