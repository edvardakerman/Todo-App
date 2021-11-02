import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";

const EditTodo = () => {
  const location = useLocation();
  const [task, setTask] = useState(location.state);
  const history = useHistory();

  const getHandleChange = (key) => (event) => {
    setTask({ ...task, [key]: event.target.value });
  };

  const handleUpdateTodo = async (event) => {
    event.preventDefault();
    const url = `http://localhost:3000/api/todo/${task.task_id}`;
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
        <input
          onChange={getHandleChange("task_title")}
          label="Title:"
          name="task_title"
          value={task.task_title}
          id="task_title"
          type="text"
        />
        <input
          onChange={getHandleChange("task_body")}
          label="Description:"
          value={task.task_body}
          name="task_body"
          id="task_body"
          type="text"
        />
        <div>
          <button>Update</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </section>
  );
};
export default EditTodo;
