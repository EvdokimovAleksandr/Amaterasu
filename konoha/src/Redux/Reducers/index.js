import { combineReducers } from 'redux'
import YMReducer from './YMReducer/YMReducer'
import SpotifyReducer from './SpotifyReducer/SpotifyReducer'

const reducer = combineReducers({ YMReducer, SpotifyReducer })

export default reducer
