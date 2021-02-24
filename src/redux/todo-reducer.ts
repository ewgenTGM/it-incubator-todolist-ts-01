import { TodoListType } from '../components/App';

const ADD_TODOLIST = 'ADD_TODOLIST';
const REMOVE_TODOLIST = 'REMOVE_TODOLIST';

export type TodoListStateType = {
  todos: Array<TodoListType>
}
type RemoveTodoActionType = {
  type: typeof REMOVE_TODOLIST
  payload: {
    todoListId: string
  }
}

type AddTodoActionType = {
  type: typeof ADD_TODOLIST
  payload: {
    title: string
    todoListId: string
  }
}

export const addTodoListAC = ( title: string, todoListId: string ): AddTodoActionType => {
  return {
    type: ADD_TODOLIST,
    payload: { title, todoListId }
  };
};

export const removeTodoListAC = ( todoListId: string ): RemoveTodoActionType => {
  return {
    type: REMOVE_TODOLIST,
    payload: { todoListId }
  };
};

type TodoReducerActionType = AddTodoActionType | RemoveTodoActionType;

export const todoListReducer = ( state: TodoListStateType, action: TodoReducerActionType ): TodoListStateType => {
  switch ( action.type ) {
    case 'ADD_TODOLIST':
      const newTodoList: TodoListType = {
        id: action.payload.todoListId,
        title: action.payload.title,
        filter: 'all'
      };
      return { ...state, todos: [ newTodoList, ...state.todos ] };

    case REMOVE_TODOLIST:
      return { ...state, todos: state.todos.filter( todo => todo.id !== action.payload.todoListId ) };

    default:
      return state;
  }
};