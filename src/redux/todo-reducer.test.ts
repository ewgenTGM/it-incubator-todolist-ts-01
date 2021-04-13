import {v1} from 'uuid';
import {AddTodo, RemoveTodo, SetFilter, todoReducer, TodoStateType} from './todo-reducer';

let state: TodoStateType = [];

const todoId1: string = v1();
const todoId2: string = v1();

beforeEach(() => {
    state = [
        {todoId: todoId1, title: 'Todolist_1 title', filter: 'all'},
        {todoId: todoId2, title: 'Todolist_2 title', filter: 'all'}
    ];
});

test('Add todolist', () => {
    const newTodoTitle = 'TEST TODO LIST TITLE';
    const newTodoId = v1();
    const newState = todoReducer(state, AddTodo(newTodoId, newTodoTitle));
    expect(state).not.toBe(newState);
    expect(state).not.toBe(newState);
    expect(newState.length).toBe(state.length + 1);
    expect(newState[0].title).toBe(newTodoTitle);
    expect(newState[0].todoId).toBe(newTodoId);
});

test('Remove todolist', () => {
    const newState = todoReducer(state, RemoveTodo(todoId1));
    expect(state).not.toBe(newState);
    expect(state).not.toBe(newState);
    expect(newState.length).toBe(state.length - 1);
    expect(newState.find(todo => todo.todoId === todoId1)).toBeUndefined();
    expect(state.find(todo => todo.todoId === todoId1)).not.toBeUndefined();
});

test('Set "active" filter', () => {
    const newState = todoReducer(state, SetFilter(todoId1, 'active'));
    expect(state).not.toBe(newState);
    expect(state).not.toBe(newState);
    expect(newState.length).toBe(state.length);
    expect(newState.find(todo => todo.todoId === todoId1)?.filter === 'active').toBeTruthy();
    expect(state.find(todo => todo.todoId === todoId2)?.filter === 'all').toBeTruthy();
});
