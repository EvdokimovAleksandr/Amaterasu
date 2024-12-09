import { GET_LIST_ACTION_YM } from './../../Actions/YMActions'

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
    default:
      return state
  }
}
