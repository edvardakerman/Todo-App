import { React, useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FiDelete } from "react-icons/fi";
import { AiTwotoneEdit } from "react-icons/ai";
import { IoCheckmarkSharp } from "react-icons/io5";

export default function TodoListPage() {
  const [todos, setTodos] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();

  useEffect(() => {
    const fetchTodos = async () => {
      const url = "http://localhost:5000/api/todos";

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setTodos(responseData.data.todos.reverse());
      setIsLoading(false);
    };
    fetchTodos().catch((error) => {
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

    setTodos((pp) => pp.filter((p) => p._id !== itemId));
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

  if (todos) {
    return (
      <div>
        <div className="">
          <div className="d-flex justify-content-center border-1 mt-5 border-bottom">
            <h2>Welcome, This is your TodoList</h2>
          </div>
        </div>
        <div className="row row-cols-1 row-cols-md-3 m-5">
          {todos.map((todo) => {
            const date = new Date(todo.datePlaced);
            return (
              <div key={todo._id} className="col mb-4">
                <div className="card text-center h-100">
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
                      <div className="card-header p-3">
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
      </div>
    );
  }

  return (
    <section>
      <p>"Something went wrong!"</p>
    </section>
  );
}
