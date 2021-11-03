import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function TodoList() {
  const [tasks, setTasks] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchTasks = async () => {
      const url = "http://localhost:3000/api/todo";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setTasks(responseData);
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
    const url = `http://localhost:3000/api/todo/${itemId}`;
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

    setTasks((pp) => pp.filter((p) => p.task_id !== itemId));
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
            <button>Create New task</button>
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
                const date = new Date(task.task_date);
                return (
                  <tr key={task.task_id}>
                    <td>{task.task_title}</td>
                    <td>{date.toDateString()}</td>
                    <td>{task.task_body}</td>
                    <td>
                      <Link
                        to={{
                          pathname: `/edit/${task.task_id}`,
                          state: task,
                        }}
                      >
                        <button>Edit</button>
                      </Link>
                    </td>
                    <td>
                      <button onClick={handleDelete(task.task_id)}>
                        Delete
                      </button>
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
