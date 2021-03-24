import React from 'react';
import { EditableSpan } from './EditableSpan';
import { Meta } from '@storybook/react/types-6-0';
// also exported from '@storybook/react' if you can deal with breaking changes in 6.1

export default {
  title: 'TodoList/EditableSpan',
  component: EditableSpan,
  argTypes: {
    backgroundColor: { control: 'color' }
  }
} as Meta;


export const Default = () => {
  return <EditableSpan
      initialText={ 'Initial text' }
      callback={ () => {} }
  />;
};

