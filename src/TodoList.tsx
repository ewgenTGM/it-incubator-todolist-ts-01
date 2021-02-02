import React, {ChangeEvent, useState} from 'react';
import './TodoList.css';

export type TaskType = {
  id: string
  label: string
  isDone: boolean
}

export type TodoListPropsType = {
  id: string
  label: string
  date: string
  tasks: Array<TaskType>
  currentFilter: FilterValuesType
  addTask: (text: string, todoListId: string) => void
  removeTask: (id: string, todoListId: string) => void
  setFilter: (filter: FilterValuesType, todoListId: string) => void
  setIsDone: (id: string, value: boolean, todoListId: string) => void
  removeTodoList: (todoListId: string) => void
}

export type FilterValuesType = 'all' | 'active' | 'completed';

const TodoList = (props: TodoListPropsType) => {
  const [newTaskText, setNewTaskText] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const changeFilter = (filter: FilterValuesType) => {
    props.setFilter(filter, props.id);
  };

  const mappedTasks = props.tasks.map(task => {
    const setIsDone = (event: ChangeEvent<HTMLInputElement>) => props.setIsDone(task.id, event.currentTarget.checked, props.id);
    return (
        <li
            key={task.id}
            className={task.isDone ? 'done' : ''}>
          <button onClick={() => props.removeTask(task.id, props.id)}>
            X
          </button>
          <input
              type="checkbox"
              readOnly={true}
              checked={task.isDone}
              onChange={setIsDone}/>
          <span>{task.label}</span>
        </li>
    );
  });

  const addTask = () => {
    if (newTaskText.trim()) {
      props.addTask(newTaskText, props.id);
      setNewTaskText('');
      setError(null);
    } else {
      setError('Empty task title...');
      setNewTaskText('');
    }
  };

  return (
      <div className='todo'>
        <button
            className='delete_btn'
            onClick={() => props.removeTodoList(props.id)}>X
        </button>
        <div className='add_task_block'>
          <div className='todo_title'>{props.label}</div>
          <input
              className='date_input'
              type='date'
              readOnly={true}
              value={props.date}/>
          <input
              type="text"
              className='task_input'
              placeholder='Input task'
              value={newTaskText}
              onChange={e => {
                setNewTaskText(e.currentTarget.value);
                setError(null);
              }}
              onKeyPress={e => {
                if (e.key === 'Enter')
                  addTask();
              }}
              onBlur={() => setError(null)}/>
          <button
              className='add_task_btn btn'
              onClick={addTask}>
            Add task
          </button>
          <div>
            {error && <span className='error'>{error}</span>}
          </div>
        </div>
        <fieldset>
          <legend>Set filter</legend>
          <div className={'button_block'}>
            <button
                className={`btn ${props.currentFilter === 'all' && 'active'}`}
                onClick={() => changeFilter('all')}>
              All
            </button>
            <button
                className={`btn ${props.currentFilter === 'active' && 'active'}`}
                onClick={() => changeFilter('active')}>
              Active
            </button>
            <button
                className={`btn ${props.currentFilter === 'completed' && 'active'}`}
                onClick={() => changeFilter('completed')}>
              Completed
            </button>
          </div>
        </fieldset>
        <ul>
          {mappedTasks.length !== 0 ? mappedTasks : <div>No tasks</div>}
        </ul>
      </div>
  );
};

export default TodoList;