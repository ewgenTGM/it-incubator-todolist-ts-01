import React from 'react';
import {Checkbox, IconButton, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {EditableSpan} from '../editable-span/EditableSpan';
import './Task.css';
import {TaskDomainType} from '../../utils/api';

export type TaskPropsType = {
    task: TaskDomainType
    removeTask: (todoId: string, taskId: string) => void
    changeTask: (task: TaskDomainType) => void
}
export const Task: React.FC<TaskPropsType> = React.memo(props => {
    const {task} = props;
    console.log('Отрисовка Task c title', task.title);

    const changeTaskStatus = (value: boolean) => {
        props.changeTask({...task, status: value ? 2 : 1});
    };

    const changeTaskTitle = (title: string) => {
        props.changeTask({...task, title});
    };

    const removeTask = () => {
        if (!window.confirm(`Are You sure want to remove <${task.title}> task?`)) {
            return;
        }
        props.removeTask(task.todoListId, task.id);
    };

    return (
        <div
            key={task.id}
            className={'task ' + ( task.status === 2 ? 'done' : '' )}>
            <Tooltip title={'Remove task'}>
                <IconButton
                    style={{cursor: 'pointer', position: 'absolute', top: '2px', right: '2px', padding: '0'}}
                    onClick={removeTask}>
                    <DeleteIcon
                        fontSize={'small'}
                    />
                </IconButton>
            </Tooltip>
            <Checkbox
                color={'primary'}
                readOnly={true}
                checked={task.status === 2}
                onChange={(e) => changeTaskStatus(e.currentTarget.checked)}
            />
            <EditableSpan
                initialText={task.title}
                callback={(e) => changeTaskTitle(e)}/>
        </div>
    );
});