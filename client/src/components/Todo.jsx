import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const Todo = () => {
  const [todo, setTodo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
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

      setTodo(responseData.data.todo);
      setIsLoading(false);
    };
    fetchTodo().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [todoId]);

  const handleDelete = (itemId) => async (event) => {
    const confirm = window.confirm(`Are you sure you want to delete`);
    if (!confirm) return;
    const url = `http://localhost:5000/api/todos/${itemId}`;
    const obj = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    const response = await fetch(url, obj);

    if (!response.ok) {
      throw new Error("Something went wrong!");
    }

    history.push(`/`);
  };

  const handleGoBack = () => {
    history.push(`/`);
  };

  if (isLoading) {
    return (
      <section>
        <p>Loading...</p>
        <div>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </section>
    );
  }

  if (errorMessage || !todo) {
    return (
      <section>
        <p>{errorMessage}</p>
        <div>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </section>
    );
  }

  if (todo) {
    const date = new Date(todo.datePlaced);
    return (
      <div className="d-flex justify-content-center m-5">
        <div className="card bg-primary text-center" style={{ width: "28rem" }}>
          <div className="card-body">
            <h2 className="card-title">{todo.title}</h2>
            <h6 className="card-subtitle mb-2 text-white">
              {date.toDateString()}
            </h6>
            <p className="card-text">{todo.description}</p>
            <button className="btn btn-dark m-2" onClick={handleGoBack}>
              Go Back
            </button>
            <a href={`/edit/${todo._id}`}>
              <button className="btn btn-light m-2">Edit</button>
            </a>
            <button
              className="btn btn-danger m-2"
              onClick={handleDelete(todo._id)}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    );
  }
};

export default Todo;
