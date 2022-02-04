export type ThunkAction = (dispatch: ThunkDispatch) => void

export interface ThunkDispatch {
    (ThunkAction: ThunkAction): void,
    <A>(action: A): A,
    <TAction>(action: TAction | ThunkAction): TAction
}