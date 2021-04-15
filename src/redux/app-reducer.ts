import {RootStateType} from './store';

enum APP_REDUCER_TYPE {
    SET_STATUS = 'APP/SET_STATUS',
    SET_ERROR = 'APP/SET_ERROR'
}

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed';

export type AppReducerActionType = SetRequestStatusActionType | SetErrorActionType;

type SetRequestStatusActionType = ReturnType<typeof SetRequestStatus>
export const SetRequestStatus = (status: RequestStatusType) => ( {
    type: APP_REDUCER_TYPE.SET_STATUS as const,
    payload: {status}
} );

type SetErrorActionType = ReturnType<typeof SetError>
export const SetError = (error: null | string) => ( {
    type: APP_REDUCER_TYPE.SET_ERROR as const,
    payload: {error}
} );

export type AppStateType = {
    status: RequestStatusType
    error: null | string
}

export const appReducer = (state: AppStateType = {
    status: 'loading',
    error: 'Mega error!'
}, action: AppReducerActionType): AppStateType => {
    switch (action.type) {
        case APP_REDUCER_TYPE.SET_STATUS: {
            return {...state, status: action.payload.status};
        }
        case APP_REDUCER_TYPE.SET_ERROR: {
            return {...state, error: action.payload.error};
        }
        default:
            return state;
    }
};