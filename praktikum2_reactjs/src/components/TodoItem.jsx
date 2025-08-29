import React, { useState } from "react";

const TodoItem = ({ todo, onUpdateTodo, onDeleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [task, setTask] = useState(todo.task);
  const [completed, setCompleted] = useState(todo.completed);

  const saveChanges = () => {
    fetch(`http://localhost:5000/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, completed: completed ? 1 : 0 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal update todo");
        return res.json();
      })
      .then(() => {
        onUpdateTodo({ ...todo, task, completed });
        setIsEditing(false);
      })
      .catch((err) => alert(err.message));
  };

  const toggleCompleted = () => {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    fetch(`http://localhost:5000/api/todos/${todo.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ task, completed: newCompleted ? 1 : 0 }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal update todo");
        return res.json();
      })
      .then(() => {
        onUpdateTodo({ ...todo, completed: newCompleted });
      })
      .catch((err) => alert(err.message));
  };

  const handleDelete = () => {
    fetch(`http://localhost:5000/api/todos/${todo.id}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (!res.ok) throw new Error("Gagal menghapus todo");
        onDeleteTodo(todo.id);
      })
      .catch((err) => alert(err.message));
  };

  return (
    <li
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: 8,
        background: "#f9f9f9",
        marginBottom: 8,
        borderRadius: 6,
      }}
    >
      <input type="checkbox" checked={completed} onChange={toggleCompleted} />
      {isEditing ? (
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onBlur={saveChanges}
          onKeyDown={(e) => e.key === "Enter" && saveChanges()}
          autoFocus
          style={{ flex: 1, padding: 8 }}
        />
      ) : (
        <span
          onDoubleClick={() => setIsEditing(true)}
          style={{
            flex: 1,
            textDecoration: completed ? "line-through" : "none",
            cursor: "pointer",
          }}
          title="Double klik untuk edit"
        >
          {task}
        </span>
      )}
      {!isEditing && (
        <button
          onClick={handleDelete}
          style={{
            backgroundColor: "#e74c3c",
            color: "white",
            border: "none",
            borderRadius: 4,
            padding: "6px 12px",
            cursor: "pointer",
          }}
          title="Hapus tugas"
        >
          Hapus
        </button>
      )}
    </li>
  );
};

export default TodoItem;
