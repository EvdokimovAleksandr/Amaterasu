import { all } from 'redux-saga/effects'
import { YMWatcher } from './YMWatcher/YMWatcher'
import { SpotifyWatcher } from './SpotifyWatcher/SpotifyWatcher'

export default function* rootSaga() {
  yield all([YMWatcher(), SpotifyWatcher()])
}
