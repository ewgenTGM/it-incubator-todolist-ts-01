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
  id: string
  task: TaskType
  removeTask: ( id: string, todoListId: string ) => void
  changeTaskLabel: ( id: string, value: string, todoListId: string ) => void
  setIsDone: ( id: string, value: boolean, todoListId: string ) => void
}
export const Task: React.FC<TaskPropsType> = React.memo( props => {

  const { task, removeTask, id, setIsDone, changeTaskLabel } = props;

  console.log( 'Отрисовка Task');

  return (
      <div
          key={ task.taskId }
          className={ 'task ' + ( task.isDone ? 'done' : '' ) }>
        <Tooltip title={ 'Remove task' }>
          <IconButton
              style={ { cursor: 'pointer', position: 'absolute', top: '2px', right: '2px', padding: '0' } }
              onClick={ () => removeTask( task.taskId, id ) }>
            <DeleteIcon
                fontSize={ 'small' }
            />
          </IconButton>
        </Tooltip>
        <Checkbox
            color={ 'primary' }
            readOnly={ true }
            checked={ task.isDone }
            onChange={ ( e ) => {setIsDone( task.taskId, e.currentTarget.checked, id );} }
        />
        <EditableSpan
            initialText={ task.title }
            callback={ ( e ) => changeTaskLabel( task.taskId, e, id ) }/>
      </div>
  );
} );