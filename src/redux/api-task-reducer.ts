import {TaskDomainType, todoApi} from '../utils/api';
import {Dispatch} from 'redux';

export enum TASK_ACTION_TYPE_API {
    ADD_TASKS_FROM_API = 'ADD_TASKS_FROM_API'
}

export type TaskStateType_api = {
    [key: string]: Array<TaskDomainType>
}

type AddTasksActionType_api = {
    type: TASK_ACTION_TYPE_API.ADD_TASKS_FROM_API
    payload: {
        todolistId: string
        tasks: Array<TaskDomainType>
    }
}

const AddTaskFromApi = (todolistId: string, tasks: Array<TaskDomainType>): AddTasksActionType_api => {
    return {
        type: TASK_ACTION_TYPE_API.ADD_TASKS_FROM_API,
        payload: {
            todolistId,
            tasks
        }
    };
};

export const SetTasksFromApiThunk = (todolistId: string) => (dispatch: Dispatch) => {
    todoApi.getTasks(todolistId).then(res => dispatch(AddTaskFromApi(todolistId, res)));
};

export const apiTaskReducer = (state: TaskStateType_api = {}, action: AddTasksActionType_api): TaskStateType_api => {
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