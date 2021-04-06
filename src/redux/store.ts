import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {taskReducer} from './task-reducer';
import {todoReducer} from './todo-reducer';
import {apiTodoReducer} from './api-todo-reducer';
import {apiTaskReducer} from './api-task-reducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todos: todoReducer,
    todoApi: apiTodoReducer,
    taskApi: apiTaskReducer
});

export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

// @ts-ignore
window.store = store;