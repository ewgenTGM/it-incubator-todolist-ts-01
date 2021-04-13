import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {taskReducer} from './task-reducer';
import {todoReducer} from './todo-reducer';
import {apiTodoReducer, TodoReducerActionType_api} from './api-todo-reducer';
import {apiTaskReducer, TaskReducerActionType_api} from './api-task-reducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todos: todoReducer,
    todoApi: apiTodoReducer,
    taskApi: apiTaskReducer
});

export type RootStateType = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, RootStateType, unknown, TodoReducerActionType_api | TaskReducerActionType_api>

// @ts-ignore
window.store = store;