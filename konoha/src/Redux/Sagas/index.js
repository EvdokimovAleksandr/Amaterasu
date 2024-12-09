import { all } from 'redux-saga/effects'
import YMWatcher from './YMWatcher/YMWatcher.js'

export default function* rootSaga() {
  console.log(123)
  // debugger

  all([YMWatcher])
}
