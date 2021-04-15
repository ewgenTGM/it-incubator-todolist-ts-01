import {
    AddTask, ChangeTask, RemoveTask,
    taskReducer,
    TaskStateType
} from './task-reducer';
import {v1} from 'uuid';
import {TaskDomainType} from '../utils/api';
import {AddTodoActionType, RemoveTodoActionType, TODO_ACTION_TYPE, TodoType} from './todo-reducer';

const todoId_1 = v1();
const todoId_2 = v1();
let state: TaskStateType = {};

beforeEach(() => {
    state = {
        [todoId_1]: [
            {
                id: 'taskId1',
                title: 'Title of taskId1',
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: '',
                todoListId: todoId_1
            },
            {
                id: 'taskId2',
                title: 'Title of taskId2',
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: '',
                todoListId: todoId_1
            },
            {
                id: 'taskId3',
                title: 'Title of taskId3',
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: '',
                todoListId: todoId_1
            }
        ],
        [todoId_2]: [
            {
                id: 'taskId1',
                title: 'Title of taskId1',
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: '',
                todoListId: todoId_2
            },
            {
                id: 'taskId2',
                title: 'Title of taskId2',
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: '',
                todoListId: todoId_2
            },
            {
                id: 'taskId3',
                title: 'Title of taskId3',
                status: 1,
                addedDate: '',
                deadline: '',
                description: '',
                order: 0,
                priority: 1,
                startDate: '',
                todoListId: todoId_2
            }
        ]
    };
});

test('Add task', () => {
    const newTaskId = 'taskId4';
    const newTitle: string = 'Title of taskId4';
    const newTask: TaskDomainType = {
        id: newTaskId,
        title: newTitle,
        description: 'Description',
        todoListId: todoId_1,
        order: 2,
        status: 2,
        priority: 1,
        startDate: 'Start Date',
        deadline: 'Deadline',
        addedDate: 'Added Date'
    };
    const action = AddTask(newTask);
    const newState = taskReducer(state, action);
    expect(newState === state).toBeFalsy();
    expect(newState[todoId_1].find(task => task.id === 'taskId4')).not.toBeUndefined();
    expect(newState[todoId_1].find(task => task.id === 'taskId4')?.title).toBe(newTitle);
    expect(newState[todoId_1].length).toBe(state[todoId_1].length + 1);
});

test('Remove task', () => {
    const action = RemoveTask(todoId_2, 'taskId1');
    const newState = taskReducer(state, action);
    expect(newState === state).toBeFalsy();
    expect(newState[todoId_1] === state[todoId_1]).toBeTruthy();
    expect(newState[todoId_2] === state[todoId_2]).toBeFalsy();
    expect(newState[todoId_2].find(task => task.id === 'taskId1')).toBeUndefined();
    expect(newState[todoId_1].find(task => task.id === 'taskId1')).not.toBeUndefined();
});

test('Change task title', () => {
    const newTaskTitle = 'New task title';
    const changeModel: TaskDomainType = {
        id: 'taskId1',
        title: newTaskTitle,
        description: 'Description',
        todoListId: todoId_2,
        order: 2,
        status: 2,
        priority: 1,
        startDate: 'Start Date',
        deadline: 'Deadline',
        addedDate: 'Added Date'
    };
    const action = ChangeTask(changeModel);
    const newState = taskReducer(state, action);
    expect(newState[todoId_2].find(t => t.id === 'taskId1')?.title).toBe(newTaskTitle);
    expect(newState[todoId_1].find(t => t.id === 'taskId1')?.title).not.toBe(newTaskTitle);
});

test('Change task status', () => {
    const newTaskStatus = 1;
    const changeModel: TaskDomainType = {
        id: 'taskId1',
        title: 'Title of taskId1',
        description: 'Description',
        todoListId: todoId_2,
        order: 2,
        status: newTaskStatus,
        priority: 1,
        startDate: 'Start Date',
        deadline: 'Deadline',
        addedDate: 'Added Date'
    };
    const action = ChangeTask(changeModel);
    const newState = taskReducer(state, action);
    expect(newState[todoId_2].find(t => t.id === 'taskId1')?.status).toBe(newTaskStatus);
});

test('Add todo', () => {
    const newTodoId = v1();
    const newTodo: TodoType = {
        id: newTodoId,
        title: 'New todo title',
        order: 1,
        addedDate: '',
        filter: 'all'
    };
    const action: AddTodoActionType = {type: TODO_ACTION_TYPE.ADD_TODO, payload: {todo: newTodo}};
    const newState = taskReducer(state, action);
    expect(newState[newTodoId]).not.toBeUndefined();
    expect(Object.keys(newState).length).toBe(Object.keys(state).length + 1);
});

test('Remove todo', () => {
    const action: RemoveTodoActionType = {type: TODO_ACTION_TYPE.REMOVE_TODO, payload: {id: todoId_1}};
    const newState = taskReducer(state, action);
    expect(newState[todoId_1]).toBeUndefined();
    expect(Object.keys(newState).length).toBe(Object.keys(state).length - 1);
});
