import React, {useState} from 'react';
import './TodoList.css';

export type TaskType = {
  id: number,
  label: string,
  isDone: boolean
}

export type TodoListPropsType = {
  id: number,
  label: string,
  date: string,
  tasks: Array<TaskType>
}

export type FilterValuesType = 'all' | 'active' | 'completed';

const TodoList = (props: TodoListPropsType) => {

  const [tasks, setTasks] = useState<Array<TaskType>>(props.tasks);
  const [filter, setFilter] = useState<FilterValuesType>('all');

  const changeFilter = (filter: FilterValuesType) => {
    setFilter(filter);
    console.log(filter);
  };

  const removeTask = (taskId: number): void => {
    setTasks(tasks.filter(item => item.id !== taskId));
  };

  let tasksForTodoList;

  switch (filter) {
    case 'active':
      tasksForTodoList = tasks.filter(task => !task.isDone);
      break;
    case 'completed':
      tasksForTodoList = tasks.filter(tasks => tasks.isDone);
      break;
    case 'all':
      tasksForTodoList = tasks;
      break;
    default:
      tasksForTodoList = tasks;
      break;
  }

  const mappedTasks = tasksForTodoList.map(task => {
    return (
        <li key={task.id}>
          <button onClick={() => removeTask(task.id)}>
            del
          </button>
          <input
              type="checkbox"
              readOnly={true}
              checked={task.isDone}/>
          <span>{task.label}</span>
        </li>
    );
  });

  return (
      <div className='todo'>
        <h3>{props.label}</h3>
        <div>
          <input
              type='date'
              readOnly={true}
              value={props.date}/>
          <button className='btn'>+</button>
        </div>
        <ul>
          {mappedTasks}
        </ul>
        <div>
          <button
              className={`btn ${filter==='all'?'active':''}`}
              onClick={() => changeFilter('all')}>All
          </button>
          <button
              className={`btn ${filter==='active'?'active':''}`}
              onClick={() => changeFilter('active')}>Active
          </button>
          <button
              className={`btn ${filter==='completed'?'active':''}`}
              onClick={() => changeFilter('completed')}>Completed
          </button>
        </div>
      </div>
  );
};

export default TodoList;