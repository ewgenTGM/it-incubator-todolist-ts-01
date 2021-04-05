import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { todoApi } from '../utils/api';

export default {
  title: 'API'
};

const mySuperAxios = axios.create( {
  baseURL: 'https://social-network.samuraijs.com/api/1.0',
  withCredentials: true,
  headers: {
    'API-KEY': 'a3f1a737-1827-41ef-9c53-49394bbbe1b8'
  }
} );

export const AuthMe = () => {
  const [ state, setState ] = useState<any>( null );


  useEffect( () => {
    todoApi.authMe().then( res => setState( res ) );
  }, [] );
  return <div>
    <pre>{ JSON.stringify( state, null, 2 ) }</pre>
  </div>;
};


export const GetTodoLists = () => {
  const [ state, setState ] = useState<any>( null );
  useEffect( () => {
    todoApi.getTodoLists().then( setState );
  }, [] );

  return <div>
    <pre>{ JSON.stringify( state, null, 2 ) }</pre>
  </div>;
};

export const CreateTodolist = () => {
  const [ state, setState ] = useState<any>( null );
  const [ title, setTitle ] = useState<string>( '' );
  const addTodoList = () => {
    if ( title.trim().length !== 0 ) {
      todoApi.createTodoList( title ).then( res => setState( res.data ) );
      setTitle( '' );
    }
  };

  return (
      <div>
        <label htmlFor={ 'title' }>New todo list title:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'title' }
            placeholder={ 'Type todo list title' }
            value={ title }
            onChange={ ( e ) => setTitle( e.currentTarget.value ) }/><br/>
        <button onClick={ addTodoList }>Add todo list</button>
        <br/>
        <pre>{ JSON.stringify( state, null, 2 ) }</pre>
      </div> );
};

export const DeleteTodolist = () => {
  const [ state, setState ] = useState<any>( null );
  const [ todoId, setTodoId ] = useState<string>( '' );
  const deleteTodoList = () => {
    if ( todoId.trim().length !== 0 ) {
      todoApi.deleteTodolist( todoId ).then( setState );
      setTodoId( '' );
    }
  };

  return (
      <div>
        <label htmlFor={ 'title' }>Todo list ID for delete:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'title' }
            placeholder={ 'Type todo list ID' }
            value={ todoId }
            onChange={ ( e ) => setTodoId( e.currentTarget.value ) }/><br/>
        <button onClick={ deleteTodoList }>Delete todo list</button>
        <br/>
        <pre>{ JSON.stringify( state, null, 2 ) }</pre>
      </div> );
};

export const UpdateTodoTitle = () => {
  const [ title, setTitle ] = useState<any>( null );
  const [ todoId, setTodoId ] = useState<string>( '' );
  const [ state, setState ] = useState<any>( null );
  const updateTitle = () => {
    if ( todoId.trim().length !== 0 ) {
      todoApi.updateTodoListTitle( todoId, title ).then( setState );
      setTodoId( '' );
      setTitle( '' );
    }
  };

  return (
      <div>
        <label htmlFor={ 'todo_id' }>Todo list Id for update:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'todo_id' }
            placeholder={ 'Type todo list Id' }
            value={ todoId }
            onChange={ ( e ) => setTodoId( e.currentTarget.value ) }/><br/>
        <label htmlFor={ 'title' }>New title:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'title' }
            placeholder={ 'Type new title' }
            value={ title }
            onChange={ ( e ) => setTitle( e.currentTarget.value ) }/><br/>
        <button onClick={ updateTitle }>Update todo</button>
        <br/>
        <pre>{ JSON.stringify( state, null, 2 ) }</pre>
      </div> );
};

export const GetTasks = () => {
  const [ state, setState ] = useState<any>( null );
  const [ todoId, setTodoId ] = useState<string>( '' );

  const getTasks = () => {
    if ( todoId.trim().length !== 0 ) {
      todoApi.getTasks( todoId ).then( setState );
      setTodoId( '' );
    }
  };

  return (
      <div>
        <label htmlFor={ 'todo_id' }>Todo id:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'todo_id' }
            placeholder={ 'Type todo list id' }
            value={ todoId }
            onChange={ ( e ) => setTodoId( e.currentTarget.value ) }/><br/>
        <button onClick={ getTasks }>Get tasks</button>
        <br/>
        <pre>{ JSON.stringify( state, null, 2 ) }</pre>
      </div>
  );
};

