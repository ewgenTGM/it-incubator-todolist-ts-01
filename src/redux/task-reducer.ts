import { tasksInitialState } from './initialState';

export enum TASK_ACTION_TYPE {
  ADD_TASK = 'ADD_TASK',
  ADD_TODO_TASK_ARRAY = 'ADD_TODO_TASK_ARRAY',
  REMOVE_TODO_TASK_ARRAY = 'REMOVE_TODO_TASK_ARRAY',
  REMOVE_TASK = 'REMOVE_TASK',
  SET_IS_DONE = 'SET_IS_DONE',
  CHANGE_TITLE = 'CHANGE_TITLE'
}


export type TaskType = {
  taskId: string
  title: string
  isDone: boolean
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

type RemoveTodoTaskArrayActionType = {
  type: TASK_ACTION_TYPE.REMOVE_TODO_TASK_ARRAY
  payload: {
    todoId: string
  }
}

export const removeTodoTaskArray = ( todoId: string ): RemoveTodoTaskArrayActionType => ( {
  type: TASK_ACTION_TYPE.REMOVE_TODO_TASK_ARRAY,
  payload: {
    todoId
  }
} );

type AddTodoTaskArrayActionType = {
  type: TASK_ACTION_TYPE.ADD_TODO_TASK_ARRAY
  payload: {
    title: string
    todoId: string
  }
}

export const AddTodoTaskArray = ( title: string, todoId: string ): AddTodoTaskArrayActionType => ( {
  type: TASK_ACTION_TYPE.ADD_TODO_TASK_ARRAY,
  payload: {
    todoId, title
  }
} );


type AddTaskActionType = {
  type: TASK_ACTION_TYPE.ADD_TASK,
  payload: {
    todoId: string,
    taskId: string,
    title: string,
    isDone: boolean
  }
}

export const AddTask = ( todoId: string, taskId: string, title: string, isDone: boolean = false ): AddTaskActionType => ( {
  type: TASK_ACTION_TYPE.ADD_TASK,
  payload: {
    todoId,
    taskId,
    title,
    isDone
  }
} );

type RemoveTaskActionType = {
  type: TASK_ACTION_TYPE.REMOVE_TASK,
  payload: {
    todoId: string
    taskId: string
  }
}

export const RemoveTask = ( todoId: string, taskId: string ): RemoveTaskActionType => ( {
  type: TASK_ACTION_TYPE.REMOVE_TASK,
  payload: {
    todoId,
    taskId
  }
} );

type SetIsDoneActionType = {
  type: TASK_ACTION_TYPE.SET_IS_DONE,
  payload: {
    todoId: string,
    taskId: string,
    isDone: boolean
  }
}

export const SetIsDone = ( todoId: string, taskId: string, isDone: boolean ): SetIsDoneActionType => ( {
  type: TASK_ACTION_TYPE.SET_IS_DONE,
  payload: {
    todoId,
    taskId,
    isDone
  }
} );

type ChangeTitleActionType = {
  type: TASK_ACTION_TYPE.CHANGE_TITLE,
  payload: {
    todoId: string,
    taskId: string,
    title: string
  }
}

export const ChangeTaskTitle = ( todoId: string, taskId: string, title: string ): ChangeTitleActionType => ( {
  type: TASK_ACTION_TYPE.CHANGE_TITLE,
  payload: {
    todoId,
    taskId,
    title
  }
} );

type TaskReducerActionType =
    AddTodoTaskArrayActionType
    | AddTaskActionType
    | RemoveTaskActionType
    | SetIsDoneActionType
    | ChangeTitleActionType
    | RemoveTodoTaskArrayActionType;

export const taskReducer = ( state: TaskStateType = tasksInitialState, action: TaskReducerActionType ): TaskStateType => {
  switch ( action.type ) {
    case TASK_ACTION_TYPE.ADD_TODO_TASK_ARRAY: {
      return { ...state, [action.payload.todoId]: [] };
    }
    case TASK_ACTION_TYPE.REMOVE_TODO_TASK_ARRAY: {
      const newState = { ...state };
      delete newState[action.payload.todoId];
      return { ...newState };
    }
    case TASK_ACTION_TYPE.ADD_TASK: {
      const task: TaskType = {
        taskId: action.payload.taskId,
        title: action.payload.title,
        isDone: false
      };
      return {
        ...state,
        [action.payload.todoId]: [ task, ...state[action.payload.todoId] ]
      };
    }
    case TASK_ACTION_TYPE.REMOVE_TASK: {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].filter( task => task.taskId !== action.payload.taskId )
      };
    }
    case TASK_ACTION_TYPE.SET_IS_DONE: {
      const tasks = state[action.payload.todoId].map( task => ( { ...task } ) );
      const task = tasks.find( t => t.taskId === action.payload.taskId );
      if ( task ) {
        task.isDone = action.payload.isDone;
        return { ...state, [action.payload.todoId]: tasks };
      }
      return state;
    }
    case TASK_ACTION_TYPE.CHANGE_TITLE: {
      const tasks = state[action.payload.todoId].map( task => ( { ...task } ) );
      const task = tasks.find( t => t.taskId === action.payload.taskId );
      if ( task ) {
        task.title = action.payload.title;
        return { ...state, [action.payload.todoId]: tasks };
      }
      return state;
    }
      // case TASK_ACTION_TYPE.SET_IS_DONE: {
      //   const stateCopy = { ...state };
      //   const task = stateCopy[action.payload.todoId].find( t => t.taskId === action.payload.taskId );
      //   if ( task ) {
      //     task.isDone = action.payload.isDone;
      //     return stateCopy;
      //   }
      //   return state;
      // }
      // case TASK_ACTION_TYPE.CHANGE_TITLE: {
      //   const stateCopy = { ...state };
      //   const task = stateCopy[action.payload.todoId].find( t => t.taskId === action.payload.taskId );
      //   if ( task ) {
      //     task.title = action.payload.title;
      //     return stateCopy;
      //   }
      //   return state;
      // }
    default: {
      return state;
    }
  }
};