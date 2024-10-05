import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./TodoList.css"; // Import the CSS file

export default function TodoList() {
  const [todos, setTodos] = useState([
    { task: "Sample task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  let addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo("");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
  };

  let upperCaseAll = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          task: todo.task.toUpperCase(),
        };
      })
    );
  };

  let UpperCaseOne = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            task: todo.task.toUpperCase(),
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAsDone = (id) => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          return {
            ...todo,
            isDone: true,
          };
        } else {
          return todo;
        }
      })
    );
  };

  let markAllasDone = () => {
    setTodos((prevTodos) =>
      prevTodos.map((todo) => {
        return {
          ...todo,
          isDone: true,
        };
      })
    );
  };

  return (
    <div className="todo-container">
      <h3 className="title">To-Do List</h3>
      <div className="input-container">
        <input
          className="todo-input"
          placeholder="Enter a Task"
          value={newTodo}
          onChange={updateTodoValue}
        />
        <button className="add-button" onClick={addNewTask}>
          Add
        </button>
      </div>

      <hr />
      <h4 className="tasks-title">Tasks to Do</h4>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className="todo-item">
            <span
              style={ 
                todo.isDone ? { textDecorationLine: "line-through", color: "grey" } : {}
              }
            >
              {todo.task}
            </span>
            <div className="button-group">
              <button className="delete-button" onClick={() => deleteTodo(todo.id)}>
                Delete
              </button>
              <button className="uppercase-button" onClick={() => UpperCaseOne(todo.id)}>
                Uppercase
              </button>
              <button className="done-button" onClick={() => markAsDone(todo.id)}>
                Mark as Done
              </button>
            </div>
          </li>
        ))}
      </ul>
      <div className="footer-buttons">
        <button className="uppercase-all-button" onClick={upperCaseAll}>
          Uppercase All
        </button>
        <button className="mark-all-done-button" onClick={markAllasDone}>
          Mark All as Done
        </button>
      </div>
    </div>
  );
}
