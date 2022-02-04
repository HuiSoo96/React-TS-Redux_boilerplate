import { action, Action } from 'typesafe-actions';
import { ProcessTypes, Process } from './types';

export const loadRequest = (): Action => action(ProcessTypes.GET_PROCESS);

export const loadSuccess = (data: Process[]): Action =>
  action(ProcessTypes.SUCCESS_PROCESS, data);

export const loadError = (): Action => action(ProcessTypes.ERROR_PROCESS);
