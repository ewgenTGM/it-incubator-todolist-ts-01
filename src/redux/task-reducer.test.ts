import {
  AddTask,
  AddTodoTaskArray,
  ChangeTaskTitle,
  RemoveTask, RemoveTodoTaskArray,
  SetIsDone,
  taskReducer,
  TaskStateType
} from './task-reducer';
import { v1 } from 'uuid';
import { RemoveTodo } from './todo-reducer';

const todoId_1 = v1();
const todoId_2 = v1();
let state: TaskStateType = {};

beforeEach( () => {
  state = {
    [todoId_1]: [
      { taskId: 'taskId1', title: 'Title of taskId1', isDone: false },
      { taskId: 'taskId2', title: 'Title of taskId2', isDone: true },
      { taskId: 'taskId3', title: 'Title of taskId3', isDone: true }
    ],
    [todoId_2]: [
      { taskId: 'taskId1', title: 'Title of taskId1', isDone: true },
      { taskId: 'taskId2', title: 'Title of taskId2', isDone: true },
      { taskId: 'taskId3', title: 'Title of taskId3', isDone: false }
    ]
  };
} );

test( 'Add task', () => {
  const newTitle: string = 'Title of taskId4';
  const action = AddTask( todoId_1, 'taskId4', newTitle );
  const newState = taskReducer( state, action );
  expect( newState === state ).toBeFalsy();
  expect( newState[todoId_1].find( task => task.taskId === 'taskId4' ) ).not.toBeUndefined();
  expect( newState[todoId_1].find( task => task.taskId === 'taskId4' )?.title ).toBe( newTitle );
  expect( newState[todoId_1].length ).toBe( state[todoId_1].length + 1 );
} );

test( 'Remove task', () => {
  const action = RemoveTask( todoId_2, 'taskId1' );
  const newState = taskReducer( state, action );
  expect( newState === state ).toBeFalsy();
  expect( newState[todoId_1] === state[todoId_1] ).toBeTruthy();
  expect( newState[todoId_2] === state[todoId_2] ).toBeFalsy();
  expect( newState[todoId_2].find( task => task.taskId === 'taskId1' ) ).toBeUndefined();
  expect( newState[todoId_1].find( task => task.taskId === 'taskId1' ) ).not.toBeUndefined();
} );

test( 'Set is done', () => {
  const action = SetIsDone( todoId_2, 'taskId2', false );
  const newState = taskReducer( state, action );
  expect( newState[todoId_2].find( t => t.taskId === 'taskId2' )?.isDone ).toBeFalsy();
  expect( newState[todoId_1].find( t => t.taskId === 'taskId2' )?.isDone ).toBeTruthy();
  expect( state[todoId_2].find( t => t.taskId === 'taskId2' ) ).not.toBe( newState[todoId_2].find( t => t.taskId === 'taskId2' ) );
} );

test( 'Change task title', () => {
  const action = ChangeTaskTitle( todoId_1, 'taskId1', 'Task new title' );
  const newState = taskReducer( state, action );
  expect( state[todoId_1].find( t => t.taskId === 'taskId1' ) === newState[todoId_1].find( t => t.taskId === 'taskId1' ) ).toBeFalsy();
  expect( newState[todoId_1].find( t => t.taskId === 'taskId1' )?.title ).toBe( 'Task new title' );
  expect( newState[todoId_2].find( t => t.taskId === 'taskId1' )?.title ).toBe( 'Title of taskId1' );
  expect( state[todoId_1].find( t => t.taskId === 'taskId1' )?.title ).toBe( 'Title of taskId1' );
} );

test( 'Add todo', () => {
  const newTodoId = v1();
  const action = AddTodoTaskArray( newTodoId, '' );
  const newState = taskReducer( state, action );
  expect( newState[newTodoId] ).not.toBeUndefined();
  expect( Object.keys( newState ).length ).toBe( Object.keys( state ).length + 1 );
} );

test( 'Remove todo', () => {
  const action = RemoveTodoTaskArray( todoId_1 );
  const newState = taskReducer( state, action );
  expect( newState[todoId_1] ).toBeUndefined();
  expect( Object.keys( newState ).length ).toBe( Object.keys( state ).length - 1 );
} );
