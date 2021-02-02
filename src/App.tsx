import React, {useState} from 'react';
import './App.css';
import TodoList, {FilterValuesType, TaskType} from './TodoList';
import {v1} from 'uuid';

let dateNow: Date = new Date(Date.now());
let dateNowString: string = `${dateNow.getFullYear()}-${dateNow.getMonth() < 9 ? '0' + (dateNow.getMonth() + 1) : dateNow.getMonth() + 1}-${dateNow.getDate() < 10 ? ('0' + dateNow.getDate()) : dateNow.getDate()}`;

type TodoListType = {
  id: string
  title: string
  filter: FilterValuesType
}

type TaskStateType = {
  [key: string]: Array<TaskType>
}

const App = () => {
  const todoListId1 = v1();
  const todoListId2 = v1();

  const [todoLists, setTodoLists] = useState<Array<TodoListType>>([
    {id: todoListId1, title: 'Learn JavaScript', filter: 'all'},
    {id: todoListId2, title: 'Learn React', filter: 'all'}
  ]);

  const [tasks, setTasks] = useState<TaskStateType>({
    [todoListId1]: [
      {
        id: v1(),
        label: 'Открыть сайт LearnJS.ru',
        isDone: true
      },
      {
        id: v1(),
        label: 'Пройти весь курс.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Ты прекрасен.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Можно по пиву.',
        isDone: true
      }
    ],
    [todoListId2]: [
      {
        id: v1(),
        label: 'Открыть сайт React.ru',
        isDone: true
      },
      {
        id: v1(),
        label: 'Ничего не понять.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Ты дно.',
        isDone: false
      },
      {
        id: v1(),
        label: 'Боль.',
        isDone: true
      }
    ]
  });

  const removeTask = (taskId: string, todoListId: string) => {
    tasks[todoListId] = tasks[todoListId].filter(task => task.id !== taskId);
    setTasks({...tasks});
  };

  const addTask = (newTaskText: string, todoListId: string) => {
    if (newTaskText.trim() === '') {
      return;
    }
    const task: TaskType = {
      id: v1(),
      label: newTaskText,
      isDone: false
    };
    tasks[todoListId].unshift(task);
    setTasks({...tasks});
  };

  const setIsDone = (taskId: string, value: boolean, todoListId: string) => {
    const index = tasks[todoListId].findIndex(task => task.id === taskId);
    if (index !== -1) {
      tasks[todoListId][index].isDone = value;
      setTasks({...tasks});
    }
  };

  const setFilter = (filter: FilterValuesType, todoListId: string) => {
    const index = todoLists.findIndex(todoList => todoList.id === todoListId);
    if (index !== -1) {
      todoLists[index].filter = filter;
      setTodoLists([...todoLists]);
    }
  };

  const removeTodoList = (todoListId: string) => {
    setTodoLists(todoLists.filter(todoList => todoList.id !== todoListId));
    delete tasks[todoListId];
  };

  const mappedTodoLists = todoLists.map(todoList => {
    let tasksForTodoList: Array<TaskType>;

    switch (todoList.filter) {
      case 'active':
        tasksForTodoList = tasks[todoList.id].filter(task => !task.isDone);
        break;
      case 'completed':
        tasksForTodoList = tasks[todoList.id].filter(tasks => tasks.isDone);
        break;
      default:
        tasksForTodoList = tasks[todoList.id];
        break;
    }
    return (
        <TodoList
            key={todoList.id}
            id={todoList.id}
            label={todoList.title}
            date={dateNowString}
            tasks={tasksForTodoList}
            addTask={addTask}
            removeTask={removeTask}
            setFilter={setFilter}
            currentFilter={todoList.filter}
            setIsDone={setIsDone}
            removeTodoList={removeTodoList}
        />);
  });

  return <div className='appContainer'>
    {mappedTodoLists}
  </div>;
};

export default App;