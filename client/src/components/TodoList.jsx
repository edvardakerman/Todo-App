import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

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
          <div>
            <div className="d-flex justify-content-center m-5">
              <h2>TodoList</h2>
            </div>
            <div className="d-flex justify-content-center m-5">
              <a href="/create">
                <button className="btn btn-primary">Create New Todo</button>
              </a>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <table className="table table-striped bg-primary table-hover w-auto">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Date</th>
                  <th scope="col">Edit</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((task) => {
                  const date = new Date(task.datePlaced);
                  return (
                    <tr key={task._id}>
                      <td>
                        <a
                          className="text-white font-weight-bold nounderline text-decoration-none"
                          href={`/todo/${task._id}`}
                        >
                          <h3>{task.title}</h3>
                        </a>
                      </td>
                      <td>{date.toDateString()}</td>
                      <td>
                        <a href={`/edit/${task._id}`}>
                          <button className="btn btn-primary">Edit</button>
                        </a>
                      </td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={handleDelete(task._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
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
