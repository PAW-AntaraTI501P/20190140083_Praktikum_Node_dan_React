// src/components/TodoItem.js

import React from "react";

const TodoItem = ({ todo, onToggleCompleted, onDeleteTodo }) => {
  return (
    <li
      style={{
        marginBottom: "10px",
        border: "1px solid white",
        padding: "10px",
        borderRadius: "8px",
        backgroundColor: todo.completed ? "#2d3d3d" : "transparent",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          width: "100%",
          justifyContent: "space-between",
        }}
      >
        <h3
          style={{
            margin: 0,
            textDecoration: todo.completed ? "line-through" : "none",
          }}
        >
          {todo.task}
        </h3>
        <div style={{ display: "flex", gap: "5px" }}>
          <button
            onClick={() => onToggleCompleted(todo.id, todo.completed)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: todo.completed ? "salmon" : "lightgreen",
              color: "#282c34",
              border: "none",
              cursor: "pointer",
            }}
          >
            {todo.completed ? "Belum Selesai" : "Selesai"}
          </button>
          <button
            onClick={() => onDeleteTodo(todo.id)}
            style={{
              padding: "5px 10px",
              borderRadius: "4px",
              backgroundColor: "tomato",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Hapus
          </button>
        </div>
      </div>
    </li>
  );
};

export default TodoItem;