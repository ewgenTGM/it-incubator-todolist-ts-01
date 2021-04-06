import React, {useCallback, useEffect} from 'react';
import './App.css';
import {v1} from 'uuid';
import {AddItemForm} from './add-item-form/AddItemForm';
import {FilterValuesType} from './todo-list/TodoList';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {AddTodo, ChangeTodoTitle, RemoveTodo, SetFilter, TodoStateType} from '../redux/todo-reducer';
import {
    AddTask,
    AddTodoTaskArray,
    ChangeTaskTitle,
    RemoveTask, RemoveTodoTaskArray,
    SetIsDone,
    TaskStateType
} from '../redux/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {TodoListWithAllTasks} from './todo-list/TodoListWithAllTasks';
import {SetTodosThunk, TodoStateType_api} from '../redux/api-todo-reducer';
import {SetTasksFromApiThunk, TaskStateType_api} from '../redux/api-task-reducer';
import {TaskDomainType} from '../utils/api';

export const AppWithRedux = React.memo(() => {

    console.log('Отрисовка AppWithRedux');

    const dispatch = useDispatch();

    const todos_from_api = useSelector<RootStateType, TodoStateType_api>(state => state.todoApi);
    const tasks_from_api = useSelector<RootStateType, TaskStateType_api>(state => state.taskApi);
    const todos = useSelector<RootStateType, TodoStateType>(state => state.todos);
    const tasks = useSelector<RootStateType, TaskStateType>(state => state.tasks);

    useEffect(() => {
        dispatch(SetTodosThunk());
    }, []);

    useEffect(() => {
        todos_from_api.forEach(todo => dispatch(SetTasksFromApiThunk(todo.id)));
    }, [todos_from_api]);

    const setFilter = useCallback((filter: FilterValuesType, todoId: string) => {
        dispatch(SetFilter(todoId, filter));
    }, []);

    const removeTodoList = useCallback((todoId: string) => {
        dispatch(RemoveTodo(todoId));
        dispatch(RemoveTodoTaskArray(todoId));
    }, []);

    const addTodoList = useCallback((title: string) => {
        const newTodoId = v1();
        dispatch(AddTodo(newTodoId, title));
        dispatch(AddTodoTaskArray(newTodoId, title));
    }, []);

    const changeTodoTitle = useCallback((todoId: string, title: string) => {
        dispatch(ChangeTodoTitle(todoId, title));
    }, []);

    const removeTask = useCallback((todoId: string, taskId: string) => {
        dispatch(RemoveTask(todoId, taskId));
    }, []);

    const addTask = useCallback((todoId: string, newTaskText: string) => {
        if (newTaskText.trim() === '') {
            return;
        }
        dispatch(AddTask(todoId, v1(), newTaskText));
    }, []);

    const setIsDone = useCallback((taskId: string, value: boolean, todoId: string) => {
        dispatch(SetIsDone(todoId, taskId, value));
    }, []);

    const changeTaskTitle = useCallback((taskId: string, value: string, todoId: string) => {
        dispatch(ChangeTaskTitle(todoId, taskId, value));
    }, []);

    const mappedTodoLists = todos.map(todoList => {
        return (
            <TodoListWithAllTasks
                key={todoList.todoId}
                todoId={todoList.todoId}
                label={todoList.title}
                tasks={tasks[todoList.todoId]}
                addTask={addTask}
                removeTask={removeTask}
                setFilter={setFilter}
                currentFilter={todoList.filter}
                setIsDone={setIsDone}
                removeTodoList={removeTodoList}
                changeTaskLabel={changeTaskTitle}
                changeTodoTitle={changeTodoTitle}
            /> );
    });

    return (
        <>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        color="inherit">
                        <MenuIcon/>
                    </IconButton>
                    <Typography
                        style={{flexGrow: 1}}
                        variant="h6">
                        Todo lists
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container style={{marginTop: '25px'}}>
                <Box
                    display={'flex'}
                    flexDirection={'column'}
                    justifyContent={'center'}
                    alignItems={'center'}>
                    <AddItemForm
                        defaultWidth={'600px'}
                        onSubmit={addTodoList}
                        buttonLabel={'Add todo'}
                        inputPlaceholder={'Add todo'}/>
                    <Box
                        display={'flex'}
                        justifyContent={'flex-start'}
                        alignItems={'flex-start'}
                        flexWrap={'wrap'}>
                        {mappedTodoLists}
                    </Box>
                </Box>
            </Container>
        </>
    );
});