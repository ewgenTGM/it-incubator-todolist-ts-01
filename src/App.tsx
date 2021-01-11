import React from 'react';
import './App.css';
import TodoList, {TodoListPropsType} from './TodoList';

let dateNow: Date = new Date(Date.now());
let dateNowString: string = `${dateNow.getFullYear()}-${dateNow.getMonth() < 9 ? '0' + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1}-${dateNow.getDate() < 10 ? ('0' + dateNow.getDate()) : dateNow.getDate()}`;

let todo: TodoListPropsType = {
  id: 0,
  label: 'Выучить JS',
  date: dateNowString,
  tasks: [
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
    },
    {
      id: 4,
      label: 'Можно по пиву.',
      isDone: true
    }
  ]
};


const App = () => {
  return <div className='appContainer'>
    <TodoList
        {...todo}
    />
  </div>;
};

export default App;