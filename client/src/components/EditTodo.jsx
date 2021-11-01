import { React, useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

const EditTodo = () => {
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState();
  const [message, setMessage] = useState("");
  const history = useHistory();

  const TodoId = window.location.href.split("/")[4];

  const getHandleChange = (key) => (event) => {
    setTask({ ...task, [key]: event.target.value });
  };

  useEffect(() => {
    const fetchTasks = async () => {
      const url = `http://localhost:3000/api/todo/${TodoId}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();

      setTask(responseData);
      setIsLoading(false);
    };
    fetchTasks().catch((error) => {
      setIsLoading(false);
      setErrorMessage(error.message);
    });
  }, [TodoId]);

  const handleOnSubmit = (TodoId) => async (event) => {
    event.preventDefault();
    const url = `http://localhost:3000/api/todo/${TodoId}`;

    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(task),
    });
    if (!response.ok) {
      const responseErrorMessage = await response.json();
      setMessage(responseErrorMessage);
    }
    if (response.ok) {
      setMessage("Successfully updated product!");
    }
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
    <div>
      <p>Edit Todo Item</p>
      <form onSubmit={handleOnSubmit}>
        <table>
          <tbody>
            <tr>
              <td>
                <span>Title:</span>
                <input
                  type="text"
                  name="title"
                  value={task.task_title}
                  size={50}
                  onChange={getHandleChange("task_title")}
                />
              </td>
              <td>
                <span>Description:</span>
                <input
                  type="text"
                  name="body"
                  value={task.task_body}
                  size={50}
                  onChange={getHandleChange("task_body")}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <button>Update</button>
      </form>
      <p>{message}</p>
    </div>
  );
};

export default EditTodo;
