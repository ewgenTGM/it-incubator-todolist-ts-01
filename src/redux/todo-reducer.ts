import { FilterValuesType } from '../components/todo-list/TodoList';
import { todosInitialState } from './initialState';

export enum TODO_ACTION_TYPE {
  ADD_TODO = 'ADD_TODO',
  REMOVE_TODO = 'REMOVE_TODO',
  SET_FILTER = 'SET_FILTER'
}


export type TodoType = {
  todoId: string
  title: string
  filter: FilterValuesType
}

export type TodoStateType = Array<TodoType>;

type RemoveTodoActionType = {
  type: TODO_ACTION_TYPE.REMOVE_TODO
  payload: {
    todoId: string
  }
}

type AddTodoActionType = {
  type: TODO_ACTION_TYPE.ADD_TODO
  payload: {
    todoId: string
    title: string
    filter: FilterValuesType
  }
}

type SetFilterActionType = {
  type: TODO_ACTION_TYPE.SET_FILTER
  payload: {
    todoId: string
    filter: FilterValuesType
  }
}

export const AddTodo = ( todoId: string, title: string, filter: FilterValuesType = 'all' ): AddTodoActionType => {
  return {
    type: TODO_ACTION_TYPE.ADD_TODO,
    payload: { todoId, title, filter }
  };
};

export const RemoveTodo = ( todoId: string ): RemoveTodoActionType => {
  return {
    type: TODO_ACTION_TYPE.REMOVE_TODO,
    payload: { todoId: todoId }
  };
};

export const SetFilter = ( todoId: string, filter: FilterValuesType ): SetFilterActionType => {
  return {
    type: TODO_ACTION_TYPE.SET_FILTER,
    payload: {
      todoId,
      filter
    }
  };
};

type TodoReducerActionType = AddTodoActionType | RemoveTodoActionType | SetFilterActionType;

export const todoReducer = ( state: TodoStateType = todosInitialState, action: TodoReducerActionType ): TodoStateType => {
  switch ( action.type ) {

    case TODO_ACTION_TYPE.ADD_TODO: {
      return [ action.payload, ...state ];
    }

    case TODO_ACTION_TYPE.REMOVE_TODO:
      return state.filter( todo => todo.todoId !== action.payload.todoId );

    case TODO_ACTION_TYPE.SET_FILTER:
      const newTodos = [ ...state ];
      const todo = newTodos.find( t => t.todoId === action.payload.todoId );
      if ( todo ) {
        todo.filter = action.payload.filter;
        return newTodos;
      } else
        return state;

    default:
      return state;
  }
};