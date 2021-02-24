import { TodoListType } from '../components/App';
import { FilterValuesType } from '../components/todo-list/TodoList';

const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';
const SET_FILTER = 'SET_FILTER';

export type TodoListStateType = {
  todos: Array<TodoListType>
}
type RemoveTodoActionType = {
  type: typeof REMOVE_TODOLIST
  payload: {
    todolistId: string
  }
}

type AddTodoActionType = {
  type: typeof ADD_TODOLIST
  payload: {
    title: string
    todolistId: string
  }
}

type SetFilterActionType = {
  type: typeof SET_FILTER
  payload: {
    todolistId: string
    filter: FilterValuesType
  }
}

export const addTodoListAC = ( title: string, todolistId: string ): AddTodoActionType => {
  return {
    type: ADD_TODOLIST,
    payload: { title, todolistId: todolistId }
  };
};

export const removeTodoListAC = ( todolistId: string ): RemoveTodoActionType => {
  return {
    type: REMOVE_TODOLIST,
    payload: { todolistId: todolistId }
  };
};

export const setFilterAC = ( todolistId: string, filter: FilterValuesType ): SetFilterActionType => {
  return {
    type: SET_FILTER,
    payload: {
      todolistId,
      filter
    }
  };
};

type TodoReducerActionType = AddTodoActionType | RemoveTodoActionType | SetFilterActionType;

export const todoListReducer = ( state: TodoListStateType, action: TodoReducerActionType ): TodoListStateType => {
  switch ( action.type ) {
    case 'ADD_TODOLIST':
      const newTodoList: TodoListType = {
        id: action.payload.todolistId,
        title: action.payload.title,
        filter: 'all'
      };
      return { ...state, todos: [ newTodoList, ...state.todos ] };

    case REMOVE_TODOLIST:
      return { ...state, todos: state.todos.filter( todo => todo.id !== action.payload.todolistId ) };

    case SET_FILTER:
      const newTodos = [ ...state.todos ];
      const todo = newTodos.find( t => t.id === action.payload.todolistId );
      if ( todo ) {
        todo.filter = 'active';
        return { ...state, todos: newTodos };
      } else
        return state;

    default:
      return state;
  }
};