export const AddTask = () => {
  const [ state, setState ] = useState<any>( null );
  const [ todoId, setTodoId ] = useState<string>( '' );
  const [ title, setTitle ] = useState<string>( '' );

  const addTask = () => {
    if ( todoId.trim().length !== 0 && title.trim().length !== 0 ) {
      todoApi.addTask( todoId, title ).then( setState );
      setTitle( '' );
    }
  };

  return (
      <div>
        <label htmlFor={ 'todo_id' }>Todo id:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'todo_id' }
            placeholder={ 'Type todo list id' }
            value={ todoId }
            onChange={ ( e ) => setTodoId( e.currentTarget.value ) }/><br/>
        <label htmlFor={ 'title' }>Task title:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'title' }
            placeholder={ 'Type task title' }
            value={ title }
            onChange={ ( e ) => setTitle( e.currentTarget.value ) }/><br/>
        <button onClick={ addTask }>Add tasks</button>
        <br/>
        <pre>{ JSON.stringify( state, null, 2 ) }</pre>
      </div>
  );
};

export const DeleteTask = () => {
  const [ state, setState ] = useState<any>( null );
  const [ todoId, setTodoId ] = useState<string>( '' );
  const [ taskId, setTaskId ] = useState<string>( '' );

  const deleteTask = () => {
    if ( taskId.trim().length !== 0 && todoId.trim().length !== 0 ) {
      todoApi.deleteTask( todoId, taskId ).then( setState );
      setTaskId( '' );
    }
  };

  return (
      <div>
        <label htmlFor={ 'todo_id' }>Todo id:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'todo_id' }
            placeholder={ 'Type todo list id' }
            value={ todoId }
            onChange={ ( e ) => setTodoId( e.currentTarget.value ) }/><br/>
        <label htmlFor={ 'task_id' }>Task id for delete:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'task_id' }
            placeholder={ 'Type task id' }
            value={ taskId }
            onChange={ ( e ) => setTaskId( e.currentTarget.value ) }/><br/>
        <button onClick={ deleteTask }>Delete task</button>
        <br/>
        <pre>{ JSON.stringify( state, null, 2 ) }</pre>
      </div> );
};


export const UpdateTaskTitle = () => {
  const [ state, setState ] = useState<any>( null );
  const [ todoId, setTodoId ] = useState<string>( '' );
  const [ taskId, setTaskId ] = useState<string>( '' );
  const [ title, setTitle ] = useState<string>( '' );

  const updateTask = () => {
    if ( taskId.trim().length !== 0 && todoId.trim().length !== 0 && title.trim().length !== 0 ) {
      todoApi.updateTaskTitle( todoId, taskId, title ).then( setState );
      setTaskId( '' );
      setTodoId( '' );
      setTitle( '' );
    }
  };

  return (
      <div>
        <label htmlFor={ 'todo_id' }>Todo id:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'todo_id' }
            placeholder={ 'Type todo list id' }
            value={ todoId }
            onChange={ ( e ) => setTodoId( e.currentTarget.value ) }/><br/>
        <label htmlFor={ 'task_id' }>Task id for delete:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'task_id' }
            placeholder={ 'Type task id' }
            value={ taskId }
            onChange={ ( e ) => setTaskId( e.currentTarget.value ) }/><br/>
        <label htmlFor={ 'title' }>New title:</label><br/>
        <input
            style={ { width: '300px', margin: '10px 0' } }
            type="text"
            name={ 'title' }
            placeholder={ 'Type task title' }
            value={ title }
            onChange={ ( e ) => setTitle( e.currentTarget.value ) }/><br/>
        <button onClick={ updateTask }>Update task</button>
        <br/>
        <pre>{ JSON.stringify( state, null, 2 ) }</pre>
      </div>
  );
};
