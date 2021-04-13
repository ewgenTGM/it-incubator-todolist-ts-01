import {combineReducers, createStore, applyMiddleware} from 'redux';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {taskReducer, TaskReducerActionType} from './task-reducer';
import {todoReducer, TodoReducerActionType} from './todo-reducer';

const rootReducer = combineReducers({
    tasks: taskReducer,
    todos: todoReducer
});
//Тип стейта всего приложения
export type RootStateType = ReturnType<typeof rootReducer>;

export const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

//Типизация любой санки нашего приложения
export type AppThunkType<ReturnType = void> = ThunkAction<ReturnType, //Возвращаемый тип (по умолчанию void)
    RootStateType, // Стейт всего приложения
    unknown, // extra параметры (что это?)
    TodoReducerActionType | TaskReducerActionType // Типы action-ов, которые санка может вызывать
    >

// @ts-ignore
window.store = store;