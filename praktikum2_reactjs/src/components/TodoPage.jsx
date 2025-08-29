import React, { useState, useEffect } from "react";
import TodoList from "./TodoList";
import TodoForm from "./TodoForm";
import SearchInput from "./SearchInput";

const TodoPage = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchTodos = () => {
    setLoading(true);
    fetch("http://localhost:5000/api/todos")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((data) => {
        setTodos(data.todos || data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const handleAddTodo = (task) => {
    fetch("http://localhost:5000/api/todos", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menambah todo");
        return res.json();
      })
      .then((data) => {
        setTodos((prev) => [...prev, { id: data.id, task: data.task, completed: false }]);
      })
      .catch((err) => setError(err.message));
  };

  const handleDeleteTodo = (id) => {
    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menghapus todo");
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      })
      .catch((err) => setError(err.message));
  };

  const handleToggleCompleted = (id, completed) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: todoToUpdate.task, completed: !completed }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal update todo");
        setTodos((prev) =>
          prev.map((todo) =>
            todo.id === id ? { ...todo, completed: !completed } : todo
          )
        );
      })
      .catch((err) => setError(err.message));
  };

  const handleUpdateTask = (id, newTask) => {
    const todoToUpdate = todos.find((todo) => todo.id === id);
    if (!todoToUpdate) return;

    fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task: newTask, completed: todoToUpdate.completed }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal update todo");
        setTodos((prev) =>
          prev.map((todo) => (todo.id === id ? { ...todo, task: newTask } : todo))
        );
      })
      .catch((err) => setError(err.message));
  };

  const filteredTodos = todos.filter((todo) =>
    todo.task.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
      <h1 style={{ textAlign: "center" }}>📝 Aplikasi Todo List</h1>

      <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <TodoForm onAddTodo={handleAddTodo} />

      {loading && <p style={{ textAlign: "center" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <>
          <h2>📋 Daftar Tugas Anda</h2>
          <TodoList
            todos={filteredTodos}
            onToggleCompleted={handleToggleCompleted}
            onDeleteTodo={handleDeleteTodo}
            onUpdateTask={handleUpdateTask}
          />
        </>
      )}
    </div>
  );
};

export default TodoPage;
