import {FilterValuesType} from '../components/todo-list/TodoList';
import {todoApi, TodoListDomainType} from '../utils/api';
import {AppThunkType} from './store';

export enum TODO_ACTION_TYPE_API {
    SET_TODO_API = 'SET_TODO_API'
}

type FilterType = {
    filter: FilterValuesType
}
export type TodoType_api = TodoListDomainType & FilterType

export type TodoStateType_api = Array<TodoType_api>;

type SetTodoActionType_api = ReturnType<typeof SetTodos_api>

export const SetTodos_api = (todos: Array<TodoType_api>) => {
    return {
        type: TODO_ACTION_TYPE_API.SET_TODO_API,
        payload: {
            todos
        }
    } as const;
};

export const SetTodosThunk = (): AppThunkType => async dispatch => {
    try {
        console.log('Start fetching for todos');
        let todos = await todoApi.getTodoLists();
        const _todos: Array<TodoType_api> = todos.map(todo => {
            const curr: TodoType_api = {
                ...todo,
                filter: 'all'
            };
            return curr;
        });
        dispatch(SetTodos_api(_todos));
        console.log('End fetching for todos');
    } catch (e) {
        throw new Error(e);
    }

};

export type TodoReducerActionType_api =
    SetTodoActionType_api

export const apiTodoReducer = (state: TodoStateType_api = [], action: TodoReducerActionType_api): TodoStateType_api => {
    switch (action.type) {

        case TODO_ACTION_TYPE_API.SET_TODO_API:
            return action.payload.todos;

        default:
            return state;
    }
};