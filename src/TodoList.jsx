import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

export default function TodoList() {
  // const [todos, setTodos] = useState("Sample task"); Before using array object
  const [todos, setTodos] = useState([
    { task: "Sample task", id: uuidv4(), isDone: false },
  ]);
  const [newTodo, setNewTodo] = useState("");

  //   let addNewTask = () => {
  //     // setTodos([...todos, newTodo]); before UUID use
  //     setTodos([...todos, {task: newTodo, id : uuidv4()}]); //new after UUID use, object is created
  //     setNewTodo(" ");
  //   }; // Old function without callback

  //new Function using callback
  let addNewTask = () => {
    setTodos((prevTodos) => {
      return [...prevTodos, { task: newTodo, id: uuidv4(), isDone: false }];
    });
    setNewTodo(" ");
  };

  let updateTodoValue = (event) => {
    setNewTodo(event.target.value);
  };

  let deleteTodo = (id) => {
    // setTodos(todos.filter((todo)=>todo.id !=id)); old without callback
    setTodos((prevTodos) => todos.filter((prevTodos) => prevTodos.id != id)); //with callback
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
        if (todo.id == id) {
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
        if (todo.id == id) {
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
    <div>
      <h3>To-Do-List</h3>
      <input
        placeholder="Enter a Task"
        value={newTodo}
        onChange={updateTodoValue}
      />
      <br />
      <button onClick={addNewTask}>Add</button>

      <br />
      <br />
      <hr />
      <h4>Task's to do</h4>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={todo.isDone ? { textDecorationLine: "line-through" } : {}}
            >
              {todo.task}
            </span>
            &nbsp; &nbsp;
            <button onClick={() => deleteTodo(todo.id)}>delete</button>
            &nbsp; &nbsp;
            <button onClick={() => UpperCaseOne(todo.id)}>Uppercase</button>
            &nbsp; &nbsp;
            <button onClick={() => markAsDone(todo.id)}>Mark as Done</button>
          </li>
        ))}
      </ul>
      <br />
      <button onClick={upperCaseAll}>Uppercase All</button>
      <button onClick={markAllasDone}>Mark all as done</button>
    </div>
  );
}
