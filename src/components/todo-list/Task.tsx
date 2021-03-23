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
  removeTask: ( taskId: string ) => void
  changeTaskLabel: ( taskId: string, value: string, todoId: string ) => void
  setIsDone: ( taskId: string, value: boolean, todoId: string ) => void
}
export const Task: React.FC<TaskPropsType> = React.memo( props => {

  const { task, removeTask, todoId, setIsDone, changeTaskLabel } = props;

  console.log( 'Отрисовка Task' );

  return (
      <div
          key={ task.taskId }
          className={ 'task ' + ( task.isDone ? 'done' : '' ) }>
        <Tooltip title={ 'Remove task' }>
          <IconButton
              style={ { cursor: 'pointer', position: 'absolute', top: '2px', right: '2px', padding: '0' } }
              onClick={ () => removeTask( task.taskId ) }>
            <DeleteIcon
                fontSize={ 'small' }
            />
          </IconButton>
        </Tooltip>
        <Checkbox
            color={ 'primary' }
            readOnly={ true }
            checked={ task.isDone }
            onChange={ ( e ) => {setIsDone( task.taskId, e.currentTarget.checked, todoId );} }
        />
        <EditableSpan
            initialText={ task.title }
            callback={ ( e ) => changeTaskLabel( task.taskId, e, todoId ) }/>
      </div>
  );
} );