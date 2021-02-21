import { v1 } from 'uuid';
import { addTodoListAC, todoListReducer, TodoListStateType } from './todo-reducer';


test( 'Added post must be in the Array of todos', () => {
  let todoListId1 = v1();
  let todoListId2 = v1();
  const state: TodoListStateType = {
    todos: [
      { id: todoListId1, title: 'Learn JavaScript', filter: 'all' },
      { id: todoListId2, title: 'Learn React', filter: 'all' }
    ]
  };
  const newTodoTitle = 'TEST TODO LIST TITLE';
  const newState = todoListReducer( state, addTodoListAC( newTodoTitle ) );
  expect(state).not.toBe(newState);
  expect(state.todos).not.toBe(newState.todos);
  expect(newState.todos.length).toBe(state.todos.length + 1)
  expect(newState.todos[0].title).toBe(newTodoTitle);
} );