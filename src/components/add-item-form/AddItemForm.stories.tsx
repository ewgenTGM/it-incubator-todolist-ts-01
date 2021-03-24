import React from 'react';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1
import { Story, Meta } from '@storybook/react/types-6-0';

import { AddItemForm, AddItemFormPropsType } from './AddItemForm';
import { action } from '@storybook/addon-actions';

export default {
  title: 'TodoList/AddItemForm',
  component: AddItemForm
} as Meta;

const Template: Story<AddItemFormPropsType> = ( args ) => <AddItemForm { ...args } />;

export const DefaultAddItem = Template.bind( {} );
DefaultAddItem.args = {
  onSubmit: action( 'You are added item!' )
};

export const CustomAddItem = Template.bind( {} );
CustomAddItem.args = {
  onSubmit: action( 'You are added item!' ),
  inputPlaceholder: 'Input new item title',
  buttonLabel: 'Add new item'
};