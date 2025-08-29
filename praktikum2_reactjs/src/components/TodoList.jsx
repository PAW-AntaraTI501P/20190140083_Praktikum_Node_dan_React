import React, { useState } from "react";

const TodoList = ({ todos, onToggleCompleted, onDeleteTodo, onUpdateTask }) => {
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  const startEditing = (id, currentTask) => {
    setEditId(id);
    setEditTask(currentTask);
  };

  const cancelEditing = () => {
    setEditId(null);
    setEditTask("");
  };

  const saveEditing = (id) => {
    if (editTask.trim() === "") return;
    onUpdateTask(id, editTask.trim());
    cancelEditing();
  };

  if (todos.length === 0) {
    return <p>Belum ada tugas.</p>;
  }

  return (
    <ul style={{ listStyleType: "none", paddingLeft: 0 }}>
      {todos.map(({ id, task, completed }) => (
        <li
          key={id}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "8px 12px",
            borderBottom: "1px solid #ddd",
            backgroundColor: completed ? "#d3ffd3" : "#fff",
          }}
        >
          <input
            type="checkbox"
            checked={completed}
            onChange={() => onToggleCompleted(id, completed)}
            style={{ marginRight: 10 }}
          />

          {editId === id ? (
            <>
              <input
                type="text"
                value={editTask}
                onChange={(e) => setEditTask(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") saveEditing(id);
                  if (e.key === "Escape") cancelEditing();
                }}
                autoFocus
                style={{ flexGrow: 1, marginRight: 10 }}
              />
              <button onClick={() => saveEditing(id)}>Simpan</button>
              <button onClick={cancelEditing} style={{ marginLeft: 5 }}>
                Batal
              </button>
            </>
          ) : (
            <>
              <span
                style={{
                  textDecoration: completed ? "line-through" : "none",
                  flexGrow: 1,
                  cursor: "pointer",
                }}
                title="Klik untuk toggle selesai"
                onDoubleClick={() => startEditing(id, task)}
              >
                {task}
              </span>
              <button
                onClick={() => startEditing(id, task)}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#ffc107",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Edit
              </button>
              <button
                onClick={() => onDeleteTodo(id)}
                style={{
                  marginLeft: 10,
                  backgroundColor: "#ff4d4d",
                  border: "none",
                  color: "white",
                  padding: "6px 12px",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                Hapus
              </button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
