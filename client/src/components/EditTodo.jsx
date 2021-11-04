import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const EditTodo = () => {
  const location = useLocation();
  location.state.datePlaced = new Date();
  const [task, setTask] = useState(location.state);
  const history = useHistory();

  const getHandleChange = (key) => (event) => {
    setTask({ ...task, [key]: event.target.value });
  };

  const handleUpdateTodo = async (event) => {
    event.preventDefault();
    const url = `http://localhost:5000/api/todos/${task._id}`;
    const obj = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(task),
    };
    const response = await fetch(url, obj);
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    history.push(`/`);
  };

  const handleCancel = () => {
    history.push(`/`);
  };

  return (
    <section>
      <form onSubmit={handleUpdateTodo}>
        <h1>EDIT Todo</h1>
        <div>
          <span>Title: </span>
          <input
            onChange={getHandleChange("title")}
            name="title"
            value={task.title}
            id="title"
            type="text"
          />
        </div>
        <div>
          <span>Description: </span>
          <input
            onChange={getHandleChange("description")}
            value={task.description}
            name="description"
            id="description"
            type="text"
          />
        </div>
        <div>
          <button>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </section>
  );
};
export default EditTodo;
