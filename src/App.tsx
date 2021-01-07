import React from 'react';
import TodoList, {TaskType, TodoListPropsType} from './TodoList';
import './App.css';

const tasks: Array<TaskType> = [
  {
    id: 1,
    label: 'Открыть сайт LearnJS.ru',
    isDone: true
  },
  {
    id: 2,
    label: 'Пройти весь курс.',
    isDone: false
  },
  {
    id: 3,
    label: 'Ты прекрасен.',
    isDone: false
  }
];

let dateNow: Date = new Date(Date.now());
let dateNowString: string = `${dateNow.getFullYear()}-${dateNow.getMonth() < 9 ? '0' + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1}-${dateNow.getDate() < 10 ? ('0' + dateNow.getDate()) : dateNow.getDate()}`;

const todo: TodoListPropsType = {
  label: 'Выучить JS',
  date: dateNowString,
  tasks: tasks
};

const App = () =>
    (
        <div className="App">
          <TodoList
              label={todo.label}
              tasks={todo.tasks}
              date={todo.date}/>
        </div>
    );

export default App;