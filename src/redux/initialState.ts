import { v1 } from 'uuid';
import { TodoStateType } from './todo-reducer';
import { TaskStateType } from './task-reducer';

const todoId1 = v1();
const todoId2 = v1();

export const todosInitialState: TodoStateType = [
  { todoId: todoId1, title: 'Learn JavaScript', filter: 'all' },
  { todoId: todoId2, title: 'Learn React', filter: 'all' } ];


export const tasksInitialState: TaskStateType = {
  [todoId1]: [
    {
      taskId: v1(),
      title: 'Открыть сайт LearnJS.ru',
      isDone: true
    },
    {
      taskId: v1(),
      title: 'Пройти весь курс.',
      isDone: false
    },
    {
      taskId: v1(),
      title: 'Ты прекрасен.',
      isDone: false
    },
    {
      taskId: v1(),
      title: 'Можно по пиву.',
      isDone: true
    }
  ],
  [todoId2]: [
    {
      taskId: v1(),
      title: 'Открыть сайт React.ru',
      isDone: true
    },
    {
      taskId: v1(),
      title: 'Ничего не понять.',
      isDone: false
    },
    {
      taskId: v1(),
      title: 'Ты дно.',
      isDone: false
    },
    {
      taskId: v1(),
      title: 'Боль.',
      isDone: true
    }
  ]
};