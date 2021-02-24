import React, { useState } from 'react';
import './App.css';
import { v1 } from 'uuid';
import { AddItemForm } from './add-item-form/AddItemForm';
import { FilterValuesType, TaskType, TodoList } from './todo-list/TodoList';
import { AppBar, Box, Button, Container, IconButton, Paper, Toolbar, Typography } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';

export type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

export const App = () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [ todoLists, setTodoLists ] = useState<Array<TodoListType>>( [
    { id: todoListId1, title: 'Learn JavaScript', filter: 'all' },
    { id: todoListId2, title: 'Learn React', filter: 'all' }
  ] );

  const [ tasks, setTasks ] = useState<TaskStateType>( {
    [todoListId1]: [
      {
        id: v1(),
        label: 'Открыть сайт LearnJS.ru',
        isDone: true
      },
      {
        id: v1(),
        label: 'Пройти весь курс.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Ты прекрасен.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Можно по пиву.',
        isDone: true
      }
    ],
    [todoListId2]: [
      {
        id: v1(),
        label: 'Открыть сайт React.ru',
        isDone: true
      },
      {
        id: v1(),
        label: 'Ничего не понять.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Ты дно.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Боль.',
        isDone: true
      }
    ]
  } );

  const setFilter = ( filter: FilterValuesType, todoListId: string ) => {
    const todoList = todoLists.find( t => t.id === todoListId );
    if ( todoList ) {
      todoList.filter = filter;
      setTodoLists( [ ...todoLists ] );
    }
  };

  const removeTodoList = ( todoListId: string ) => {
    if ( !window.confirm( `Are You sure want to remove <${ todoLists.find( tl => tl.id === todoListId )?.title }> Todo list?` ) ) {
      return;
    }
    setTodoLists( todoLists.filter( todoList => todoList.id !== todoListId ) );
    delete tasks[todoListId];
    setTasks( { ...tasks } );
  };

  const addTodoList = ( title: string ) => {
    const newTodoListId = v1();
    setTodoLists( [ { id: newTodoListId, filter: 'all', title: title }, ...todoLists ] );
    setTasks( { ...tasks, [newTodoListId]: [] } );
  };

  const removeTask = ( taskId: string, todoListId: string ) => {
    if ( !window.confirm( `Are You sure want to remove <${ tasks[todoListId].find( t => t.id === taskId )?.label }> task?` ) ) {
      return;
    }
    tasks[todoListId] = tasks[todoListId].filter( t => t.id !== taskId );
    setTasks( { ...tasks } );
  };

  const addTask = ( newTaskText: string, todoListId: string ) => {
    if ( newTaskText.trim() === '' ) {
      return;
    }
    const task: TaskType = {
      id: v1(),
      label: newTaskText,
      isDone: false
    };
    tasks[todoListId].unshift( task );
    setTasks( { ...tasks } );
  };

  const setIsDone = ( taskId: string, value: boolean, todoListId: string ) => {
    const task = tasks[todoListId].find( t => t.id === taskId );
    if ( task ) {
      task.isDone = value;
      setTasks( { ...tasks } );
    }
  };

  const changeTaskLabel = ( taskId: string, value: string, todoListId: string ) => {
    const task = tasks[todoListId].find( t => t.id === taskId );
    if ( task ) {
      task.label = value;
      setTasks( { ...tasks } );
    }
  };


  const mappedTodoLists = todoLists.map( todoList => {
    let tasksForTodoList: Array<TaskType>;

    switch ( todoList.filter ) {
      case 'all':
        tasksForTodoList = tasks[todoList.id];
        break;
      case 'active':
        tasksForTodoList = tasks[todoList.id].filter( t => !t.isDone );
        break;
      case 'completed':
        tasksForTodoList = tasks[todoList.id].filter( t => t.isDone );
        break;
    }
    return (
        <TodoList
            key={ todoList.id }
            id={ todoList.id }
            label={ todoList.title }
            tasks={ tasksForTodoList }
            addTask={ addTask }
            removeTask={ removeTask }
            setFilter={ setFilter }
            currentFilter={ todoList.filter }
            setIsDone={ setIsDone }
            removeTodoList={ removeTodoList }
            changeTaskLabel={ changeTaskLabel }
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
};