import React, {useCallback} from 'react';
import './TodoList.css';
import {AddItemForm} from '../add-item-form/AddItemForm';
import {Box, Button, IconButton, Paper, Tooltip} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import {Task, TaskType} from './Task';
import {EditableSpan} from '../editable-span/EditableSpan';

export type TodoListPropsType = {
  todoId: string
  label: string
  tasks: Array<TaskType>
  currentFilter: FilterValuesType
  addTask: (todoId: string, text: string) => void
  removeTask: (todoId: string, taskId: string) => void
  setFilter: (filter: FilterValuesType, todoId: string) => void
  setIsDone: (taskId: string, value: boolean, todoId: string) => void
  changeTaskLabel: (taskId: string, value: string, todoId: string) => void
  changeTodoTitle: (todoId: string, value: string) => void
  removeTodoList: (todoId: string) => void
}

export type FilterValuesType = 'all' | 'active' | 'completed';

export const TodoListWithAllTasks: React.FC<TodoListPropsType> = React.memo(props => {

  const {
    todoId,
    label,
    tasks,
    currentFilter
  } = props;

  console.log('Отрисовка TodoListWithAllTasks c title', label);

  let filteredTasks: Array<TaskType>;

  switch (currentFilter) {
    case 'all':
      filteredTasks = tasks;
      break;
    case 'active':
      filteredTasks = tasks.filter(t => !t.isDone);
      break;
    case 'completed':
      filteredTasks = tasks.filter(t => t.isDone);
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
  const setIsDone = useCallback((taskId: string, value: boolean) => props.setIsDone(taskId, value, todoId), [todoId]);
  const addTask = useCallback((text) => props.addTask(todoId, text), [todoId]);
  const changeTaskLabel = useCallback(props.changeTaskLabel, []);
  const removeTask = useCallback(props.removeTask, []);

  const mappedTasks = filteredTasks.map(task => <Task
          todoId={todoId}
          task={task}
          changeTaskLabel={changeTaskLabel}
          removeTask={removeTask}
          setIsDone={setIsDone}
          key={task.taskId}
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
        {/*<div className='todo_title'>{ label }</div>*/}
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