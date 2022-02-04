import { addPost } from "./post";

import { ThunkAction } from "./thunk";
import { BoardContentCreate, BoardContentList, BoardContentRead, BoardContentDelete, BoardContentdUpdate } from "../../api/boardService";

export const BOARD_CREATE_REQUEST = 'BOARD_CREATE_REQUEST' as const
export const BOARD_CREATE_SUCCESS = 'BOARD_CREATE_SUCCESS' as const
export const BOARD_CREATE_FAILURE = 'BOARD_CREATE_FAILURE' as const
export const BOARD_LIST_REQUEST = 'BOARD_LIST_REQUEST' as const
export const BOARD_LIST_SUCCESS = 'BOARD_LIST_SUCCESS' as const
export const BOARD_LIST_FAILURE = 'BOARD_LIST_FAILURE' as const
export const BOARD_READ_REQUEST = 'BOARD_READ_REQUEST' as const
export const BOARD_READ_SUCCESS = 'BOARD_READ_SUCCESS' as const
export const BOARD_READ_FAILURE = 'BOARD_READ_FAILURE' as const
export const BOARD_DELETE_REQUEST = 'BOARD_DELETE_REQUEST' as const
export const BOARD_DELETE_SUCCESS = 'BOARD_DELETE_SUCCESS' as const
export const BOARD_DELETE_FAILURE = 'BOARD_DELETE_FAILURE' as const
export const BOARD_UPDATE_REQUEST = 'BOARD_UPDATE_REQUEST' as const
export const BOARD_UPDATE_SUCCESS = 'BOARD_UPDATE_SUCCESS' as const
export const BOARD_UPDATE_FAILURE = 'BOARD_UPDATE_FAILURE' as const

export interface BoardCreateRequestAction {
    type: typeof BOARD_CREATE_REQUEST
    data: {
        ObjectId: string, nickname: string, class: string, title: string, content: string, tag: string[], date: string
    }
}

export interface BoardCreateSuccessAction {
    type: typeof BOARD_CREATE_SUCCESS
    data: {
        title: string, content: string, tag: string[], date: string
    }
}

export interface BoardCreateFailureAction {
    type: typeof BOARD_CREATE_FAILURE
    error: Error
}

export interface BoardListRequestAction {
    type: typeof BOARD_LIST_REQUEST,
    data: {word: string, tag: string[] ,classData: string}
}

export interface BoardListSuccessAction {
    type: typeof BOARD_LIST_SUCCESS
    data: {
        no: number, title: string, views: number, date: number, id: string, class: string
    }[]
}

export interface BoardListFailureAction {
    type: typeof BOARD_LIST_FAILURE
    error: Error
}

export interface BoardReadRequestAction {
    type: typeof BOARD_READ_REQUEST
    data: {
        id: string
    }
}

export interface BoardReadSuccessAction {
    type: typeof BOARD_READ_SUCCESS
    data: {
        title: string, content: string, userid: string, tag: [], date: number, views: number
    }
}

export interface BoardReadFailureAction {
    type: typeof BOARD_READ_FAILURE
    error: Error
}

export interface BoardDeleteRequestAction {
    type: typeof BOARD_DELETE_REQUEST
    data: {
        boardId: string, nickname: string, isConfirm: boolean
    }
}

export interface BoardDeleteSuccessAction {
    type: typeof BOARD_DELETE_SUCCESS
    isConfirm: boolean
}

export interface BoardDeleteFailureAction {
    type: typeof BOARD_DELETE_FAILURE
    error: Error
}

export interface BoardUpdateRequestAction {
    type: typeof BOARD_UPDATE_REQUEST
    data: {
        title: string, content: string
    }
}

export interface BoardUpdateSuccessAction {
    type: typeof BOARD_UPDATE_SUCCESS
    data: {
        title: string, content: string
    }
}

export interface BoardUpdateFailureAction {
    type: typeof BOARD_UPDATE_FAILURE
    error: Error
}

export const BoardCreateRequest = (data: { ObjectId: string, nickname: string, class: string, title: string, content: string, tag: string[], date: string }): BoardCreateRequestAction => {
    return {
        type: BOARD_CREATE_REQUEST,
        data
    }
}

export const BoardCreateSuccess = (data: { title: string, content: string, tag: string[], date: string }): BoardCreateSuccessAction => {
    return {
        type: BOARD_CREATE_SUCCESS,
        data
    }
}

export const BoardCreateFailure = (error: any): BoardCreateFailureAction => {
    return {
        type: BOARD_CREATE_FAILURE,
        error
    }
}

export const BoardListRequest = (data: {word: string, tag: string[] ,classData: string}): BoardListRequestAction => {
    return {
        type: BOARD_LIST_REQUEST,
        data
    }
}

export const BoardListSuccess = (data: { no: number, title: string, views: number, date: number, id: string, class: string}[]): BoardListSuccessAction => {
    return {
        type: BOARD_LIST_SUCCESS,
        data
    }
}

export const BoardListFailure = (error: Error): BoardListFailureAction => {
    return {
        type: BOARD_LIST_FAILURE,
        error
    }
}

