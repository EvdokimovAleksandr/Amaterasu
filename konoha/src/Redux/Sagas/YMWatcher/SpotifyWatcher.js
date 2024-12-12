import { takeLatest } from 'redux-saga/effects'
import { GET_LIST_ACTION_YM, responseListLikedYm } from './../../Actions/YMActions'

function* AuthSpotifyWorker(action) {
  try {
    // const data = yield call(getRequestLikeTracksYM, action.payload)
    // if (data.status === 200) {
    //   yield put(responseListLikedYm(data?.data.liked_tracks))
    // }
  } catch (error) {
    console.log(error)
  }
}

export function* SpotifyWatcher() {
  yield takeLatest(GET_LIST_ACTION_YM, AuthSpotifyWorker)
}
