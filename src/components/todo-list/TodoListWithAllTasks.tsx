import React, { useCallback } from 'react';
import './TodoList.css';
import { AddItemForm } from '../add-item-form/AddItemForm';
import { Box, Button, IconButton, Paper, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { Task, TaskType } from './Task';

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

export const TodoListWithAllTasks: React.FC<TodoListPropsType> = React.memo( props => {

  const {
    id,
    label,
    tasks,
    currentFilter,
    addTask,
    setFilter,
    removeTodoList
  } = props;
  console.log( 'Отрисовка TodoListWithAllTasks' );

  let filteredTasks: Array<TaskType>;

  switch ( currentFilter ) {
    case 'all':
      filteredTasks = tasks;
      break;
    case 'active':
      filteredTasks = tasks.filter( t => !t.isDone );
      break;
    case 'completed':
      filteredTasks = tasks.filter( t => t.isDone );
      break;
  }

  const setIsDone = useCallback( props.setIsDone, [ id, props.setIsDone ] );
  const removeTask = useCallback( props.removeTask, [ id, props.removeTask ] );
  const changeTaskLabel = useCallback( props.changeTaskLabel, [ id, props.changeTaskLabel ] );

  const mappedTasks = filteredTasks.map( task => <Task
          id={ id }
          task={ task }
          changeTaskLabel={ changeTaskLabel }
          removeTask={ removeTask }
          setIsDone={ setIsDone }
          key={ task.taskId }
      />
  );
  const filterButtons = <fieldset>
    <legend>Set filter</legend>
    <Box
        display={ 'flex' }
        justifyContent={ 'space-around' }
        alignItems={ 'center' }>
      <Button
          size={ 'small' }
          color={ 'primary' }
          variant={ currentFilter === 'all' ? 'contained' : 'outlined' }
          onClick={ () => setFilter( 'all', id ) }>
        All
      </Button>
      <Button
          size={ 'small' }
          color={ 'primary' }
          variant={ currentFilter === 'active' ? 'contained' : 'outlined' }
          onClick={ () => setFilter( 'active', id ) }>
        Active
      </Button>
      <Button
          size={ 'small' }
          color={ 'primary' }
          variant={ currentFilter === 'completed' ? 'contained' : 'outlined' }
          onClick={ () => setFilter( 'completed', id ) }>
        Completed
      </Button>
    </Box>
  </fieldset>;

  return (
      <Paper
          elevation={ 3 }
          style={ { padding: '15px', margin: '20px', position: 'relative', width: '300px' } }>
        <Tooltip
            title={ 'Remove todo' }>
          <IconButton
              style={ { position: 'absolute', top: '5px', right: '5px', padding: '0' } }
              onClick={ () => removeTodoList( id ) }>
            <DeleteIcon
                fontSize={ 'default' }
                className={ 'delete_btn' }
            />
          </IconButton>
        </Tooltip>
        <div className='todo_title'>{ label }</div>
        <AddItemForm
            onSubmit={ text => addTask( text, id ) }
            buttonLabel={ 'Add task' }
            inputPlaceholder={ 'Input task' }/>
        { filterButtons }
        { mappedTasks.length !== 0
            ? mappedTasks
            : <div style={ { marginTop: '15px', textAlign: 'center' } }>No tasks</div> }
      </Paper>
  );
} );

