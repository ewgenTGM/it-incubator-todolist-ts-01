import {FilterValuesType} from '../components/todo-list/TodoList';
import {AppThunkType} from './store';
import {todoApi} from '../utils/api';

export enum TODO_ACTION_TYPE {
    ADD_TODO = 'ADD_TODO',
    REMOVE_TODO = 'REMOVE_TODO',
    SET_FILTER = 'SET_FILTER',
    CHANGE_TODO_TITLE = 'CHANGE_TODO_TITLE',
    SET_TODOS_FROM_API = 'SET_TODOS_FROM_API'
}

export type TodoType = {
    id: string
    title: string
    addedDate: string
    order: number
    filter: FilterValuesType
}

export type TodoStateType = Array<TodoType>;

export type SetTodosFromApiActionType = ReturnType<typeof SetTodosFromApi>

export const SetTodosFromApi = (todos: Array<TodoType>) => {
    return {
        type: TODO_ACTION_TYPE.SET_TODOS_FROM_API as const,
        payload: {
            todos
        }
    };
};

export const SetTodosFromApiTC = (): AppThunkType => async dispatch => {
    try {
        console.log('Start fetching for todos');
        let todos = await todoApi.getTodoLists();
        const _todos: Array<TodoType> = todos.map(todo => {
            const curr: TodoType = {
                ...todo,
                filter: 'all'
            };
            return curr;
        });
        dispatch(SetTodosFromApi(_todos));
        console.log('End fetching for todos');
    } catch (e) {
        throw new Error(e);
    }
};

type SetFilterActionType = ReturnType<typeof SetFilter>

export const SetFilter = (id: string, filter: FilterValuesType) => {
    return {
        type: TODO_ACTION_TYPE.SET_FILTER as const,
        payload: {
            id,
            filter
        }
    };
};

export type AddTodoActionType = ReturnType<typeof AddTodo>

export const AddTodo = (todo: TodoType) => {
    return {
        type: TODO_ACTION_TYPE.ADD_TODO as const,
        payload: {
            todo
        }
    };
};

export const AddTodoTC = (title: string): AppThunkType => async dispatch => {
    try {
        console.log('Start adding todo');
        const todo = await todoApi.addTodoList(title);
        const _todo: TodoType = {
            ...todo.data.item,
            filter: 'all'
        };
        dispatch(AddTodo(_todo));
        console.log('End adding todo');
    } catch (e) {
        throw new Error(e);
    }
};

export type RemoveTodoActionType = ReturnType<typeof RemoveTodo>

export const RemoveTodo = (id: string) => {
    return {
        type: TODO_ACTION_TYPE.REMOVE_TODO as const,
        payload: {id}
    };
};

export const RemoveTodoTC = (id: string): AppThunkType => async dispatch => {
    try {
        console.log('Start deleting todo');
        await todoApi.deleteTodolist(id);
        dispatch(RemoveTodo(id));
        console.log('End deleting todos');
    } catch (e) {
        throw new Error(e);
    }
};

type ChangeTodoTitleActionType = ReturnType<typeof ChangeTodoTitle>

export const ChangeTodoTitle = (Id: string, title: string) => {
    return {
        type: TODO_ACTION_TYPE.CHANGE_TODO_TITLE as const,
        payload: {
            Id,
            title
        }
    };
};

export const ChangeTodoTitleTC = (id: string, title: string): AppThunkType => async dispatch => {
    try {
        console.log('Start changing todo title');
        await todoApi.updateTodoListTitle(id, title);
        dispatch(ChangeTodoTitle(id, title));
        console.log('End changing todo title');
    } catch (e) {
        throw new Error(e);
    }
};

export type TodoReducerActionType =
    AddTodoActionType
    | SetTodosFromApiActionType | RemoveTodoActionType | SetFilterActionType | ChangeTodoTitleActionType;

export const todoReducer = (state: TodoStateType = [], action: TodoReducerActionType): TodoStateType => {
    switch (action.type) {

        case TODO_ACTION_TYPE.SET_TODOS_FROM_API: {
            return action.payload.todos;
        }

        case TODO_ACTION_TYPE.ADD_TODO: {
            return [action.payload.todo, ...state];
        }

        case TODO_ACTION_TYPE.REMOVE_TODO:
            return state.filter(todo => todo.id !== action.payload.id);

        case TODO_ACTION_TYPE.CHANGE_TODO_TITLE: {
            return state.map(todo =>
                todo.id === action.payload.Id ? ( {...todo, title: action.payload.title} ) : todo
            );
        }

        case TODO_ACTION_TYPE.SET_FILTER:
            return state.map(todo =>
                todo.id === action.payload.id ? ( {...todo, filter: action.payload.filter} ) : todo
            );

        default:
            return state;
    }
};