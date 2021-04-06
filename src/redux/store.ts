import {combineReducers, createStore, applyMiddleware} from 'redux';
import thuncMiddleware from 'redux-thunk';
import {taskReducer} from './task-reducer';
import {todoReducer} from './todo-reducer';
import {apiTodoReducer} from './api-todo-reducer';

const rootReducer = combineReducers({tasks: taskReducer, todos: todoReducer, todoApi: apiTodoReducer});

export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thuncMiddleware));

// @ts-ignore
window.store = store;