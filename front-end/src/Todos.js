import React, { useState, useEffect } from "react";
import axios from "axios";

const Todos = () => {
  const [inputTodo, setInputTodo] = useState({ title: "", description: "" });
  const [todosList, setTodosList] = useState([]);

  useEffect(() => {
    fetchTodos();
  }, []);

  const onInputChange = (e) => {
    setInputTodo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const fetchTodos = () => {
    return axios
      .get("/api/todos")
      .then((response) => {
        setTodosList(response.data.data.todos);
        console.log(response.data);
      })
      .catch((e) => console.log(e.response.data.error));
  };

  const addTodo = (e) => {
    e.preventDefault();
    axios
      .post("/api/todos", { text: inputTodo.title, description: inputTodo.description })
      .then((response) => console.log(response))
      .then(fetchTodos())
      .catch((e) => console.log(e.response.data.error));
    setInputTodo({ title: "", description: "" });
  };

  const deleteTodo = (id) => {
    axios
      .delete(`/api/todos/${id}`)
      .then(() => console.log("Delete successful"))
      .then(fetchTodos())
      .catch((e) => console.log(e.response.data.error));
  };

  return (
    <div>
      <h1>Todo</h1>
      <form onSubmit={addTodo}>
        <input placeholder="Add title" type="text" name="title" value={inputTodo.title} onChange={onInputChange} />
        <input placeholder="Add description" type="text" name="description" value={inputTodo.description} onChange={onInputChange} />
        <button type="submit">Add</button>
      </form>
      {!todosList.length ? (
        <p>Add todo items</p>
      ) : (
        todosList.map((todo, i) => {
          return (
            <li key={i}>
              <p style={{ display: "inline-block" }}>
                <span>{todo.title}:&nbsp;&nbsp;</span>
                <span>{todo.description}&nbsp;&nbsp;</span>
              </p>
              <button onClick={() => deleteTodo(todo.id)}>delete</button>
            </li>
          );
        })
      )}
    </div>
  );
};

export default Todos;
