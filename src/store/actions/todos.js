import * as actionTypes from "./actionTypes";

export const getTodos = (payload) => {
  return {
    type: actionTypes.GET_TODOS,
    data: payload,
  };
};

export const addTodo = (payload) => {
  return {
    type: actionTypes.ADD_TODO,
    item: payload,
  };
};

export const updateTodo = (payload) => {
  return {
    type: actionTypes.UPDATE_TODO,
    item: payload,
  };
};

export const deleteTodo = (id) => {
  return {
    type: actionTypes.DELETE_TODO,
    id,
  };
};
