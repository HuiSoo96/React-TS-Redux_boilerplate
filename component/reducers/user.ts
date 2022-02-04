import { produce } from 'immer'

import {
    LOG_IN_REQUEST, LOG_IN_SUCCESS, LOG_IN_FAILURE,
    LogInRequestAction, LogInSuccessAction, LogInFailureAction,
    LOG_OUT, LogOutAction, 
    REGISTER_REQUEST, REGISTER_SUCCESS, REGISTER_FAILURE,
    RegisterRequestAction, RegisterSuccessAction, RegisterFailureAction,
    IDCHECK_REQUEST, IDCHECK_SUCCESS, IDCHECK_FAILURE,
    IDCheckRequestAction, IDCheckSuccessAction, IDCheckFailureAction
} from '../actions/user'

export interface UserLoginState {
    isLoggingIn: boolean,
    data: {
        id: string,
        password: string,
    } | null
}

export interface UserRegisterState {
    isLoggingIn: boolean,
    data: {
        id: string, password: string, nickname: string, address: string, cellNumber: string, gender: string, isDelete: boolean, isAdmin: number
    } | null
}

export interface UserIDCheckState {
    isLoggingIn: boolean,
    data: {
        id: string,
        message: string
    } | null
}

const initialLoginState: UserLoginState = {
    isLoggingIn: false,
    data: null
}

const initialRegisterState: UserRegisterState = {
    isLoggingIn: false,
    data: null,
}

const initialIDCheckState: UserIDCheckState = {
    isLoggingIn: false,
    data: null
}

type UserReducerActions = LogInRequestAction | LogInSuccessAction | LogInFailureAction | LogOutAction | RegisterRequestAction | RegisterSuccessAction | RegisterFailureAction
                            | IDCheckRequestAction | IDCheckSuccessAction | IDCheckFailureAction;

export const userLoginReducer = (prevState = initialLoginState, action: UserReducerActions) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case LOG_IN_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case LOG_IN_SUCCESS:
                draft.data = action.data
                draft.isLoggingIn = false
                break;
            case LOG_IN_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            case LOG_OUT:
                draft.data = null
                break;
            default:
                prevState
        }
    })
}

export const userIDCheckReducer = (prevState = initialIDCheckState, action: UserReducerActions) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case IDCHECK_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case IDCHECK_SUCCESS:
                draft.data = action.data
                draft.isLoggingIn = false
                break;
            case IDCHECK_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            default:
                return prevState

        }
    })
}

export const userRegisterReducer = (prevState = initialRegisterState, action: UserReducerActions) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case REGISTER_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case REGISTER_SUCCESS:
                draft.data = action.data
                draft.isLoggingIn = false
                break;
            case REGISTER_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            default:
                return prevState

        }
    })
}

