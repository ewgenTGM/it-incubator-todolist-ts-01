import { v1 } from 'uuid';
import { addTodoListAC, removeTodoListAC, setFilterAC, todoListReducer, TodoListStateType } from './todo-reducer';

let state: TodoListStateType = {
  todos: []
};

const todoListId1: string = v1();
const todoListId2: string = v1();

beforeEach( () => {

  state = {
    todos: [
      { id: todoListId1, title: 'Todolist_1 title', filter: 'all' },
      { id: todoListId2, title: 'Todolist_2 title', filter: 'all' }
    ]
  };
} );

test( 'Add todolist', () => {
  const newTodoTitle = 'TEST TODO LIST TITLE';
  const newTodoId = v1();
  const newState = todoListReducer( state, addTodoListAC( newTodoTitle, newTodoId ) );
  expect( state ).not.toBe( newState );
  expect( state.todos ).not.toBe( newState.todos );
  expect( newState.todos.length ).toBe( state.todos.length + 1 );
  expect( newState.todos[0].title ).toBe( newTodoTitle );
  expect( newState.todos[0].id ).toBe( newTodoId );
} );

test( 'Remove todolist', () => {
  const newState = todoListReducer( state, removeTodoListAC( todoListId1 ) );
  expect( state ).not.toBe( newState );
  expect( state.todos ).not.toBe( newState.todos );
  expect( newState.todos.length ).toBe( state.todos.length - 1 );
  expect( newState.todos.find( todo => todo.id === todoListId1 ) ).toBeUndefined();
  expect( state.todos.find( todo => todo.id === todoListId1 ) ).not.toBeUndefined();
} );

test( 'Set "active" filter', () => {
  const newState = todoListReducer( state, setFilterAC( todoListId1, 'active' ) );
  expect( state ).not.toBe( newState );
  expect( state.todos ).not.toBe( newState.todos );
  expect( newState.todos.length ).toBe( state.todos.length );
  expect( newState.todos.find( todo => todo.id === todoListId1 )?.filter === 'active' ).toBeTruthy();
  expect( state.todos.find( todo => todo.id === todoListId2 )?.filter === 'all' ).toBeTruthy();
} );