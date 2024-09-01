import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { TodoForm } from './component/TodoForm';
import { Todos } from './component/Todos';
import { EditToDoForm } from './component/EditToDoForm';
uuidv4();

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    const newTodo = {
      id: uuidv4(),
      task: todo,
      completed: false,
      isEditing: false,
    }
      
      fetch("http://localhost:8080/task", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTodo)
    })
        .then(response => response.json())
        .then(data => {
            console.log('Task added:', data);
            setTodos([...todos, newTodo]);
        })
        .catch(error => {
            console.error("Error adding task:", error);
        })
          
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => todo.id ===id ? {...todo, completed: !todo.completed} : todo));
  };

  const deleteTask = (taskId) => {
    fetch(`http://localhost:8080/tasks/${taskId}`, {
      method: "DELETE",
      headers: {
        'Content-Type': 'application/json',
      }
    })
    .then(response => response.json())
    .then(data => {
      console.log("task delete successful", data);
      setTodos(todos.filter(todo => todo.id !== taskId));
    })
    .catch(error => {
      console.error("Error adding task:", error);
  })
  };

  const editTask = (taskId, newTaskContent) => {
    fetch(`http://localhost:8080/update/${taskId}`, {
      method: "PATCH",
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({task: newTaskContent}),
    })
    .then(response => response.json())
    .then(data => {
      console.log("update task successful", data);
      setTodos(todos.map(todo => todo.id === taskId ? {...todo, task:newTaskContent} : todo));
    })
    .catch(error => {
      console.error("Error editing task:", error);
  })
  }

  useEffect(() => {
    console.log(todos)
  }, [todos])

  return (
    <BrowserRouter>
      <Routes>
          <Route path="/" element={<TodoForm addTodo={addTodo} />}>
            <Route path="tasks" element={<Todos todos={todos} toggleComplete={toggleComplete} deleteTask={deleteTask} />} />
          </Route>
          <Route path="/update/:taskId" element={<EditToDoForm editTask={editTask}/>} />
          
      </Routes>
    </BrowserRouter>
  );
}

export default App;
