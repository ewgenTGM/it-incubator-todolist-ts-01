import { v1 } from 'uuid';
import { addTodo, removeTodo, setFilter, todoReducer, TodoListStateType } from './todo-reducer';

let state: TodoListStateType = {
  todos: []
};

const todoId1: string = v1();
const todoId2: string = v1();

beforeEach( () => {
  state = {
    todos: [
      { id: todoId1, title: 'Todolist_1 title', filter: 'all' },
      { id: todoId2, title: 'Todolist_2 title', filter: 'all' }
    ]
  };
} );

test( 'Add todolist', () => {
  const newTodoTitle = 'TEST TODO LIST TITLE';
  const newTodoId = v1();
  const newState = todoReducer( state, addTodo( newTodoTitle, newTodoId ) );
  expect( state ).not.toBe( newState );
  expect( state.todos ).not.toBe( newState.todos );
  expect( newState.todos.length ).toBe( state.todos.length + 1 );
  expect( newState.todos[0].title ).toBe( newTodoTitle );
  expect( newState.todos[0].id ).toBe( newTodoId );
} );

test( 'Remove todolist', () => {
  const newState = todoReducer( state, removeTodo( todoId1 ) );
  expect( state ).not.toBe( newState );
  expect( state.todos ).not.toBe( newState.todos );
  expect( newState.todos.length ).toBe( state.todos.length - 1 );
  expect( newState.todos.find( todo => todo.id === todoId1 ) ).toBeUndefined();
  expect( state.todos.find( todo => todo.id === todoId1 ) ).not.toBeUndefined();
} );

test( 'Set "active" filter', () => {
  const newState = todoReducer( state, setFilter( todoId1, 'active' ) );
  expect( state ).not.toBe( newState );
  expect( state.todos ).not.toBe( newState.todos );
  expect( newState.todos.length ).toBe( state.todos.length );
  expect( newState.todos.find( todo => todo.id === todoId1 )?.filter === 'active' ).toBeTruthy();
  expect( state.todos.find( todo => todo.id === todoId2 )?.filter === 'all' ).toBeTruthy();
} );