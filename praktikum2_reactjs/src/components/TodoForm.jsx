import React, { useState } from "react";

const TodoForm = ({ onAddTodo }) => {
  const [task, setTask] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.trim()) return;
    onAddTodo(task.trim());
    setTask("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: 20 }}>
      <input
        type="text"
        placeholder="Tambah todo baru..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        style={{ padding: 8, width: "70%", marginRight: 10, borderRadius: 4, border: "1px solid #ccc" }}
      />
      <button type="submit" style={{ padding: "8px 16px", borderRadius: 4, cursor: "pointer" }}>
        Tambah
      </button>
    </form>
  );
};

export default TodoForm;
