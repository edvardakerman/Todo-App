import React, { useState, useEffect } from "react";
import { BiArrowBack } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";
import { useHistory } from "react-router-dom";

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
      const token = localStorage.getItem("tkn");

      const obj = {
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
      };

      const response = await fetch(url, obj);

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
    const token = localStorage.getItem("tkn");
    const obj = {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
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
        <button className="btn mx-3" onClick={handleCancel}>
          <BiArrowBack color={"#2c3e50"} size={25} />
        </button>
        <div className="d-flex justify-content-center mt-5">
          <p>{errorMessage}</p>
        </div>
        <div className="d-flex justify-content-center">
          <button className="btn mx-3" onClick={handleCancel}>
            <BiArrowBack color={"#2c3e50"} size={25} />
          </button>
        </div>
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

        <div className="d-flex justify-content-center my-5">
          <div className="card text-center" style={{ width: "30rem" }}>
            <div className="card-body rounded bg-color">
              <form onSubmit={handleUpdateTodo}>
                <div className="card-header text-white">
                  <h1>Edit Your Todo</h1>
                  <h6 className="card-subtitle text-white my-2">
                    {date.toDateString()}
                  </h6>
                </div>
                <div className="card-text my-5">
                  <div className="text-white mt-3">
                    <input
                      className=""
                      onChange={getHandleChange("title")}
                      name="title"
                      value={task.title}
                      id="title"
                      type="text"
                    />
                  </div>
                  <div className="mt-4 rounded">
                    <textarea
                      className="rounded mt-4"
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

  return (
    <section>
      <p>"Something went wrong!"</p>
    </section>
  );
};
export default EditTodoPage;
