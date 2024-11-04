import React, { useState } from "react";

function List({ name, onEdit, onDelete, isEditing }) {
  return (
    <li className={isEditing ? "editing" : ""}>
      {name}
      <div>
        <button className="edit-button" onClick={onEdit}>
          ✏️
        </button>
        <button className="delete-button" onClick={onDelete}>
          🗑️
        </button>
      </div>
    </li>
  );
}

function App() {
  const [toDoList, setToDoList] = useState(["C Item", "D Item"]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  function CreateListElements() {
    return toDoList.map((element, index) => (
      <List
        key={index}
        name={element}
        onEdit={() => handleEdit(index)}
        onDelete={() => handleDelete(index)}
        isEditing={editingIndex === index}
      />
    ));
  }

  function handleNewItem() {
    if (newTask.trim() !== "") {
      if (editingIndex !== null) {
        const updatedList = toDoList.map((item, index) =>
          index === editingIndex ? newTask : item
        );
        setToDoList(updatedList);
        setEditingIndex(null);
      } else {
        setToDoList([...toDoList, newTask]);
      }
      setNewTask("");
    }
  }

  function handleEdit(index) {
    setEditingIndex(index);
    setNewTask(toDoList[index]);
  }

  function handleDelete(index) {
    const updatedList = toDoList.filter((_, i) => i !== index);
    setToDoList(updatedList);
  }

  function handleChange(event) {
    setNewTask(event.target.value);
  }

  return (
    <div className="container">
      <div className="heading">
        <h1>To-Do List</h1>
      </div>
      <div className="form">
        <input
          type="text"
          placeholder="Enter a TODO item"
          onChange={handleChange}
          value={newTask}
        />
        <button onClick={handleNewItem}>
          <span>{editingIndex !== null ? "Save" : "Add"}</span>
        </button>
      </div>
      <div>
        <ul>{CreateListElements()}</ul>
      </div>
    </div>
  );
}

export default App;
