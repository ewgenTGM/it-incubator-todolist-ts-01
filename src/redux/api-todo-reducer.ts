import {FilterValuesType} from '../components/todo-list/TodoList';
import {todoApi, TodoListDomainType} from '../utils/api';
import {Dispatch} from 'redux';

export enum TODO_ACTION_TYPE_API {
  SET_TODO_API = 'SET_TODO_API',
  ADD_TODO_API = 'ADD_TODO_API',
  REMOVE_TODO_API = 'REMOVE_TODO_API',
  SET_FILTER_API = 'SET_FILTER_API',
  CHANGE_TODO_TITLE_API = 'CHANGE_TODO_TITLE_API'
}

type FilterType = {
  filter: FilterValuesType
}
export type TodoType_api = TodoListDomainType & FilterType

export type TodoStateType_api = Array<TodoType_api> | {};

type RemoveTodoActionType_api = {
  type: TODO_ACTION_TYPE_API.REMOVE_TODO_API
  payload: {
    todoId: string
  }
}

type SetTodoActionType_api = {
  type: TODO_ACTION_TYPE_API.SET_TODO_API
  payload: {
    todos: Array<TodoType_api>
  }
}

type AddTodoActionType_api = {
  type: TODO_ACTION_TYPE_API.ADD_TODO_API
  payload: {
    todoId: string
    title: string
    filter: FilterValuesType
  }
}

type SetFilterActionType_api = {
  type: TODO_ACTION_TYPE_API.SET_FILTER_API
  payload: {
    todoId: string
    filter: FilterValuesType
  }
}

type ChangeTodoTitleActionType_api = {
  type: TODO_ACTION_TYPE_API.CHANGE_TODO_TITLE_API,
  payload: {
    todoId: string
    title: string
  }
}

// export const SetTodo_api = ();

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

export const AddTodo_api = (todoId: string, title: string, filter: FilterValuesType = 'all'): AddTodoActionType_api => {
  return {
    type: TODO_ACTION_TYPE_API.ADD_TODO_API,
    payload: {todoId, title, filter}
  };
};

export const RemoveTodo_api = (todoId: string): RemoveTodoActionType_api => {
  return {
    type: TODO_ACTION_TYPE_API.REMOVE_TODO_API,
    payload: {todoId: todoId}
  };
};

export const SetFilter_api = (todoId: string, filter: FilterValuesType): SetFilterActionType_api => {
  return {
    type: TODO_ACTION_TYPE_API.SET_FILTER_API,
    payload: {
      todoId,
      filter
    }
  };
};

export const ChangeTodoTitle_api = (todoId: string, title: string): ChangeTodoTitleActionType_api => {
  return {
    type: TODO_ACTION_TYPE_API.CHANGE_TODO_TITLE_API,
    payload: {
      todoId,
      title
    }
  };
};

type TodoReducerActionType_api =
    SetTodoActionType_api
    | AddTodoActionType_api
    | RemoveTodoActionType_api
    | SetFilterActionType_api
    | ChangeTodoTitleActionType_api;

export const apiTodoReducer = (state: TodoStateType_api = {}, action: TodoReducerActionType_api): TodoStateType_api => {
  switch (action.type) {

    case TODO_ACTION_TYPE_API.SET_TODO_API:
      return action.payload.todos;

      // case TODO_ACTION_TYPE_API.ADD_TODO_API: {
      //   return [action.payload, ...state];
      // }

      // case TODO_ACTION_TYPE_API.REMOVE_TODO_API:
      //   return state.filter(todo => todo.todoId !== action.payload.todoId);

      // case TODO_ACTION_TYPE_API.CHANGE_TODO_TITLE_API: {
      //   return state.map(todo =>
      //       todo.todoId === action.payload.todoId ? ( {...todo, title: action.payload.title} ) : todo
      //   );
      // }

      // case TODO_ACTION_TYPE_API.SET_FILTER_API:
      //   return state.map(todo =>
      //       todo.todoId === action.payload.todoId ? ( {...todo, filter: action.payload.filter} ) : todo
      //   );

    default:
      return state;
  }
};