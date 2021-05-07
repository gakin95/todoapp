const baseUrl = 'https://jsonplaceholder.typicode.com/';

const Routes = {
    addTodo : baseUrl + 'posts',
    getALLTodo : baseUrl + 'posts',
    getATodo: baseUrl + 'posts/', //append id
    updateTodo: baseUrl + 'posts/', //append id
    deleteTodo: baseUrl + 'posts/', //append id
};

export {Routes}