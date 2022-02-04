import { Reducer } from 'redux';
import { act } from 'react-dom/test-utils';
import { ProcessState, ProcessTypes } from './types';

const INITIAL_STATE: ProcessState = {
  data: [],
  loading: false,
  error: false,
};

const reducer: Reducer<ProcessState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ProcessTypes.GET_PROCESS:
      return { ...state, loading: true };
    case ProcessTypes.SUCCESS_PROCESS:
      return {
        ...state,
        loading: false,
        error: false,
        data: action.payload,
      };
    case ProcessTypes.ERROR_PROCESS:
      return {
        ...state,
        loading: false,
        error: true,
        data: [],
      };
    default:
      return state;
  }
};

export default reducer;
