import { getRequestLikeTracksYM } from 'Api/ApiYM/GET-likedTracks'
import { call, put, takeEvery } from 'redux-saga/effects'
import { GET_LIST_ACTION_YM, getListActionYm } from './../../Actions/YMActions'

function* getListYMWorker(action) {
  try {
    console.log(1)

    const data = yield call(getRequestLikeTracksYM, action.payload)
    console.log(data)
  } catch (error) {
    console.log(error)
  }
}

export default function* YMWatcher() {
  console.log(GET_LIST_ACTION_YM)

  yield takeEvery(GET_LIST_ACTION_YM, getListYMWorker)
}
