import * as actionTypes from '../actions/actionTypes';
import { updatedObject } from '../utility'

const initialState = {
    details:[],
    isDeleted: false
};

const getTodos = (state, action) => {
    return updatedObject(state, {
        details:action.data
    })
};

const addTodo = (state, action) => {
    const tempData = state.details;
    tempData.unshift(action.item);
    return updatedObject(state, {
        details:tempData
    })
};

const updateTodo = (state, action) => {
    const tempData = state.details;
    const curItem = tempData.find(item => item.id === action.item.id);
    const index = tempData.indexOf(curItem);
    const todo = tempData[index];
    todo.title = action.item.title;
    todo.body = action.item.body;
    return updatedObject(state, {
        details:tempData
    })
};

const deleteTodo = (state, action) => {
    const tempData = state.details;
    const curItems = tempData.filter(item => item.id != action.id);
    return updatedObject(state, {
        details:curItems,
        isDeleted: true
    })
};


const todos = (state = initialState , action) => {
    switch(action.type) {
        case actionTypes.GET_TODOS : return getTodos(state, action);
        case actionTypes.ADD_TODO : return addTodo(state, action);
        case actionTypes.UPDATE_TODO : return updateTodo(state, action);
        case actionTypes.DELETE_TODO : return deleteTodo(state, action);
        default: return state
    }
}

export default  todos