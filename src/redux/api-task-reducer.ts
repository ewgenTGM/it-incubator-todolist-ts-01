import {TaskDomainType, todoApi} from '../utils/api';
import {AppThunkType} from './store';

export enum TASK_ACTION_TYPE_API {
    ADD_TASKS_FROM_API = 'ADD_TASKS_FROM_API'
}

export type TaskStateType_api = {
    [key: string]: Array<TaskDomainType>
}

type AddTasksActionType_api = ReturnType<typeof AddTaskFromApi>

export type TaskReducerActionType_api =
    AddTasksActionType_api

const AddTaskFromApi = (todolistId: string, tasks: Array<TaskDomainType>) => {
    return {
        type: TASK_ACTION_TYPE_API.ADD_TASKS_FROM_API,
        payload: {
            todolistId,
            tasks
        }
    };
};

export const SetTasksFromApiThunk = (todolistId: string): AppThunkType => async dispatch => {
    try {
        const tasks = await todoApi.getTasks(todolistId);
        dispatch(AddTaskFromApi(todolistId, tasks));
    } catch (e) {
        throw Error(e);
    }
};

export const apiTaskReducer = (state: TaskStateType_api = {}, action: TaskReducerActionType_api): TaskStateType_api => {
    switch (action.type) {
        case TASK_ACTION_TYPE_API.ADD_TASKS_FROM_API:
            return {
                ...state,
                [action.payload.todolistId]: action.payload.tasks
            };

        default: {
            return state;
        }
    }
};