export const BoardReadRequest = (data: { id: string }): BoardReadRequestAction => {
    return {
        type: BOARD_READ_REQUEST,
        data
    }
}

export const BoardReadSuccess = (data: { title: string, content: string, userid: string, tag: [], date: number, views: number }): BoardReadSuccessAction => {
    return {
        type: BOARD_READ_SUCCESS,
        data
    }
}

export const BoardReadFailure = (error: Error): BoardReadFailureAction => {
    return {
        type: BOARD_READ_FAILURE,
        error
    }
}

export const BoardUpdateRequest = (data: { title: string, content: string }): BoardUpdateRequestAction => {
    return {
        type: BOARD_UPDATE_REQUEST,
        data
    }
}

export const BoardUpdateSuccess = (data: { title: string, content: string }): BoardUpdateSuccessAction => {
    return {
        type: BOARD_UPDATE_SUCCESS,
        data
    }
}

export const BoardUpdateFailure = (error: Error): BoardUpdateFailureAction => {
    return {
        type: BOARD_UPDATE_FAILURE,
        error
    }
}

export const BoardDeleteRequest = (data: { boardId: string, nickname: string, isConfirm: boolean }): BoardDeleteRequestAction => {
    return {
        type: BOARD_DELETE_REQUEST,
        data
    }
}

export const BoardDeleteSuccess = (isConfirm: boolean): BoardDeleteSuccessAction => {
    return {
        type: BOARD_DELETE_SUCCESS,
        isConfirm
    }
}

export const BoardDeleteFailure = (error: Error): BoardDeleteFailureAction => {
    return {
        type: BOARD_DELETE_FAILURE,
        error
    }
}

export const BoardCreate = (data: { ObjectId: string, nickname: string, class: string, title: string, content: string, tag: string[], date: string }): ThunkAction => {
    return (dispatch) => {
        dispatch(BoardCreateRequest(data))
        BoardContentCreate(data).then(res => {
            const successData = {
                title: data.title,
                content: data.content,
                tag: data.tag,
                date: data.date
            }
            dispatch(BoardCreateSuccess(successData))
            dispatch(addPost(''))
            if (data.class === 'question') {
                window.location.href = '/boardList'
            } else {
                window.location.href = '/infoList'
            }
        }).catch(err => {
            dispatch(BoardCreateFailure(err))
            alert("실패")
        })
    }
}

export const BoardList = (data: {word: string, tag: string[] ,classData: string}): ThunkAction => {
    return dispatch => {
        dispatch(BoardListRequest(data))
        dispatch(addPost(''))
        BoardContentList(data).then(res => {
            const temp = res.data.data
            
            let listData: {no: number, title: any, views: any, date: any, id: string, class: string}[] = [];

            for (var i = 0; i < temp.length; i++) {
                listData[i] = {
                    no: i + 1,
                    id: temp[i]._id,
                    title: temp[i].title,
                    views: temp[i].views,
                    date: temp[i].date,
                    class: temp[i].class,
                }
            }
            setTimeout(() => {
                
                dispatch(BoardListSuccess(listData))
                dispatch(addPost(''))
            }, 500);
        }).catch((err) => {
            dispatch(BoardListFailure(err))
        })
    }
}

export const BoardRead = (data: { id: string }): ThunkAction => {
    return dispatch => {
        dispatch(BoardReadRequest(data))
        BoardContentRead(data).then(res => {
            const temp = res.data.data

            let boardData: { title: string, content: string, userid: string, date: number, tag: [], views: number } = {
                title: "",
                content: "",
                userid: "",
                date: 0,
                tag: [],
                views: 0,
            };

            for (var i = 0; i < temp.length; i++) {
                boardData = {
                    title: temp[i].title,
                    content: temp[i].content,
                    userid: temp[i].nickname,
                    tag: temp[i].tag,
                    date: temp[i].date,
                    views: temp[i].views,
                }
            }
                console.log(boardData.userid)
                dispatch(BoardReadSuccess(boardData))
                dispatch(addPost(''))
        }).catch(err => {
            dispatch(BoardReadFailure(err))
        })
    }
}

export const BoardUpdate = (data: {title: string, content: string, userid: string}): ThunkAction => {
    return dispatch => {
        // dispatch(BoardUpdateRequest(data))
        BoardContentdUpdate(data).then(res => {
            console.log(res)
            const updateData = {
                title: res.data.title,
                content: res.data.content
            }
            dispatch(BoardUpdateSuccess(updateData))
            dispatch(addPost(''))
            window.location.href = '/boardDetail/:' + data.userid
        }).catch(err => {
            dispatch(BoardUpdateFailure(err))
        })
    }
}

export const BoardDelete = (data: { boardId: string, nickname: string, isConfirm: boolean }): ThunkAction => {
    return dispatch => {
        BoardDeleteRequest(data)
        BoardContentDelete(data).then(res => {
            console.log(res)
            dispatch(BoardDeleteSuccess(res.data.isConfirm))
            dispatch(addPost(''))

            if (res.data.isConfirm) {
                window.location.href = '/boardList'
            } else {
                alert("다시 한번 확인해주세요.")
            }
        }).catch(err => {
            dispatch(BoardDeleteFailure(err))
        })
    }
}