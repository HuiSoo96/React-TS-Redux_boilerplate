export enum ProcessTypes {
  GET_PROCESS = '@process/GET_PROCESS',
  SUCCESS_PROCESS = '@process/SUCCESS_PROCESS',
  ERROR_PROCESS = '@process/ERROR_PROCESS',
}

export interface Process {
  id: number;
  name: string;
  desc: string;
}

export interface ProcessState {
  readonly data: Process[];
  readonly loading: boolean;
  readonly error: boolean;
}
