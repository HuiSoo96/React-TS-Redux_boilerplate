import { produce } from 'immer'

import {
    BOARD_CREATE_REQUEST, BOARD_CREATE_SUCCESS, BOARD_CREATE_FAILURE,
    BOARD_LIST_REQUEST, BOARD_LIST_SUCCESS, BOARD_LIST_FAILURE,
    BOARD_READ_REQUEST, BOARD_READ_SUCCESS, BOARD_READ_FAILURE,
    BOARD_DELETE_REQUEST, BOARD_DELETE_SUCCESS, BOARD_DELETE_FAILURE,
    BOARD_UPDATE_REQUEST, BOARD_UPDATE_SUCCESS, BOARD_UPDATE_FAILURE,
    BoardCreateRequestAction, BoardCreateSuccessAction, BoardCreateFailureAction,
    BoardListRequestAction, BoardListSuccessAction, BoardListFailureAction,
    BoardReadRequestAction ,BoardReadSuccessAction, BoardReadFailureAction,
    BoardDeleteRequestAction, BoardDeleteSuccessAction, BoardDeleteFailureAction,
    BoardUpdateRequestAction, BoardUpdateSuccessAction, BoardUpdateFailureAction
} from '../actions/board'

export interface BoardCreateState {
    isLoggingIn: boolean,
    data: {
        title: string,
        content: string,
        tag: string[],
        date: string,
    } | null
}

const initialCreateState: BoardCreateState = {
    isLoggingIn: false,
    data: null
}

export interface BoardListState {
    isLoggingIn: boolean,
    data: {
        no: number,
        id: string,
        title: string,
        views: number,
        date: number,
        class: string
    }[] | null
}

const initialListState: BoardListState = {
    isLoggingIn: false,
    data: null
}

export interface BoardReadState {
    isLoggingIn: boolean,
    data: {
        title: string, 
        content: string,
        userid: string, 
        tag: [],
        date: number, 
        views: number
    } | null
}

const initialDetailState : BoardReadState= {
    isLoggingIn: false,
    data: null
}

export interface BoardUpdateState {
    isLoggingIn: boolean,
    data: {
        title: string,
        content: string,
    } | null
}

const initialUpdateState: BoardUpdateState = {
    isLoggingIn: false,
    data: null
}

export interface BoardDeleteState {
    isLoggingIn: boolean,
    data: {
        boardId: string,
        nickname: string,
        isConfirm: boolean,
    } | null
}

const initialDeleteState: BoardDeleteState = {
    isLoggingIn: false,
    data: null
}

type BoardReducerAction = BoardCreateRequestAction| BoardCreateSuccessAction| BoardCreateFailureAction|
                            BoardListRequestAction| BoardListSuccessAction| BoardListFailureAction|
                            BoardReadRequestAction |BoardReadSuccessAction| BoardReadFailureAction|
                            BoardDeleteRequestAction| BoardDeleteSuccessAction| BoardDeleteFailureAction|
                            BoardUpdateRequestAction| BoardUpdateSuccessAction| BoardUpdateFailureAction;

export const boardCreateReducer = (prevState = initialCreateState, action: BoardReducerAction) => {
    return produce(prevState, (draft) => {
        switch(action.type) {
            case BOARD_CREATE_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case BOARD_CREATE_SUCCESS:
                draft.data = action.data
                draft.isLoggingIn = false
                break;
            case BOARD_CREATE_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            default: prevState
        }
    })
}

export const boardListReducer = (prevState = initialListState, action: BoardReducerAction) => {
    return produce(prevState, (draft) => {
        switch(action.type) {
            case BOARD_LIST_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case BOARD_LIST_SUCCESS:
                draft.data = action.data
                draft.isLoggingIn = false
                break;
            case BOARD_LIST_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            default: prevState
        }
    })
}

export const boardReadReducer = (prevState = initialDetailState, action: BoardReducerAction) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case BOARD_READ_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case BOARD_READ_SUCCESS:
                draft.data = action.data
                draft.isLoggingIn = false
                break;
            case BOARD_READ_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            default: prevState
        }
    })
}

export const boardUpdateReducer = (prevState = initialUpdateState, action: BoardReducerAction) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case BOARD_UPDATE_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case BOARD_UPDATE_SUCCESS:
                draft.data = action.data
                draft.isLoggingIn = false
                break;
            case BOARD_UPDATE_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            default: prevState
        }
    })
}

export const boardDeleteReducer = (prevState = initialDeleteState, action: BoardReducerAction) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case BOARD_DELETE_REQUEST:
                draft.data = null
                draft.isLoggingIn = true
                break;
            case BOARD_DELETE_SUCCESS:
                draft.data = null
                draft.isLoggingIn = false
                break;
            case BOARD_DELETE_FAILURE:
                draft.data = null
                draft.isLoggingIn = false
                break;
            default: prevState
        }
    })
}