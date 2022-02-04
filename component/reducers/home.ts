import { produce } from 'immer'

import { 
        HOME_INFO_LIST_SUCCESS, HOME_INFO_LIST_FAILURE,
        HomeInfoListSuccessAction, HomeInfoListFailureAction,
        HOME_QN_LIST_SUCCESS, HOME_QN_LIST_FAILURE,
        HomeQNListSuccessAction, HomeQNListFailureAction
     } from '../actions/home'

export interface HomeInfoListState {
    infoData: {
        no: number,
        title: string,
        views: number,
        date: string,
        id: string
    }[] | null
}

const initialInfoListState: HomeInfoListState = {
    infoData: null
}

export interface HomeQNListState {
    qnData: {
        no: number,
        title: string,
        views: number,
        date: string,
        id: string
    }[] | null
}

const initialQNListState: HomeQNListState = {
    qnData: null
}

type HomeReducerAction = HomeInfoListSuccessAction | HomeInfoListFailureAction | HomeQNListSuccessAction | HomeQNListFailureAction

export const HomeInfoReducer = (prevState = initialInfoListState, action: HomeReducerAction) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case HOME_INFO_LIST_SUCCESS:
                draft.infoData = action.infoData
                break;
            
            case HOME_INFO_LIST_FAILURE:
                draft.infoData = null
                break;

            default: prevState;
        }
    })
}

export const HomeQNReducer = (prevState = initialQNListState, action: HomeReducerAction) => {
    return produce(prevState, (draft) => {
        switch (action.type) {
            case HOME_QN_LIST_SUCCESS:
                draft.qnData = action.qnData
                break;
            
            case HOME_QN_LIST_FAILURE:
                draft.qnData = null
                break;

            default: prevState;
        }
    })
}