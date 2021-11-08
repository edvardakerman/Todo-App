import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";

const EditTodoPage = () => {
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

  if (task) {
    const date = new Date(task.datePlaced);
    return (
      <section>
        <div>
          <button className="btn btn-light m-3" onClick={handleCancel}>
            <BiArrowBack color={"#2c3e50"} size={35} />
          </button>
        </div>

        <div className="d-flex justify-content-center m-5">
          <div className="card text-center" style={{ width: "30rem" }}>
            <div
              className="card-body rounded"
              style={{
                background: "#2980b9" /* fallback for old browsers */,
                background:
                  "-webkit-linear-gradient(to left, #2c3e50, #2980b9)" /* Chrome 10-25, Safari 5.1-6 */,
                background:
                  "linear-gradient(to left, #2c3e50, #2980b9)" /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */,
              }}
            >
              <form onSubmit={handleUpdateTodo}>
                <div className="card-header text-white">
                  <h1>Edit Your Todo</h1>
                  <h6 className="card-subtitle text-white">
                    {date.toDateString()}
                  </h6>
                </div>
                <div className="card-text m-5 text-dark">
                  <div className="text-white mt-3 rounded">
                    <h5>Title</h5>
                    <input
                      className="rounded"
                      onChange={getHandleChange("title")}
                      name="title"
                      value={task.title}
                      id="title"
                      type="text"
                    />
                  </div>
                  <div className="text-white mt-4 rounded">
                    <h6>Description</h6>
                    <textarea
                      className="rounded"
                      onChange={getHandleChange("description")}
                      value={task.description}
                      name="description"
                      id="description"
                      type="text"
                    />
                  </div>
                </div>
                <div>
                  <button className="btn mx-3" onClick={handleCancel}>
                    <BiArrowBack color={"white"} size={25} />
                  </button>
                  <button className="btn mx-3">
                    <MdLibraryAdd size={25} color={"white"} />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    );
  }
};
export default EditTodoPage;
