
import { addPost } from './post'

import { IDCheck, Register, LogIn } from '../../api/userService'
import { Cookies } from 'react-cookie'

export const LOG_IN_REQUEST = 'LOG_IN_REQUEST' as const
export const LOG_IN_SUCCESS = 'LOG_IN_SUCCESS' as const
export const LOG_IN_FAILURE = 'LOG_IN_FAILURE' as const
export const LOG_OUT = 'LOG_OUT' as const
export const REGISTER_REQUEST = 'REGISTER_REQUEST' as const
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS' as const
export const REGISTER_FAILURE = 'REGISTER_FAILURE' as const
export const IDCHECK_REQUEST = 'IDCHECK_REQUEST' as const
export const IDCHECK_SUCCESS = 'IDCHECK_SUCCESS' as const
export const IDCHECK_FAILURE = 'IDCHECK_FAILURE' as const

const cookies = new Cookies()

export interface LogInRequestAction {
    type: typeof LOG_IN_REQUEST,
    data: { id: string, password: string }
}

export interface LogInSuccessAction {
    type: typeof LOG_IN_SUCCESS,
    data: { id: string, password: string }
}

export interface LogInFailureAction {
    type: typeof LOG_IN_FAILURE,
    error: Error,
}

export interface RegisterRequestAction {
    type: typeof REGISTER_REQUEST,
    data: { id: string, password: string, nickname: string, address: string, cellNumber: string, gender: string, isDelete: boolean, isAdmin: number  }
}

export interface RegisterSuccessAction {
    type: typeof REGISTER_SUCCESS,
    data: { id: string, password: string, nickname: string, address: string, cellNumber: string, gender: string, isDelete: boolean, isAdmin: number  }

}

export interface RegisterFailureAction {
    type: typeof REGISTER_FAILURE,
    error: Error
}

export interface IDCheckRequestAction {
    type: typeof IDCHECK_REQUEST,
    data: { id: string }
}

export interface IDCheckSuccessAction {
    type: typeof IDCHECK_SUCCESS,
    data: { id: string, message: string }
}

export interface IDCheckFailureAction {
    type: typeof IDCHECK_FAILURE,
    error: Error
}

export const logInRequest = (data: { id: string, password: string }): LogInRequestAction => {
    return {
        type: LOG_IN_REQUEST,
        data,
    }
}

export const LogInSuccess = (data: { id: string, password: string }): LogInSuccessAction => {
    return {
        type: LOG_IN_SUCCESS,
        data,
    }
}

export const LogInFailure = (error: any): LogInFailureAction => {
    return {
        type: LOG_IN_FAILURE,
        error,
    }
}

export const RegisterRequest = (data: { id: string, password: string, nickname: string, address: string, cellNumber: string, gender: string, isDelete: boolean, isAdmin: number  }): RegisterRequestAction => {
    return {
        type: REGISTER_REQUEST,
        data,
    }
}

export const RegisterSuccess = (data: { id: string, password: string, nickname: string, address: string, cellNumber: string, gender: string, isDelete: boolean, isAdmin: number  }): RegisterSuccessAction => {

    return {
        type: REGISTER_SUCCESS,
        data,
    }
}

export const RegisterFailure = (error: any): RegisterFailureAction => {
    return {
        type: REGISTER_FAILURE,
        error,
    }
}

export const IDCheckRequest = (data: {id: string}): IDCheckRequestAction => {
    return {
        type: IDCHECK_REQUEST,
        data,
    }
}

export const IDCheckSuccess = (data: {id: string, message: string}): IDCheckSuccessAction => {
    return {
        type: IDCHECK_SUCCESS,
        data,
    }
}

export const IDCheckFailure = (error: any): IDCheckFailureAction => {
    return {
        type: IDCHECK_FAILURE,
        error
    }
}

export interface ThunkDispatch {
    (ThunkAction: ThunkAction): void,
    <A>(action: A): A,
    <TAction>(action: TAction | ThunkAction): TAction
}

type ThunkAction = (dispatch: ThunkDispatch) => void

const logIn = (data: { id: string, password: string}): ThunkAction => {
    return (dispatch) => {
        dispatch(logInRequest(data))
        LogIn(data).then((res) => {
            if(res.data.success === true) {
                // cookies.set("ObjectId", res.data.ObjectId)
                // cookies.set('nickname', res.data.nickname)
                cookies.set('user', {
                    'ObjectId': res.data.ObjectId,
                    'nickname': res.data.nickname
                })
                dispatch(LogInSuccess(data))
                dispatch(addPost(''))
                window.location.href = "/"
            } else {
                alert("아이디 또는 비밀번호를 확인해주세요.")
            }
        }).catch(err => {
            dispatch(LogInFailure(err))
        })
    }
}

const register = (data: { id: string, password: string, nickname: string, address: string, cellNumber: string, gender: string, isDelete: boolean, isAdmin: number  }):ThunkAction => {
    return (dispatch) => {
            dispatch(RegisterRequest(data))
            Register(data).then((res) => {
                dispatch(RegisterSuccess(data))
                dispatch(addPost(''))
            }).catch(err => {
                dispatch(RegisterFailure(err))
            })
    }
}

const idCheck = (data: {id: string}): ThunkAction => {
    return dispatch => {
        dispatch(IDCheckRequest(data))
        IDCheck(data.id).then((res) => {
            const idData = {
                id: data.id,
                message: res.data.check
            }
            dispatch(IDCheckSuccess(idData))
            dispatch(addPost(''))
        }).catch((err) => {
            dispatch(IDCheckFailure(err))
        })
    }
}

export interface LogOutAction {
    type: typeof LOG_OUT
}

const logOut = () => {
    return {
        type: LOG_OUT
    }
}

export const actions = {
    logIn,
    register,
    idCheck,
    logOut
}