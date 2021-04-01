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
    const fetchData = async () => {
      const result = await todoApi.authMe();
      setState( result.data );
    };
    fetchData();
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

const summ = ( a: number = 3, b: number ) => a + b;
summ(undefined,2)


export const CreateTodolist = () => {
  const [ state, setState ] = useState<any>( null );
  useEffect( () => {
    mySuperAxios.post( 'todo-lists', {
      title: 'JavaScript'
    } ).then( res => setState( res.data ) );
  }, [] );

  return <div>
    <pre>{ JSON.stringify( state, null, 2 ) }</pre>
  </div>;
};

export const DeleteTodolist = () => {
  const [ state, setState ] = useState<any>( null );
  useEffect( () => {
  }, [] );

  return <div> { JSON.stringify( state ) }</div>;
};

export const UpdateTodolistTitle = () => {
  const [ state, setState ] = useState<any>( null );
  useEffect( () => {
  }, [] );

  return <div> { JSON.stringify( state ) }</div>;
};
