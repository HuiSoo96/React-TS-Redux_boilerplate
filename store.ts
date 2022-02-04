import { createStore, MiddlewareAPI, Dispatch, AnyAction, applyMiddleware, compose, } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { sessionService } from 'redux-react-session'
import { persistStore } from 'redux-persist'
import logger from 'redux-logger'

import reducer from './component/reducers'

const firstMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: AnyAction) => {
    // console.log('로깅', action)
    next(action)
}

const thunkMiddleware = (store: MiddlewareAPI) => (next: Dispatch<AnyAction>) => (action: any) => {
    if (typeof action === 'function') { // 비동기
        // console.log(action)
        // console.log(typeof action)
        return action(store.dispatch, store.getState)
    }
    return next(action) // 동기
}
const middleware = [logger]
const enhancer = process.env.NODE_ENV === 'production'
    ? compose(applyMiddleware(firstMiddleware, thunkMiddleware, ...middleware))
    : composeWithDevTools(
        applyMiddleware(firstMiddleware, thunkMiddleware, ...middleware)
    )

export const store = createStore(reducer, enhancer); // 미들웨어 장착

export const persistor = (persistStore(store))

export default { store, persistor}