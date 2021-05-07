import { Routes } from "../constants";
import axios from "axios";


const addTodo = async (body) => {
    return await axios({
        method: "post",
        data: body,
        url: Routes.addTodo,
        headers: {
          "Content-Type":  "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        return {
          message: 'Succesfully created',
          status: true,
          data: res.data
        };
      })
      .catch((err) => {
        return {
          message: 'Something went wrong',
          status: false,
          data:[],
        };
      });
  };

  const getALLTodo = async () => {
    return await axios({
        method: "get",
        url: Routes.getALLTodo,
        headers: {
          "Content-Type":  "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        return {
          data: res.data
        };
      })
      .catch((err) => {
        return {
          data:[],
        };
      });
  };

  const getATodo = async (id) => {
    return await axios({
        method: "get",
        url: Routes.getATodo + id,
        headers: {
          "Content-Type":  "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        return {
          data: res.data
        };
      })
      .catch((err) => {
        return {
          data:[],
        };
      });
  };

  const updateTodo = async (body, id) => {
    return await axios({
        method: "put",
        data: body,
        url: Routes.updateTodo + id,
        headers: {
          "Content-Type":  "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        return {
          message: 'Succesfully updated',
          status: true,
          data: res.data
        };
      })
      .catch((err) => {
        return {
          message: 'Something went wrong',
          status: false,
          data:[],
        };
      });
  };

  const deleteTodo = async (id) => {
    return await axios({
        method: "delete",
        url: Routes.deleteTodo + id,
        headers: {
          "Content-Type":  "application/json; charset=UTF-8",
        },
      })
      .then((res) => {
        return {
          message: 'Succesfully deleted',
          status: true,
          data: res
        };
      })
      .catch((err) => {
        return {
          message: 'Something went wrong',
          status: false,
          data:[],
        };
      });
  };


  export {
      addTodo,
      getALLTodo,
      getATodo,
      updateTodo,
      deleteTodo
  }