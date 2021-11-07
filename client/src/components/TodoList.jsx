import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiDelete } from "react-icons/fi";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoCheckmarkSharp } from "react-icons/io5";

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
        <div className="">
          <div className="d-flex justify-content-center border-1 mt-5 border-bottom">
            <h2>Welcome, This is your TodoList</h2>
          </div>
        </div>
        <div class="card-group d-flex justify-content-center">
          {tasks.map((todo) => {
            const date = new Date(todo.datePlaced);
            return (
              <div className="m-5">
                <div
                  className="card rounded bg-light text-center"
                  style={{ width: "22rem" }}
                >
                  <div
                    style={{
                      background: "#2980b9" /* fallback for old browsers */,
                      background:
                        "-webkit-linear-gradient(to left, #2c3e50, #2980b9)" /* Chrome 10-25, Safari 5.1-6 */,
                      background:
                        "linear-gradient(to left, #2c3e50, #2980b9)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
                    }}
                    className="card-body rounded"
                  >
                    <a
                      className="nounderline text-decoration-none"
                      href={`/todo/${todo._id}`}
                    >
                      <div class="card-header p-3">
                        <h2
                          style={{
                            color: "#2980b9",
                          }}
                          className="card-title text-white"
                        >
                          {todo.title}
                        </h2>
                        <h6 className="card-subtitle mt-1 text-white">
                          {date.toDateString()}
                        </h6>
                      </div>
                    </a>
                    <p className="card-text text-white m-4">
                      {todo.description}
                    </p>
                    <div>
                      <button
                        className="btn mx-3"
                        onClick={handleDelete(todo._id)}
                      >
                        <IoCheckmarkSharp color={"white"} size={25} />
                      </button>
                      <a href={`/edit/${todo._id}`}>
                        <button className="btn mx-3">
                          <AiTwotoneEdit color={"white"} size={25} />
                        </button>
                      </a>
                      <button
                        className="btn mx-3"
                        onClick={handleDelete(todo._id)}
                      >
                        <FiDelete color={"white"} size={25} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
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
                <button className="btn btn-success">Create New Todo</button>
              </a>
            </div>
          </div>

          <div className="d-flex justify-content-center">
            <table className="table table-striped bg-primary table-hover w-auto">
              <thead>
                <tr>
                  <th scope="col">#</th>
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
                      <td className="mt-4">{tasks.indexOf(task) + 1}</td>
                      <td>
                        <a
                          className="text-white font-weight-bold nounderline text-decoration-none"
                          href={`/todo/${task._id}`}
                        >
                          <h4>{task.title}</h4>
                        </a>
                      </td>
                      <td>{date.toDateString()}</td>
                      <td>
                        <a href={`/edit/${task._id}`}>
                          <button className="btn btn-dark">Edit</button>
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
