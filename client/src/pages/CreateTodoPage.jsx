import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi";
import { MdLibraryAdd } from "react-icons/md";

const CreateTodoPage = () => {
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
    const url = "http://localhost:5000/api/todos";
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
      <div>
        <button className="btn m-3" onClick={handleCancel}>
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
            <form onSubmit={handleCreateTodo} onChange={changeHandler}>
              <div className="card-header text-white p-3">
                <h1>Your New Todo</h1>
              </div>
              <div className="card-text m-5 text-dark">
                <div className="text-white mt-3 rounded">
                  <h5>Title</h5>
                  <input className="rounded" id="title" type="text" />
                </div>
                <div className="text-white mt-4">
                  <h6>Description</h6>
                  <textarea className="rounded" id="description" type="text" />
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
};
export default CreateTodoPage;
