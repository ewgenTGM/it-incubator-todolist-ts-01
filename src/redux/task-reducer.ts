import {TaskDomainType, todoApi} from '../utils/api';
import {
    AddTodoActionType,
    RemoveTodoActionType,
    SetTodosFromApiActionType,
    TODO_ACTION_TYPE
} from './todo-reducer';
import {AppThunkType} from './store';
import {log} from 'util';

export enum TASK_ACTION_TYPE {
    SET_TASKS_FROM_API,
    ADD_TASK,
    REMOVE_TASK,
    SET_IS_DONE,
    CHANGE_TITLE
}

export type TaskStateType = {
    [key: string]: Array<TaskDomainType>
}

type SetTasksFromApiActionType = ReturnType<typeof SetTasksFromApi>

const SetTasksFromApi = (id: string, tasks: Array<TaskDomainType>) => {
    return {
        type: TASK_ACTION_TYPE.SET_TASKS_FROM_API as const,
        payload: {
            id,
            tasks
        }
    };
};

export const SetTasksFromApiTC = (id: string): AppThunkType => async dispatch => {
    try {
        const tasks = await todoApi.getTasks(id);
        if (tasks.length > 0) {
            dispatch(SetTasksFromApi(id, tasks));
        }
    } catch (e) {
        throw new Error(e);
    }
};

type AddTaskActionType = ReturnType<typeof AddTask>

export const AddTask = (todoId: string, taskId: string, title: string, isDone: boolean = false) => ( {
    type: TASK_ACTION_TYPE.ADD_TASK as const,
    payload: {
        todoId,
        taskId,
        title,
        isDone
    }
} );

type RemoveTaskActionType = ReturnType<typeof RemoveTask>

export const RemoveTask = (todoId: string, taskId: string) => ( {
    type: TASK_ACTION_TYPE.REMOVE_TASK as const,
    payload: {
        todoId,
        taskId
    }
} );

type SetIsDoneActionType = ReturnType<typeof SetIsDone>

export const SetIsDone = (todoId: string, taskId: string, isDone: boolean) => ( {
    type: TASK_ACTION_TYPE.SET_IS_DONE as const,
    payload: {
        todoId,
        taskId,
        isDone
    }
} );

type ChangeTitleActionType = ReturnType<typeof ChangeTaskTitle>
export const ChangeTaskTitle = (todoId: string, taskId: string, title: string) => ( {
    type: TASK_ACTION_TYPE.CHANGE_TITLE as const,
    payload: {
        todoId,
        taskId,
        title
    }
} );

export type TaskReducerActionType =
    SetTasksFromApiActionType
    | AddTaskActionType
    | RemoveTaskActionType
    | SetIsDoneActionType
    | ChangeTitleActionType
    | SetTodosFromApiActionType
    | AddTodoActionType
    | RemoveTodoActionType;

export const taskReducer = (state: TaskStateType = {}, action: TaskReducerActionType): TaskStateType => {
    switch (action.type) {

        case TODO_ACTION_TYPE.SET_TODOS_FROM_API: {
            const newState: TaskStateType = {};
            action.payload.todos.forEach(todo => newState[todo.id] = []);
            return newState;
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

        /*case TASK_ACTION_TYPE.ADD_TASK: {
         const task: TaskType = {
         taskId: action.payload.taskId,
         title: action.payload.title,
         isDone: false
         };
         return {
         ...state,
         [action.payload.todoId]: [task, ...state[action.payload.todoId]]
         };
         }*/
        /* case TASK_ACTION_TYPE.REMOVE_TASK: {
         return {
         ...state,
         [action.payload.todoId]: state[action.payload.todoId].filter(task => task.taskId !== action.payload.taskId)
         };
         }*/

        /*case TASK_ACTION_TYPE.SET_IS_DONE: {
         const tasks = state[action.payload.todoId].map(task => task.taskId === action.payload.taskId ? ( {
         ...task,
         isDone: action.payload.isDone
         } ) : task);
         return {...state, [action.payload.todoId]: tasks};
         }*/

        /*case TASK_ACTION_TYPE.CHANGE_TITLE: {
         const tasks = state[action.payload.todoId].map(task => task.taskId === action.payload.taskId ? ( {
         ...task,
         title: action.payload.title
         } ) : task);
         return {...state, [action.payload.todoId]: tasks};
         }*/

        default: {
            return state;
        }
    }
};