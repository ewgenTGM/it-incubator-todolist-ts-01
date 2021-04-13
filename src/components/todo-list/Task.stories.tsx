import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import {Story, Meta} from '@storybook/react/types-6-0';
import {action} from '@storybook/addon-actions';
import {Task, TaskPropsType} from './Task';

export default {
    title: 'TodoList/Task',
    component: Task
} as Meta;

const defaultArgs = {
    removeTask: action('You are remove task'),
    changeTaskLabel: action('You are change task label'),
    setIsDone: action('You are set is done task')
};

const Template: Story<TaskPropsType> = (args) => <Task {...args} />;

export const ActiveTask = Template.bind({});
ActiveTask.args = {
    ...defaultArgs,
    task: {
        id: 'abc',
        title: 'Learn React',
        status: 1,
        addedDate: '',
        deadline: '',
        description: '',
        order: 1,
        startDate: '',
        priority: 1,
        todoListId: ''
    }
};

export const CompletedTask = Template.bind({});
CompletedTask.args = {
    ...defaultArgs,
    task: {
        id: 'bcd',
        title: 'Learn JS',
        status: 1,
        addedDate: '',
        deadline: '',
        description: '',
        order: 1,
        startDate: '',
        priority: 1,
        todoListId: ''
    }
};