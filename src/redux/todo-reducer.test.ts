import {v1} from 'uuid';
import {AddTodo, RemoveTodo, SetFilter, todoReducer, TodoStateType, TodoType} from './todo-reducer';

let state: TodoStateType = [];

const todoId1: string = v1();
const todoId2: string = v1();

beforeEach(() => {
    state = [
        {id: todoId1, title: 'Todolist_1 title', filter: 'all', order: 1, addedDate: ''},
        {id: todoId2, title: 'Todolist_2 title', filter: 'all', order: 1, addedDate: ''}
    ];
});

test('Add todolist', () => {
    const newTodoTitle = 'TEST TODO LIST TITLE';
    const newTodoId = v1();
    const newTodo: TodoType = {
        id: newTodoId,
        title: newTodoTitle,
        filter: 'all',
        order: 2,
        addedDate: ''
    };
    const newState = todoReducer(state, AddTodo(newTodo));
    expect(state).not.toBe(newState);
    expect(state).not.toBe(newState);
    expect(newState.length).toBe(state.length + 1);
    expect(newState.find(todo=>todo.id===newTodoId)).toEqual(newTodo);
});

test('Remove todolist', () => {
    const newState = todoReducer(state, RemoveTodo(todoId1));
    expect(state).not.toBe(newState);
    expect(state).not.toBe(newState);
    expect(newState.length).toBe(state.length - 1);
    expect(newState.find(todo => todo.id === todoId1)).toBeUndefined();
    expect(state.find(todo => todo.id === todoId1)).not.toBeUndefined();
});

test('Set "active" filter', () => {
    const newState = todoReducer(state, SetFilter(todoId1, 'active'));
    expect(state).not.toBe(newState);
    expect(state).not.toBe(newState);
    expect(newState.length).toBe(state.length);
    expect(newState.find(todo => todo.id === todoId1)?.filter === 'active').toBeTruthy();
    expect(state.find(todo => todo.id === todoId2)?.filter === 'all').toBeTruthy();
});
