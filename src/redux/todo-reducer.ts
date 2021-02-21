import { TodoListType } from '../components/App';
import { v1 } from 'uuid';

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
  }
}
export const addTodoListAC = ( title: string ): AddTodoActionType => {
  return {
    type: ADD_TODOLIST,
    payload: { title }
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
        id: v1(),
        title: action.payload.title,
        filter: 'all'
      };
      return { ...state, todos: [ newTodoList, ...state.todos ] };
    default:
      return state;
  }
};