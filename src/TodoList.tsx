import React, { ChangeEvent } from 'react';
import './TodoList.css';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import { Box, Button, Checkbox, IconButton, Paper, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

export type TaskType = {
  id: string
  label: string
  isDone: boolean
}

export type TodoListPropsType = {
  id: string
  label: string
  tasks: Array<TaskType>
  currentFilter: FilterValuesType
  addTask: ( text: string, todoListId: string ) => void
  removeTask: ( id: string, todoListId: string ) => void
  setFilter: ( filter: FilterValuesType, todoListId: string ) => void
  setIsDone: ( id: string, value: boolean, todoListId: string ) => void
  changeTaskLabel: ( id: string, value: string, todoListId: string ) => void
  removeTodoList: ( todoListId: string ) => void
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export const TodoList = ( props: TodoListPropsType ) => {

  const addTask = ( text: string ) => {
    props.addTask( text, props.id );
  };
  const changeFilter = ( filter: FilterValuesType ) => {
    props.setFilter( filter, props.id );
  };


  const mappedTasks = props.tasks.map( task => {
    const setIsDone = ( event: ChangeEvent<HTMLInputElement> ) => props.setIsDone( task.id, event.currentTarget.checked, props.id );
    const changeTaskLabel = ( text: string ) => {
      props.changeTaskLabel( task.id, text, props.id );
    };
    return (
        <div
            key={ task.id }
            className={ 'task ' + ( task.isDone ? 'done' : '' ) }>
          <Tooltip title={ 'Remove task' }>
            <IconButton style={ { cursor: 'pointer', position: 'absolute', top: '2px', right: '2px', padding: '0' } }>
              <DeleteIcon
                  fontSize={ 'small' }
                  onClick={ () => props.removeTask( task.id, props.id ) }
              />
            </IconButton>
          </Tooltip>
          <Checkbox
              color={ 'primary' }
              readOnly={ true }
              checked={ task.isDone }
              onChange={ setIsDone }
          />
          <EditableSpan
              initialText={ task.label }
              callback={ changeTaskLabel }/>
        </div>
    );
  } );
  const filterButtons = <fieldset>
    <legend>Set filter</legend>
    <Box
        display={ 'flex' }
        justifyContent={ 'space-around' }
        alignItems={ 'center' }>
      <Button
          size={ 'small' }
          color={ 'primary' }
          variant={ props.currentFilter === 'all' ? 'contained' : 'outlined' }
          onClick={ () => changeFilter( 'all' ) }>
        All
      </Button>
      <Button
          size={ 'small' }
          color={ 'primary' }
          variant={ props.currentFilter === 'active' ? 'contained' : 'outlined' }
          onClick={ () => changeFilter( 'active' ) }>
        Active
      </Button>
      <Button
          size={ 'small' }
          color={ 'primary' }
          variant={ props.currentFilter === 'completed' ? 'contained' : 'outlined' }
          onClick={ () => changeFilter( 'completed' ) }>
        Completed
      </Button>
    </Box>
  </fieldset>;

  return (
      <Paper
          elevation={ 3 }
          style={ { padding: '15px', margin: '20px', position: 'relative', width: '350px' } }>
        <Tooltip
            title={ 'Remove todo' }>
          <IconButton style={ { position: 'absolute', top: '5px', right: '5px', padding: '0' } }>
            <DeleteIcon
                fontSize={ 'default' }
                onClick={ () => props.removeTodoList( props.id ) }
                className={ 'delete_btn' }
            />
          </IconButton>
        </Tooltip>
        <div className='todo_title'>{ props.label }</div>
        <AddItemForm
            onSubmit={ addTask }
            buttonLabel={ 'Add task' }
            inputPlaceholder={ 'Input task' }/>
        { mappedTasks.length !== 0 && filterButtons }
        { mappedTasks.length !== 0 ? mappedTasks : <div>No tasks</div> }
      </Paper>
  );
};