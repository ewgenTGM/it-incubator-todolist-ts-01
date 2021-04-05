import axios from 'axios';

const mySuperAxios = axios.create( {
  baseURL: 'https://social-network.samuraijs.com/api/1.1',
  withCredentials: true,
  headers: {
    'API-KEY': 'a3f1a737-1827-41ef-9c53-49394bbbe1b8'
  }
} );

type AuthMeResponseType = {
  data: {
    id: number,
    login: string,
    email: string
  }
  messages: Array<string>,
  fieldsErrors: Array<string>,
  resultCode: number
}

type GetTodoListResponseType = {
  id: string
  title: string
  addedDate: string
  order: number
}


export const todoApi = {
  authMe: () => mySuperAxios.get<AuthMeResponseType>( 'auth/me' ).then( res => res.data ),
  getTodoLists: () => mySuperAxios.get<Array<GetTodoListResponseType>>( 'todo-lists' ).then( res => res.data ),
  createTodoList: ( title: string ) => mySuperAxios.post( 'todo-lists', {
    title: title
  } ).then( res => res.data ),
  updateTodoListTitle: ( todolistId: string, title: string ) => mySuperAxios.put( `todo-lists/${ todolistId }`, {
    title: title
  } ).then( res => res.data ),
  deleteTodolist: ( todolistId: string ) => mySuperAxios.delete( `todo-lists/${ todolistId }` ).then( res => res.data ),
  getTasks: ( todolistId: string ) =>
      mySuperAxios.get( `todo-lists/${ todolistId }/tasks` ).then( res => res.data ),
  addTask: ( todolistId: string, title: string ) =>
      mySuperAxios.post( `todo-lists/${ todolistId }/tasks`, { title } ).then( res => res.data ),
  updateTaskTitle: ( todolistId: string, taskId: string, title: string ) =>
      mySuperAxios.put( `todo-lists/${ todolistId }/tasks/${ taskId }`, { title } ).then( res => res.data ),
  deleteTask: ( todolistId: string, taskId: string ) =>
      mySuperAxios.delete( `todo-lists/${ todolistId }/tasks/${ taskId }` ).then( res => res.data )
};