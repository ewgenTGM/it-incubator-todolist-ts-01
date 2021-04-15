import {TaskDomainType, todoApi} from '../utils/api';
import {
    AddTodoActionType,
    RemoveTodoActionType,
    SetTodosFromApiActionType,
    TODO_ACTION_TYPE
} from './todo-reducer';
import {AppThunkType} from './store';

export enum TASK_ACTION_TYPE {
    SET_TASKS_FROM_API = 'SET_TASKS_FROM_API',
    ADD_TASK = 'ADD_TASK',
    REMOVE_TASK = 'REMOVE_TASK',
    CHANGE_TASK = 'CHANGE_TASK'
}

export type TaskStateType = {
    [key: string]: Array<TaskDomainType>
}

type SetTasksFromApiActionType = ReturnType<typeof SetTasksFromApi>

const SetTasksFromApi = (id: string, tasks: Array<TaskDomainType>) => {
    console.log(id, tasks);
    return {
        type: TASK_ACTION_TYPE.SET_TASKS_FROM_API as const,
        payload: {
            id,
            tasks
        }
    };
};

export const SetTasksFromApiTC = (id: string): AppThunkType => async dispatch => {
    console.log(id);
    try {
        const tasks = await todoApi.getTasks(id);
        console.log(tasks);
        if (tasks.length > 0) {
            dispatch(SetTasksFromApi(id, tasks));
        }
    } catch (e) {
        throw new Error(e);
    }
};

type AddTaskActionType = ReturnType<typeof AddTask>

export const AddTask = (task: TaskDomainType) => ( {
    type: TASK_ACTION_TYPE.ADD_TASK as const,
    payload: {
        task
    }
} );

export const AddTaskTC = (todoId: string, title: string): AppThunkType => async dispatch => {
    try {
        const task = await todoApi.addTask(todoId, title);
        dispatch(AddTask(task.data.item));
    } catch (e) {
        throw Error(e);
    }
};

type RemoveTaskActionType = ReturnType<typeof RemoveTask>

export const RemoveTask = (todoId: string, taskId: string) => ( {
    type: TASK_ACTION_TYPE.REMOVE_TASK as const,
    payload: {
        todoId,
        taskId
    }
} );

export const RemoveTaskTC = (todoId: string, taskId: string): AppThunkType => async dispatch => {
    try {
        await todoApi.deleteTask(todoId, taskId);
        dispatch(RemoveTask(todoId, taskId));
    } catch (e) {
        throw Error(e);
    }
};

type ChangeTaskActionType = ReturnType<typeof ChangeTask>
export const ChangeTask = (task: TaskDomainType) => ( {
    type: TASK_ACTION_TYPE.CHANGE_TASK as const,
    payload: {
        task
    }
} );

export const ChangeTaskTC = (task: TaskDomainType): AppThunkType => async dispatch => {
    try {
        const updatedTask: TaskDomainType = await todoApi.updateTask(task);
        dispatch(ChangeTask(updatedTask));
    } catch (e) {
        throw Error(e);
    }
};

export type TaskReducerActionType =
    SetTasksFromApiActionType
    | AddTaskActionType
    | ChangeTaskActionType
    | RemoveTaskActionType
    | SetTodosFromApiActionType
    | AddTodoActionType
    | RemoveTodoActionType;

export const taskReducer = (state: TaskStateType = {}, action: TaskReducerActionType): TaskStateType => {
    switch (action.type) {

        case TODO_ACTION_TYPE.SET_TODOS_FROM_API: {
            const newState: TaskStateType = {};
            action.payload.todos.forEach(todo => newState[todo.id] = []);
            return {...newState};
        }

        case TODO_ACTION_TYPE.REMOVE_TODO: {
            const newState = {...state};
            delete newState[action.payload.id];
            return {...newState};
        }

        case TODO_ACTION_TYPE.ADD_TODO: {
            return {...state, [action.payload.todo.id]: []};
        }

        case TASK_ACTION_TYPE.SET_TASKS_FROM_API: {
            return {...state, [action.payload.id]: action.payload.tasks};
        }

        case TASK_ACTION_TYPE.ADD_TASK: {
            return {
                ...state,
                [action.payload.task.todoListId]: [action.payload.task, ...state[action.payload.task.todoListId]]
            };
        }
        case TASK_ACTION_TYPE.REMOVE_TASK: {
            return {
                ...state,
                [action.payload.todoId]: state[action.payload.todoId].filter(task => task.id !== action.payload.taskId)
            };
        }

        case TASK_ACTION_TYPE.CHANGE_TASK: {
            const tasks = state[action.payload.task.todoListId].map(task => task.id === action.payload.task.id ? action.payload.task : task);
            return {...state, [action.payload.task.todoListId]: tasks};
        }

        default: {
            return state;
        }
    }
};