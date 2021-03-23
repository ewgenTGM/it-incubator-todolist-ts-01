import React, { useCallback } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './add-item-form/AddItemForm';
import { FilterValuesType, TaskType, TodoList } from './todo-list/TodoList';
import { AppBar, Box, Button, Container, IconButton, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import { AddTodo, RemoveTodo, SetFilter, TodoStateType } from '../redux/todo-reducer';
import {
  AddTask,
  AddTodoTaskArray,
  ChangeTaskTitle,
  RemoveTask, RemoveTodoTaskArray,
  SetIsDone,
  TaskStateType
} from '../redux/task-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { RootStateType } from '../redux/store';
import { TodoListWithAllTasks } from './todo-list/TodoListWithAllTasks';

export const AppWithRedux = React.memo( () => {

  console.log( 'Отрисовка AppWithRedux' );

  const dispatch = useDispatch();

  const todos = useSelector<RootStateType, TodoStateType>( state => state.todos );
  const tasks = useSelector<RootStateType, TaskStateType>( state => state.tasks );

  const setFilter = useCallback( ( filter: FilterValuesType, todoId: string ) => {
    dispatch( SetFilter( todoId, filter ) );
  }, [] );

  const removeTodoList = ( todoId: string ) => {
    if ( !window.confirm( `Are You sure want to remove <${ todos.find( tl => tl.todoId === todoId )?.title }> Todo list?` ) ) {
      return;
    }
    dispatch( RemoveTodo( todoId ) );
    dispatch( RemoveTodoTaskArray( todoId ) );
  };

  const addTodoList = useCallback( ( title: string ) => {
    const newTodoId = v1();
    dispatch( AddTodo( newTodoId, title ) );
    dispatch( AddTodoTaskArray( newTodoId, title ) );
  }, [] );

  const removeTask = useCallback( ( todoId: string, taskId: string ) => {
    console.log( todoId, taskId );
    if ( !window.confirm( `Are You sure want to remove <${ tasks[todoId].find( t => t.taskId === taskId )?.title }> task?` ) ) {
      return;
    }
    dispatch( RemoveTask( todoId, taskId ) );
  }, [] );

  const addTask = (todoId: string, newTaskText: string ) => {
    if ( newTaskText.trim() === '' ) {
      return;
    }
    dispatch( AddTask( todoId, v1(), newTaskText ) );
  };

  const setIsDone = useCallback( ( taskId: string, value: boolean, todoId: string ) => {
    dispatch( SetIsDone( todoId, taskId, value ) );
  }, [] );

  const changeTaskTitle = useCallback( ( taskId: string, value: string, todoId: string ) => {
    dispatch( ChangeTaskTitle( todoId, taskId, value ) );
  }, [] );

  const mappedTodoLists = todos.map( todoList => {
    return (
        <TodoListWithAllTasks
            key={ todoList.todoId }
            todoId={ todoList.todoId }
            label={ todoList.title }
            tasks={ tasks[todoList.todoId] }
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
} );