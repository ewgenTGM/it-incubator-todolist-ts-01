import React from 'react';
import { Checkbox, IconButton, Tooltip } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { EditableSpan } from '../editable-span/EditableSpan';

export type TaskType = {
  taskId: string
  title: string
  isDone: boolean
}

export type TaskPropsType = {
  todoId: string
  task: TaskType
  removeTask: ( todoId: string, taskId: string ) => void
  changeTaskLabel: ( taskId: string, value: string, todoId: string ) => void
  // setIsDone: ( taskId: string, value: boolean, todoId: string ) => void
  setIsDone: ( taskId: string, value: boolean ) => void
}
export const Task: React.FC<TaskPropsType> = React.memo( props => {
  const { task, todoId, setIsDone, changeTaskLabel } = props;
  console.log( 'Отрисовка Task c title', task.title );

  const removeTask = () => {
    if ( !window.confirm( `Are You sure want to remove <${ task.title }> task?` ) ) {
      return;
    }
    props.removeTask( todoId, task.taskId );
  };

  return (
      <div
          key={ task.taskId }
          className={ 'task ' + ( task.isDone ? 'done' : '' ) }>
        <Tooltip title={ 'Remove task' }>
          <IconButton
              style={ { cursor: 'pointer', position: 'absolute', top: '2px', right: '2px', padding: '0' } }
              onClick={ removeTask }>
            <DeleteIcon
                fontSize={ 'small' }
            />
          </IconButton>
        </Tooltip>
        <Checkbox
            color={ 'primary' }
            readOnly={ true }
            checked={ task.isDone }
            onChange={ ( e ) => setIsDone( task.taskId, e.currentTarget.checked ) }
        />
        <EditableSpan
            initialText={ task.title }
            callback={ ( e ) => changeTaskLabel( task.taskId, e, todoId ) }/>
      </div>
  );
} );