import React from 'react';
import './TodoList.css';

export type TaskType = {
  id: number,
  label: string,
  isDone: boolean
}

export type TodoListPropsType = {
  label: string,
  date: string,
  tasks: Array<TaskType>,
}

const TodoList = (props: TodoListPropsType) => {
  let todos = props.tasks.map(task => {
    return (
        <li>
          <input
              type="checkbox"
              readOnly={true}
              checked={task.isDone}/>
          <span>{task.label}</span>
        </li>
    );
  });
  return (
      <div>
        <h3>{props.label}</h3>
        <div>
          <input
              type='date'
              readOnly={true}
              value={props.date}/>
          <button className='btn'>+</button>
        </div>
        <ul>
          {todos}
        </ul>
        <div>
          <button className='btn'>All</button>
          <button className='btn'>Active</button>
          <button className='btn'>Completed</button>
        </div>
      </div>
  );
};

export default TodoList;