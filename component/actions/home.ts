import { addPost } from './post'

import { ThunkAction } from './thunk';

import { HomeInfoList } from '../../api/homeService';

export const HOME_INFO_LIST_SUCCESS = 'HOME_INFO_LIST_SUCCESS' as const;
export const HOME_INFO_LIST_FAILURE = 'HOME_INFO_LIST_FAILURE' as const;
export const HOME_QN_LIST_SUCCESS = 'HOME_QN_LIST_SUCCESS' as const;
export const HOME_QN_LIST_FAILURE = 'HOME_QN_LIST_FAILURE' as const;

export interface HomeInfoListSuccessAction {
    type: typeof HOME_INFO_LIST_SUCCESS,
    infoData: {
        no: number, title: string, views: number, date: string, id: string
    }[]
}

export interface HomeInfoListFailureAction {
    type: typeof HOME_INFO_LIST_FAILURE,
    error: Error
}

export interface HomeQNListSuccessAction {
    type: typeof HOME_QN_LIST_SUCCESS,
    qnData: {
        no: number, title: string, views: number, date: string, id: string
    }[]
}

export interface HomeQNListFailureAction {
    type: typeof HOME_QN_LIST_FAILURE,
    error: Error
}

export const HomeInfoListSuccess = (data: { no: number, title: string, views: number, date: string, id: string }[]): HomeInfoListSuccessAction => {
    return {
        type: HOME_INFO_LIST_SUCCESS,
        infoData: data,
    }
}

export const HomeInfoListFailure = (error: Error): HomeInfoListFailureAction => {
    return {
        type: HOME_INFO_LIST_FAILURE,
        error
    }
}

export const HomeQNListSuccess = (data: { no: number, title: string, views: number, date: string, id: string }[]): HomeQNListSuccessAction => {
    return {
        type: HOME_QN_LIST_SUCCESS,
        qnData: data,
    }
}

export const HomeQNListFailure = (error: Error): HomeQNListFailureAction => {
    return {
        type: HOME_QN_LIST_FAILURE,
        error
    }
}

export const HomeInfo = (data: any): ThunkAction => {
    return (dispatch) => {
        HomeInfoList(data).then(res => {
            let temp = res.data.data
            let tempList: { no: number, title: string, views: number, date: string, id: string  }[] = []
            console.log(res)
            for (var i = 0; i < temp.length; i++) {
                tempList[i] = {
                    no: temp[i].no,
                    title: temp[i].title,
                    views: temp[i].views,
                    date: temp[i].date,
                    id: temp[i]._id
                }
            }
            dispatch(HomeInfoListSuccess(tempList))
            dispatch(addPost(''))
        }).catch((err) => {
            dispatch(HomeInfoListFailure(err))
        })
    }
}

export const HomeQN = (data: any): ThunkAction => {
    return (dispatch) => {
        HomeInfoList(data).then(res => {
            let temp = res.data.data
            let tempList: { no: number, title: string, views: number, date: string, id: string }[] = []
            console.log(res)
            for (var i = 0; i < temp.length; i++) {
                tempList[i] = {
                    no: temp[i].no,
                    title: temp[i].title,
                    views: temp[i].views,
                    date: temp[i].date,
                    id: temp[i]._id
                }
            }
            dispatch(HomeQNListSuccess(tempList))
            dispatch(addPost(''))
        }).catch((err) => {
            dispatch(HomeQNListFailure(err))
        })
    }
}