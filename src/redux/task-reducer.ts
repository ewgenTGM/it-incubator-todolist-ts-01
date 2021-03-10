const ADD_TASK = 'ADD_TASK';
const ADD_TODO = 'ADD_TODO';
const REMOVE_TODO = 'REMOVE_TODO';
const REMOVE_TASK = 'REMOVE_TASK';
const SET_IS_DONE = 'SET_IS_DONE';
const CHANGE_TITLE = 'CHANGE_TITLE';

export type TaskType = {
  taskId: string
  title: string
  isDone: boolean
}

export type TaskStateType = {
  [key: string]: Array<TaskType>
}

type RemoveTodoActionType = {
  type: typeof REMOVE_TODO
  payload: {
    todoId: string
  }
}

export const removeTodo = ( todoId: string ): RemoveTodoActionType => ( {
  type: REMOVE_TODO,
  payload: {
    todoId
  }
} );

type AddTodoActionType = {
  type: typeof ADD_TODO
  payload: {
    title: string
    todoId: string
  }
}

export const AddTodo = ( title: string, todoId: string ): AddTodoActionType => ( {
  type: ADD_TODO,
  payload: {
    todoId, title
  }
} );


type AddTaskActionType = {
  type: typeof ADD_TASK,
  payload: {
    todoId: string,
    taskId: string,
    title: string,
    isDone: boolean
  }
}

export const AddTask = ( todoId: string, taskId: string, title: string, isDone: boolean = false ): AddTaskActionType => ( {
  type: ADD_TASK,
  payload: {
    todoId,
    taskId,
    title,
    isDone
  }
} );

type RemoveTaskActionType = {
  type: typeof REMOVE_TASK,
  payload: {
    todoId: string
    taskId: string
  }
}

export const RemoveTask = ( todoId: string, taskId: string ): RemoveTaskActionType => ( {
  type: REMOVE_TASK,
  payload: {
    todoId,
    taskId
  }
} );

type SetIsDoneActionType = {
  type: typeof SET_IS_DONE,
  payload: {
    todoId: string,
    taskId: string,
    isDone: boolean
  }
}

export const SetIsDone = ( todoId: string, taskId: string, isDone: boolean ): SetIsDoneActionType => ( {
  type: SET_IS_DONE,
  payload: {
    todoId,
    taskId,
    isDone
  }
} );

type ChangeTitleActionType = {
  type: typeof CHANGE_TITLE,
  payload: {
    todoId: string,
    taskId: string,
    title: string
  }
}

export const ChangeTaskTitle = ( todoId: string, taskId: string, title: string ): ChangeTitleActionType => ( {
  type: CHANGE_TITLE,
  payload: {
    todoId,
    taskId,
    title
  }
} );

type TaskReducerActionType =
    AddTodoActionType
    | AddTaskActionType
    | RemoveTaskActionType
    | SetIsDoneActionType
    | ChangeTitleActionType
    | RemoveTodoActionType;

export const taskReducer = ( state: TaskStateType, action: TaskReducerActionType ): TaskStateType => {
  switch ( action.type ) {
    case ADD_TODO: {
      return { ...state, [action.payload.todoId]: [] };
    }
    case REMOVE_TODO: {
      const newState = {...state}
      delete newState[action.payload.todoId];
      return { ...newState };
    }
    case ADD_TASK: {
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
    case REMOVE_TASK: {
      return {
        ...state,
        [action.payload.todoId]: state[action.payload.todoId].filter( task => task.taskId !== action.payload.taskId )
      };
    }
      // case SET_IS_DONE: {
      //   const tasks = state[action.payload.todoId].map( task => ( { ...task } ) );
      //   const task = tasks.find( t => t.taskId === action.payload.taskId );
      //   if ( task ) {
      //     task.isDone = action.payload.isDone;
      //     return { ...state, [action.payload.todoId]: tasks };
      //   }
      //   return state;
      // }
      // case CHANGE_TITLE: {
      //   const tasks = state[action.payload.todoId].map( task => ( { ...task } ) );
      //   const task = tasks.find( t => t.taskId === action.payload.taskId );
      //   if ( task ) {
      //     task.title = action.payload.title;
      //     return { ...state, [action.payload.todoId]: tasks };
      //   }
      //   return state;
      // }
    case SET_IS_DONE: {
      const stateCopy = { ...state };
      const task = stateCopy[action.payload.todoId].find( t => t.taskId === action.payload.taskId );
      if ( task ) {
        task.isDone = action.payload.isDone;
        return stateCopy;
      }
      return state;
    }
    case CHANGE_TITLE: {
      const stateCopy = { ...state };
      const task = stateCopy[action.payload.todoId].find( t => t.taskId === action.payload.taskId );
      if ( task ) {
        task.title = action.payload.title;
        return stateCopy;
      }
      return state;
    }
    default: {
      return state;
    }
  }
};