import React, { useEffect, useState } from "react";

function TodoView() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");

  // 🔹 Fetch todos dari backend
  const fetchTodos = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/todos");
      const data = await res.json();
      setTodos(data.todos);
    } catch (err) {
      console.error("Fetch error:", err);
    }
  };

  // 🔹 Load data saat komponen pertama kali tampil
  useEffect(() => {
    fetchTodos();
  }, []);

  // 🔹 Tambah todo
  const addTodo = async () => {
    if (!newTask.trim()) return;
    try {
      await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      });
      setNewTask("");
      fetchTodos();
    } catch (err) {
      console.error("Add error:", err);
    }
  };

  // 🔹 Toggle completed
  const toggleTodo = async (id, completed) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      fetchTodos();
    } catch (err) {
      console.error("Update error:", err);
    }
  };

  // 🔹 Hapus todo
  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });
      fetchTodos();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "20px auto" }}>
      <h2>Todo List</h2>

      {/* Form tambah todo */}
      <div style={{ display: "flex", marginBottom: "10px" }}>
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Tambah todo baru..."
          style={{ flex: 1, marginRight: "10px" }}
        />
        <button onClick={addTodo}>Tambah</button>
      </div>

      {/* Daftar todos */}
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ marginBottom: "5px" }}>
            <span
              onClick={() => toggleTodo(todo.id, todo.completed)}
              style={{
                textDecoration: todo.completed ? "line-through" : "none",
                cursor: "pointer",
                marginRight: "10px",
              }}
            >
              {todo.task}
            </span>
            <button onClick={() => deleteTodo(todo.id)}>❌</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoView;
