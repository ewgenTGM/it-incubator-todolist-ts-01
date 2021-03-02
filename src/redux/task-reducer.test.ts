import { AddTaskAC, AddTaskActionType, RemoveTaskAC, taskReducer, TaskStateType } from './task-reducer';
import { v1 } from 'uuid';

const todolistId_1 = v1();
const todolistId_2 = v1();
let state: TaskStateType = {};

beforeEach( () => {
  state = {
    [todolistId_1]: [
      { taskId: 'taskId1', title: 'Title of taskId1', isDone: false },
      { taskId: 'taskId2', title: 'Title of taskId2', isDone: true },
      { taskId: 'taskId3', title: 'Title of taskId3', isDone: true }
    ],
    [todolistId_2]: [
      { taskId: 'taskId1', title: 'Title of taskId1', isDone: true },
      { taskId: 'taskId2', title: 'Title of taskId2', isDone: true },
      { taskId: 'taskId3', title: 'Title of taskId3', isDone: false }
    ]
  };
} );

test( 'Add task', () => {
  const newTitle: string = 'Title of taskId4';
  const action: AddTaskActionType = AddTaskAC( todolistId_1, 'taskId4', newTitle );
  const newState = taskReducer( state, action );
  expect( newState === state ).toBeFalsy();
  expect( newState[todolistId_1].find( task => task.taskId === 'taskId4' ) ).not.toBeUndefined();
  expect( newState[todolistId_1].find( task => task.taskId === 'taskId4' )?.title ).toBe( newTitle );
  expect( newState[todolistId_1].length ).toBe( state[todolistId_1].length + 1 );
} );

test( 'Remove task', () => {
  const action = RemoveTaskAC( todolistId_2, 'taskId1' );
  const newState = taskReducer( state, action );
  expect( newState === state ).toBeFalsy();
  expect( newState[todolistId_1] === state[todolistId_1] ).toBeTruthy();
  expect( newState[todolistId_2] === state[todolistId_2] ).toBeFalsy();
  expect( newState[todolistId_2].find( task => task.taskId === 'taskId1' ) ).toBeUndefined();
  expect( newState[todolistId_1].find( task => task.taskId === 'taskId1' ) ).not.toBeUndefined();
} );