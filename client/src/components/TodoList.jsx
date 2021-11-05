import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TodoList() {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      const url = "http://localhost:5000/api/todos";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setTasks(responseData.data.todos.reverse());
      setIsLoading(false);
    };
    fetchTasks().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, []);

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

    setTasks((pp) => pp.filter((p) => p._id !== itemId));
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
  if (tasks) {
    return (
      <section>
        <div>
          <h2>TodoList</h2>
          <Link to={{ pathname: "/create" }}>
            <button>Create New Todo</button>
          </Link>
          <table>
            <thead>
              <tr>
                <th>Task</th>
                <th>Date</th>
                <th>Description</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {tasks.map((task) => {
                const date = new Date(task.datePlaced);
                return (
                  <tr key={task._id}>
                    <td>
                      <a href={`/todo/${task._id}`}>{task.title}</a>
                    </td>
                    <td>{date.toDateString()}</td>
                    <td>{task.description}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/edit/${task._id}`,
                          state: task,
                        }}
                      >
                        <button>Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={handleDelete(task._id)}>Delete</button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </section>
    );
  }

  return (
    <section>
      <p>"Something went wrong!"</p>
    </section>
  );
}
