import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const CreateTodo = () => {
  const [formFields, setFormFields] = useState(null);
  const history = useHistory();

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  const changeHandler = (event) =>
    handleChange(event.target.value, event.target.id);

  const handleCreateTodo = async (event) => {
    event.preventDefault();
    const url = "http://localhost:3000/api/todo";
    const obj = {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(formFields),
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

  return (
    <section>
      <form onSubmit={handleCreateTodo} onChange={changeHandler}>
        <h1>New Todo</h1>
        <div>
          <span>Title:</span>
          <input label="Title:" id="task_title" type="text" />
        </div>
        <div>
          <span>Description:</span>
          <input label="Description:" id="task_body" type="text" />
        </div>
        <input label="Id:" id="task_id" type="number" />
        <div>
          <button>Create</button>
          <button onClick={handleCancel}>Cancel</button>
        </div>
      </form>
    </section>
  );
};
export default CreateTodo;
