import axios from 'axios';

const mySuperAxios = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1',
    withCredentials: true,
    headers: {
        'API-KEY': 'a3f1a737-1827-41ef-9c53-49394bbbe1b8'
    }
});

export const todoApi = {
    authMe() {
        return mySuperAxios.get<AuthMeResponseType>('auth/me')
            .then(res => res.data);
    },

    getTodoLists() {
        return mySuperAxios.get<GetTodoListsResponseType>('todo-lists')
            .then(res => res.data);
    },

    addTodoList(title: string) {
        return mySuperAxios.post<AddTodoListResponseType>('todo-lists', {
            title: title
        }).then(res => res.data);
    },

    updateTodoListTitle(todolistId: string, title: string) {
        return mySuperAxios.put(`todo-lists/${todolistId}`, {
            title: title
        }).then(res => res.data);
    },

    deleteTodolist(todolistId: string) {
        return mySuperAxios.delete(`todo-lists/${todolistId}`)
            .then(res => res.data);
    },

    getTasks(todolistId: string) {
        return mySuperAxios.get<GetTaskResponseType>(`todo-lists/${todolistId}/tasks`)
            .then(res => res.data.items);
    },

    addTask(todolistId: string, title: string) {
        return mySuperAxios.post<AddTaskResponseType>(`todo-lists/${todolistId}/tasks`, {title})
            .then(res => res.data);
    },

    updateTaskTitle(todolistId: string, taskId: string, title: string) {
        return mySuperAxios.put(`todo-lists/${todolistId}/tasks/${taskId}`, {title})
            .then(res => res.data);
    },

    deleteTask(todolistId: string, taskId: string) {
        return mySuperAxios.delete(`todo-lists/${todolistId}/tasks/${taskId}`)
            .then(res => res.data);
    }
};

type AuthMeResponseType = {
    data: {
        id: number
        login: string
        email: string
    }
    messages: Array<string>
    fieldsErrors: Array<string>
    resultCode: number
}

export type TodoListDomainType = {
    id: string
    title: string
    addedDate: string
    order: number
}

type GetTodoListsResponseType = Array<TodoListDomainType>

type AddItemResponseType<T> = {
    'data': {
        'item': T
    },
    'messages': Array<string>
    'fieldsErrors': Array<string>
    'resultCode': number
}

type AddTodoListResponseType = AddItemResponseType<TodoListDomainType>

type AddTaskResponseType = AddItemResponseType<TaskDomainType>

export type TaskDomainType = {
    'id': string
    'title': string
    'description': string
    'todoListId': string
    'order': number
    'status': number
    'priority': number
    'startDate': string
    'deadline': string
    'addedDate': string
}

type GetTaskResponseType = {
    'items': Array<TaskDomainType>
    'totalCount': number
    'error': string
}

