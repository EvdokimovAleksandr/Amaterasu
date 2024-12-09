import { all } from 'redux-saga/effects'
import { YMWatcher } from './YMWatcher/YMWatcher'

export default function* rootSaga() {
  console.log(123)
  // debugger

  yield all([YMWatcher()])
}
