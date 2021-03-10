import { FilterValuesType } from '../components/todo-list/TodoList';

const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const SET_FILTER = 'SET_FILTER';

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

export type TodoListStateType = {
  todos: Array<TodoListType>
}

type RemoveTodoActionType = {
  type: typeof REMOVE_TODO
  payload: {
    todoId: string
  }
}

type AddTodoActionType = {
  type: typeof ADD_TODO
  payload: {
    title: string
    todoId: string
  }
}

type SetFilterActionType = {
  type: typeof SET_FILTER
  payload: {
    todoId: string
    filter: FilterValuesType
  }
}

export const addTodo = ( title: string, todoId: string ): AddTodoActionType => {
  return {
    type: ADD_TODO,
    payload: { title, todoId: todoId }
  };
};

export const removeTodo = ( todoId: string ): RemoveTodoActionType => {
  return {
    type: REMOVE_TODO,
    payload: { todoId: todoId }
  };
};

export const setFilter = ( todoId: string, filter: FilterValuesType ): SetFilterActionType => {
  return {
    type: SET_FILTER,
    payload: {
      todoId,
      filter
    }
  };
};

type TodoReducerActionType = AddTodoActionType | RemoveTodoActionType | SetFilterActionType;

export const todoReducer = ( state: TodoListStateType, action: TodoReducerActionType ): TodoListStateType => {
  switch ( action.type ) {
    case 'ADD_TODO':
      const newTodoList: TodoListType = {
        id: action.payload.todoId,
        title: action.payload.title,
        filter: 'all'
      };
      return { ...state, todos: [ newTodoList, ...state.todos ] };

    case REMOVE_TODO:
      return { ...state, todos: state.todos.filter( todo => todo.id !== action.payload.todoId ) };

    case SET_FILTER:
      const newTodos = [ ...state.todos ];
      const todo = newTodos.find( t => t.id === action.payload.todoId );
      if ( todo ) {
        todo.filter = 'active';
        return { ...state, todos: newTodos };
      } else
        return state;

    default:
      return state;
  }
};