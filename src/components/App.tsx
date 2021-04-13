import React, {useCallback, useEffect} from 'react';
import './App.css';
import {AddItemForm} from './add-item-form/AddItemForm';
import {AppBar, Box, Button, Container, IconButton, Toolbar, Typography} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import {
    AddTodoTC,
    ChangeTodoTitleTC,
    RemoveTodoTC,
    SetFilter,
    SetTodosFromApiTC,
    TodoStateType
} from '../redux/todo-reducer';
import {
    AddTask,
    ChangeTaskTitle,
    SetIsDone,
    TaskStateType
} from '../redux/task-reducer';
import {useDispatch, useSelector} from 'react-redux';
import {RootStateType} from '../redux/store';
import {FilterValuesType, TodoList} from './todo-list/TodoList';

export const App = React.memo(() => {

    console.log('Отрисовка App');

    const dispatch = useDispatch();

    const todos = useSelector<RootStateType, TodoStateType>(state => state.todos);
    const tasks = useSelector<RootStateType, TaskStateType>(state => state.tasks);

    useEffect(() => {
        dispatch(SetTodosFromApiTC());
    }, []);

    const setFilter = useCallback((filter: FilterValuesType, todoId: string) => {
        dispatch(SetFilter(todoId, filter));
    }, []);

    const removeTodoList = useCallback((todoId: string) => {
        dispatch(RemoveTodoTC(todoId));
        // dispatch(RemoveTodoTaskArray(todoId));
    }, []);

    const addTodoList = useCallback((title: string) => {
        dispatch(AddTodoTC(title));
        //dispatch(AddTodoTaskArray(newTodoId, title));
    }, []);

    const changeTodoTitle = useCallback((id: string, title: string) => {
        dispatch(ChangeTodoTitleTC(id, title));
    }, []);

    // const removeTask = useCallback((todoId: string, taskId: string) => {
    //     dispatch(RemoveTask(todoId, taskId));
    // }, []);

    // const addTask = useCallback((todoId: string, newTaskText: string) => {
    //     if (newTaskText.trim() === '') {
    //         return;
    //     }
    //     dispatch(AddTask(todoId, v1(), newTaskText));
    // }, []);

    // const setIsDone = useCallback((taskId: string, value: boolean, todoId: string) => {
    //     dispatch(SetIsDone(todoId, taskId, value));
    // }, []);

    // const changeTaskTitle = useCallback((taskId: string, value: string, todoId: string) => {
    //     dispatch(ChangeTaskTitle(todoId, taskId, value));
    // }, []);

    const mappedTodoLists = todos.map(todoList => {
        return (
            <TodoList
                key={todoList.id}
                todoId={todoList.id}
                label={todoList.title}
                tasks={tasks[todoList.id]}
                // addTask={addTask}
                // removeTask={removeTask}
                setFilter={setFilter}
                // currentFilter={todoList.filter}
                // setIsDone={setIsDone}
                removeTodoList={removeTodoList}
                // changeTaskLabel={changeTaskTitle}
                changeTodoTitle={changeTodoTitle}
                addTask={() => {
                }}
                removeTask={() => {
                }}
                currentFilter={todoList.filter}
                setIsDone={() => {
                }}
                changeTaskLabel={() => {
                }}
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