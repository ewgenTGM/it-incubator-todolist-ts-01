import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';
import { action } from '@storybook/addon-actions';
import { Task, TaskPropsType } from './Task';

export default {
  title: 'TodoList/Task',
  component: Task
} as Meta;

const defaultArgs = {
  removeTask: action( 'You are remove task' ),
  changeTaskLabel: action( 'You are change task label' ),
  setIsDone: action( 'You are set is done task' )
};

const Template: Story<TaskPropsType> = ( args ) => <Task { ...args } />;

export const ActiveTask = Template.bind( {} );
ActiveTask.args = {
  ...defaultArgs,
  task: { taskId: 'abc', title: 'Learn React', isDone: false },
  todoId: 'cba'
};

export const CompletedTask = Template.bind( {} );
CompletedTask.args = {
  ...defaultArgs,
  task: { taskId: 'bcd', title: 'Learn JS', isDone: true },
  todoId: 'dcb'
};