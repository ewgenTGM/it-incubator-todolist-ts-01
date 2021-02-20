import { TodoListType } from '../src/components/App';
import { v1 } from 'uuid';

const ADD_TODO_LIST = 'ADD_TODO_LIST';

export type TodoListStateType = {
  todos: Array<TodoListType>
}
type AddTodoActionType = {
  type: typeof ADD_TODO_LIST
  payload: {
    title: string
  }
}
export const addTodoListAc = ( title: string ): AddTodoActionType => {
  return {
    type: ADD_TODO_LIST,
    payload: {
      title: title
    }
  };
};
type TodoReducerActionType = AddTodoActionType;

export const todoListReducer = ( state: TodoListStateType, action: TodoReducerActionType ): TodoListStateType => {
  switch ( action.type ) {
    case 'ADD_TODO_LIST':
      const newTodoList: TodoListType = {
        id: v1(),
        title: action.payload.title,
        filter: 'all'
      };
      return { ...state, todos: [ newTodoList, ...state.todos ] };
  }
};