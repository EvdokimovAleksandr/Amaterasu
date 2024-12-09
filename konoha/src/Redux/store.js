import { applyMiddleware, legacy_createStore, compose } from 'redux'
import createSagaMiddleware from 'redux-saga'

import reducer from './Reducers/index'
import rootSaga from './Sagas/index'

const sagaMiddleware = createSagaMiddleware()
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = legacy_createStore(reducer, composeEnhancers(applyMiddleware(sagaMiddleware)))

sagaMiddleware.run(rootSaga)

export default store
