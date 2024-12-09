import { getRequestLikeTracksYM } from 'Api/ApiYM/GET-likedTracks'
import { call, put, takeLatest } from 'redux-saga/effects'
import { GET_LIST_ACTION_YM, responseListLikedYm } from './../../Actions/YMActions'

function* getListYMWorker(action) {
  try {
    const data = yield call(getRequestLikeTracksYM, action.payload)

    if (data.status === 200) {
      yield put(responseListLikedYm(data?.data.liked_tracks))
    }
  } catch (error) {
    console.log(error)
  }
}

export function* YMWatcher() {
  yield takeLatest(GET_LIST_ACTION_YM, getListYMWorker)
}
