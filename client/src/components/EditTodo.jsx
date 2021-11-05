import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditTodo = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [task, setTask] = useState({
    title: "Todo",
    description: "Do this todo",
  });
  const history = useHistory();

  const todoId = window.location.href.split("/")[4];

  useEffect(() => {
    const fetchTodo = async () => {
      const url = `http://localhost:5000/api/todos/${todoId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      responseData.data.todo.datePlaced = new Date();

      setTask(responseData.data.todo);
      setIsLoading(false);
    };
    fetchTodo().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [todoId]);

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

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
      </section>
    );
  }

  if (errorMessage) {
    return (
      <section>
        <p>{errorMessage}</p>
      </section>
    );
  }

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
