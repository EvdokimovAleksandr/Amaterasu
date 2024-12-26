import { call, takeLatest, put } from 'redux-saga/effects'

import { GET_LIST_ACTION_YM, responseListLikedYm } from '../../Actions/YMActions'
import { POST_TRANSFER_TO_SPOTIFY, transferEnd } from '../../Actions/SpotifyActions'

import { postRequestSpotifyAddTracks } from 'Api/ApiSpotify/POST-tracks'

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

function* TransferToSpotifyWorker(action) {
  try {
    const response = yield call(postRequestSpotifyAddTracks, action.payload)

    yield put(
      transferEnd({
        message: response.status == 200 ? response.data.message : 'I CANT LIVE :(',
        status: response.status == 200 ? 'Success' : 'Failed',
        listNotFound: response.data.not_found_tracks || [],
      })
    )
  } catch (error) {
    console.log(error)
  }
}

export function* SpotifyWatcher() {
  yield takeLatest(GET_LIST_ACTION_YM, AuthSpotifyWorker)
  yield takeLatest(POST_TRANSFER_TO_SPOTIFY, TransferToSpotifyWorker)
}
