import { v1 } from 'uuid';
import { TodoStateType } from './todo-reducer';
import { TaskStateType } from './task-reducer';

const todoListId1 = v1();
const todoListId2 = v1();

export const todosInitialState: TodoStateType = [
  { todoId: todoListId1, title: 'Learn JavaScript', filter: 'all' },
  { todoId: todoListId2, title: 'Learn React', filter: 'all' } ];


export const tasksInitialState: TaskStateType = {
  [todoListId1]: [
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
  [todoListId2]: [
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