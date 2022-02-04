import { combineReducers } from 'redux'
import { sessionReducer } from 'redux-react-session'
import postReducer from './post'
import { userIDCheckReducer, userLoginReducer, userRegisterReducer } from './user'
import { boardCreateReducer, boardDeleteReducer, boardListReducer, boardReadReducer, boardUpdateReducer } from './board'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { HomeInfoReducer, HomeQNReducer } from './home'

const reducer = combineReducers({
    idCheckUser: userIDCheckReducer,
    logInUser: userLoginReducer,
    registerUser: userRegisterReducer,
    createBoard: boardCreateReducer,
    listBoard: boardListReducer,
    readBoard: boardReadReducer,
    updateBoard: boardUpdateReducer,
    deleteBoard: boardDeleteReducer,
    homeInfo: HomeInfoReducer,
    homeQN: HomeQNReducer,
    posts: postReducer
})

const persistConfig = {
    key: 'root',
    storage: storage,
}

export type RootState = ReturnType<typeof reducer>

export default persistReducer(persistConfig, reducer);
