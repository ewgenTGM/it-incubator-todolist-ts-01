import React, { ChangeEvent } from 'react';
import './TodoList.css';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';

export type TaskType = {
  id: string
  label: string
  isDone: boolean
}

export type TodoListPropsType = {
  id: string
  label: string
  tasks: Array<TaskType>
  currentFilter: FilterValuesType
  addTask: ( text: string, todoListId: string ) => void
  removeTask: ( id: string, todoListId: string ) => void
  setFilter: ( filter: FilterValuesType, todoListId: string ) => void
  setIsDone: ( id: string, value: boolean, todoListId: string ) => void
  changeTaskLabel: ( id: string, value: string, todoListId: string ) => void
  removeTodoList: ( todoListId: string ) => void
}

export type FilterValuesType = 'all' | 'active' | 'completed';

const TodoList = ( props: TodoListPropsType ) => {

  const addTask = ( text: string ) => {
    props.addTask( text, props.id );
  };
  const changeFilter = ( filter: FilterValuesType ) => {
    props.setFilter( filter, props.id );
  };


  const mappedTasks = props.tasks.map( task => {
    const setIsDone = ( event: ChangeEvent<HTMLInputElement> ) => props.setIsDone( task.id, event.currentTarget.checked, props.id );
    const changeTaskLabel = ( text: string ) => {
      props.changeTaskLabel( task.id, text, props.id );
    };
    return (
        <li
            key={ task.id }
            className={ task.isDone ? 'done' : '' }>
          <button onClick={ () => props.removeTask( task.id, props.id ) }>
            X
          </button>
          <input
              type="checkbox"
              readOnly={ true }
              checked={ task.isDone }
              onChange={ setIsDone }/>
          <EditableSpan initialText={ task.label } callback={changeTaskLabel}/>
        </li>
    );
  } );

  return (
      <div className='todo'>
        <button
            className='delete_btn'
            onClick={ () => props.removeTodoList( props.id ) }>X
        </button>
        <div className='add_task_block'>
          <div className='todo_title'>{ props.label }</div>
          <AddItemForm
              onSubmit={ addTask }
              buttonLabel={ 'Add task' }
              inputPlaceholder={ 'Input task' }/>
        </div>
        <fieldset>
          <legend>Set filter</legend>
          <div className={ 'button_block' }>
            <button
                className={ `btn ${ props.currentFilter === 'all' && 'active' }` }
                onClick={ () => changeFilter( 'all' ) }>
              All
            </button>
            <button
                className={ `btn ${ props.currentFilter === 'active' && 'active' }` }
                onClick={ () => changeFilter( 'active' ) }>
              Active
            </button>
            <button
                className={ `btn ${ props.currentFilter === 'completed' && 'active' }` }
                onClick={ () => changeFilter( 'completed' ) }>
              Completed
            </button>
          </div>
        </fieldset>
        <ul>
          { mappedTasks.length !== 0 ? mappedTasks : <div>No tasks</div> }
        </ul>
      </div>
  );
};

export default TodoList;