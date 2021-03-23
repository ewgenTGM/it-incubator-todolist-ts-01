import React, { useReducer } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './add-item-form/AddItemForm';
import { FilterValuesType, TaskType, TodoList } from './todo-list/TodoList';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AddTodo, RemoveTodo, SetFilter, todoReducer, TodoStateType } from '../redux/todo-reducer';
import {
  AddTask,
  AddTodoTaskArray,
  ChangeTaskTitle,
  RemoveTask,
  SetIsDone,
  taskReducer,
  TaskStateType
} from '../redux/task-reducer';
import { tasksInitialState, todosInitialState } from '../redux/initialState';

export const AppWithUseReducer = () => {


      const [ todos, todosDispatch ] = useReducer( todoReducer, todosInitialState );
      const [ tasks, tasksDispatch ] = useReducer( taskReducer, tasksInitialState );


      const setFilter = ( filter: FilterValuesType, todoId: string ) => {
        todosDispatch( SetFilter( todoId, filter ) );
      };

      const removeTodoList = ( todoId: string ) => {
        if ( !window.confirm( `Are You sure want to remove <${ todos.find( tl => tl.todoId === todoId )?.title }> Todo list?` ) ) {
          return;
        }
        todosDispatch( RemoveTodo( todoId ) );
      };

      const addTodoList = ( title: string ) => {
        const newTodoId = v1();
        todosDispatch( AddTodo( title, newTodoId ) );
        tasksDispatch( AddTodoTaskArray( title, newTodoId ) );
      };

      const removeTask = ( taskId: string, todoId: string ) => {
        if ( !window.confirm( `Are You sure want to remove <${ tasks[todoId].find( t => t.taskId === taskId )?.title }> task?` ) ) {
          return;
        }
        tasksDispatch( RemoveTask( todoId, taskId ) );
      };

      const addTask = ( newTaskText: string, todoId: string ) => {
        if ( newTaskText.trim() === '' ) {
          return;
        }
        tasksDispatch( AddTask( todoId, v1(), newTaskText ) );
      };

      const setIsDone = ( taskId: string, value: boolean, todoId: string ) => {
        tasksDispatch( SetIsDone( todoId, taskId, value ) );
      };

      const changeTaskTitle = ( taskId: string, value: string, todoId: string ) => {
        tasksDispatch( ChangeTaskTitle( todoId, taskId, value ) );
      };

      const mappedTodoLists = todos.map( todoList => {
        let tasksForTodoList: Array<TaskType>;

        switch ( todoList.filter ) {
          case 'all':
            tasksForTodoList = tasks[todoList.todoId];
            break;
          case 'active':
            tasksForTodoList = tasks[todoList.todoId].filter( t => !t.isDone );
            break;
          case 'completed':
            tasksForTodoList = tasks[todoList.todoId].filter( t => t.isDone );
            break;
        }

        return (
            <TodoList
                key={ todoList.todoId }
                todoId={ todoList.todoId }
                label={ todoList.title }
                tasks={ tasksForTodoList }
                addTask={ addTask }
                removeTask={ removeTask }
                setFilter={ setFilter }
                currentFilter={ todoList.filter }
                setIsDone={ setIsDone }
                removeTodoList={ removeTodoList }
                changeTaskLabel={ changeTaskTitle }
            /> );
      } );

      return (
          <>
            <AppBar position="static">
              <Toolbar>
                <IconButton
                    edge="start"
                    color="inherit">
                  <MenuIcon/>
                </IconButton>
                <Typography
                    style={ { flexGrow: 1 } }
                    variant="h6">
                  Todo lists
                </Typography>
                <Button color="inherit">Login</Button>
              </Toolbar>
            </AppBar>
            <Container style={ { marginTop: '25px' } }>
              <Box
                  display={ 'flex' }
                  flexDirection={ 'column' }
                  justifyContent={ 'center' }
                  alignItems={ 'center' }>
                <AddItemForm
                    defaultWidth={ '600px' }
                    onSubmit={ addTodoList }
                    buttonLabel={ 'Add todo' }
                    inputPlaceholder={ 'Add todo' }/>
                <Box
                    display={ 'flex' }
                    justifyContent={ 'flex-start' }
                    alignItems={ 'flex-start' }
                    flexWrap={ 'wrap' }>
                  { mappedTodoLists }
                </Box>
              </Box>
            </Container>
          </>
      );
    }
;