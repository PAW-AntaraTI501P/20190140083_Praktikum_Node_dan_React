import React, { useEffect, useState } from "react";

function App() {
  const [todos, setTodos] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editTask, setEditTask] = useState({});
  const API_URL = "http://localhost:5000/api/todos";

  // ✅ GET semua todos
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTodos(data.todos))
      .catch((err) => console.error("❌ Error GET:", err));
  }, []);

  // ✅ POST tambah todo
  const addTodo = async () => {
    if (!newTask.trim()) return;
    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: newTask }),
      });
      const data = await res.json();
      if (res.ok) {
        setTodos([...todos, { id: data.id, task: data.task, completed: 0 }]);
        setNewTask("");
      } else {
        console.error("❌ Gagal tambah:", data.error);
      }
    } catch (err) {
      console.error("❌ Error POST:", err);
    }
  };

  // ✅ PUT update nama task
  const updateTask = async (id) => {
    if (!editTask[id] || !editTask[id].trim()) return;
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ task: editTask[id] }),
      });
      if (res.ok) {
        setTodos(
          todos.map((t) =>
            t.id === id ? { ...t, task: editTask[id] } : t
          )
        );
        setEditTask({ ...editTask, [id]: "" });
      } else {
        const errData = await res.json();
        console.error("❌ Gagal update:", errData.error);
      }
    } catch (err) {
      console.error("❌ Error PUT:", err);
    }
  };

  // ✅ PUT toggle completed
  const toggleTodo = async (id, completed) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (res.ok) {
        setTodos(
          todos.map((t) =>
            t.id === id ? { ...t, completed: completed ? 0 : 1 } : t
          )
        );
      } else {
        const errData = await res.json();
        console.error("❌ Gagal update:", errData.error);
      }
    } catch (err) {
      console.error("❌ Error PUT:", err);
    }
  };

  // ✅ DELETE hapus todo
  const deleteTodo = async (id) => {
    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (res.ok) {
        setTodos(todos.filter((t) => t.id !== id));
      } else {
        const errData = await res.json();
        console.error("❌ Gagal hapus:", errData.error);
      }
    } catch (err) {
      console.error("❌ Error DELETE:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>📋 Todo List</h1>

      {/* Input tambah todo */}
      <div>
        <input
          type="text"
          placeholder="Tambah todo baru..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={addTodo}>Tambah</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo.id} style={{ margin: "10px 0" }}>
            <input
              type="checkbox"
              checked={!!todo.completed}
              onChange={() => toggleTodo(todo.id, todo.completed)}
            />

            {/* Jika sedang edit */}
            {editTask[todo.id] !== undefined ? (
              <>
                <input
                  type="text"
                  value={editTask[todo.id]}
                  onChange={(e) =>
                    setEditTask({ ...editTask, [todo.id]: e.target.value })
                  }
                />
                <button onClick={() => updateTask(todo.id)}>Simpan</button>
                <button
                  onClick={() => setEditTask({ ...editTask, [todo.id]: "" })}
                >
                  Batal
                </button>
              </>
            ) : (
              <>
                <span
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    marginLeft: "10px",
                  }}
                >
                  {todo.task}
                </span>
                <button onClick={() => setEditTask({ ...editTask, [todo.id]: todo.task })}>
                  Edit
                </button>
              </>
            )}

            <button onClick={() => deleteTodo(todo.id)}>Hapus</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
