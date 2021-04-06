import {FilterValuesType} from '../components/todo-list/TodoList';
import {todoApi, TodoListDomainType} from '../utils/api';
import {Dispatch} from 'redux';

export enum TODO_ACTION_TYPE_API {
    SET_TODO_API = 'SET_TODO_API'
}

type FilterType = {
    filter: FilterValuesType
}
export type TodoType_api = TodoListDomainType & FilterType

export type TodoStateType_api = Array<TodoType_api>;

type SetTodoActionType_api = {
    type: TODO_ACTION_TYPE_API.SET_TODO_API
    payload: {
        todos: Array<TodoType_api>
    }
}

export const SetTodos_api = (todos: Array<TodoType_api>): SetTodoActionType_api => {
    return {
        type: TODO_ACTION_TYPE_API.SET_TODO_API,
        payload: {
            todos
        }
    };
};

export const SetTodosThunk = () => (dispatch: Dispatch) => {
    todoApi.getTodoLists().then(res => {
        const todos: Array<TodoType_api> = res.map(todo => {
            const curr: TodoType_api = {
                ...todo,
                filter: 'all'
            };
            return curr;
        });
        dispatch(SetTodos_api(todos));
    });
};

type TodoReducerActionType_api =
    SetTodoActionType_api

export const apiTodoReducer = (state: TodoStateType_api = [], action: TodoReducerActionType_api): TodoStateType_api => {
    switch (action.type) {

        case TODO_ACTION_TYPE_API.SET_TODO_API:
            return action.payload.todos;

        default:
            return state;
    }
};