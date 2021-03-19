import { combineReducers, createStore } from 'redux';
import { taskReducer } from './task-reducer';
import { todoReducer } from './todo-reducer';

const rootReducer = combineReducers( { tasks: taskReducer, todos: todoReducer } );

export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore( rootReducer );

// @ts-ignore
window.store = store;