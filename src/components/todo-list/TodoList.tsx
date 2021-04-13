import React, {useCallback, useEffect} from 'react';
import './TodoList.css';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {Box, Button, IconButton, Paper, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Task} from './Task';
import {EditableSpan} from '../editable-span/EditableSpan';
import {TaskDomainType} from '../../utils/api';
import {useDispatch} from 'react-redux';
import {SetTasksFromApiTC} from '../../redux/task-reducer';

export type TodoListPropsType = {
    todoId: string
    label: string
    tasks: Array<TaskDomainType>
    currentFilter: FilterValuesType
    addTask: (todoId: string, text: string) => void
    removeTask: (todoId: string, taskId: string) => void
    setFilter: (filter: FilterValuesType, todoId: string) => void
    changeTask: (task: TaskDomainType) => void
    changeTodoTitle: (todoId: string, value: string) => void
    removeTodoList: (todoId: string) => void
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export const TodoList: React.FC<TodoListPropsType> = React.memo(props => {
    const {
        todoId,
        label,
        tasks,
        currentFilter,
        changeTask
    } = props;

    console.log('Отрисовка TodoList c title', label);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(SetTasksFromApiTC(todoId));
    }, []);

    let filteredTasks: Array<TaskDomainType>;

    switch (currentFilter) {
        case 'all':
            filteredTasks = tasks;
            break;
        case 'active':
            filteredTasks = tasks.filter(t => !( t.status === 2 ));
            break;
        case 'completed':
            filteredTasks = tasks.filter(t => t.status === 2);
            break;
    }
    const removeTodoList = () => {
        if (!window.confirm(`Are You sure want to remove <${label}> Todo list?`)) {
            return;
        }
        props.removeTodoList(todoId);
    };

    const changeTodoTitle = useCallback((title: string) => {
        props.changeTodoTitle(todoId, title);
    }, [todoId]);

    const setFilter = useCallback((filter: FilterValuesType) => props.setFilter(filter, todoId), [todoId]);
    const addTask = useCallback((text) => props.addTask(todoId, text), [todoId]);
    const removeTask = useCallback(props.removeTask, []);

    const mappedTasks = filteredTasks.map(task => <Task
            task={task}
            removeTask={removeTask}
            changeTask={changeTask}
            key={task.id}
        />
    );
    const filterButtons = <fieldset>
        <legend>Set filter</legend>
        <Box
            display={'flex'}
            justifyContent={'space-around'}
            alignItems={'center'}>
            <Button
                size={'small'}
                color={'primary'}
                variant={currentFilter === 'all' ? 'contained' : 'outlined'}
                onClick={() => setFilter('all')}>
                All
            </Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={currentFilter === 'active' ? 'contained' : 'outlined'}
                onClick={() => setFilter('active')}>
                Active
            </Button>
            <Button
                size={'small'}
                color={'primary'}
                variant={currentFilter === 'completed' ? 'contained' : 'outlined'}
                onClick={() => setFilter('completed')}>
                Completed
            </Button>
        </Box>
    </fieldset>;

    return (
        <Paper
            elevation={3}
            style={{padding: '15px', margin: '20px', position: 'relative', width: '300px'}}>
            <Tooltip
                title={'Remove todo'}>
                <IconButton
                    style={{position: 'absolute', top: '5px', right: '5px', padding: '0'}}
                    onClick={removeTodoList}>
                    <DeleteIcon
                        fontSize={'default'}
                        className={'delete_btn'}
                    />
                </IconButton>
            </Tooltip>
            <EditableSpan
                initialText={label}
                callback={(text) => {
                    changeTodoTitle(text);
                }}
                superSpan/>
            <AddItemForm
                onSubmit={addTask}
                buttonLabel={'Add task'}
                inputPlaceholder={'Input task'}/>
            {filterButtons}
            {mappedTasks.length !== 0
                ? mappedTasks
                : <div style={{marginTop: '15px', textAlign: 'center'}}>No tasks</div>}
        </Paper>
    );
});