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
      <div>
        <div>
          <h1>{todo.title}</h1>
        </div>
        <div>
          <h6>{date.toDateString()}</h6>
        </div>
        <div>
          <h4>{todo.description}</h4>
        </div>
        <div>
          <button onClick={handleGoBack}>Go Back</button>
        </div>
      </div>
    );
  }
};

export default Todo;
