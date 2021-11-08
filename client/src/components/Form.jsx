import React, { useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { formValidateMessage } from "../utils/formValidateMessage";
import { UserContext } from "../contexts/UserContext";

export default function Form({ type, title }) {
  const [formFields, setFormFields] = useState(null);
  const [submitStatus, setSubmitStatus] = useState(null);
  const { setUser } = useContext(UserContext);
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validateMessage = formValidateMessage(formFields, type);

    if (validateMessage === "validates") {
      const url = `http://localhost:5000/api/users/${type}`;
      try {
        const { data } = await axios.post(url, formFields);
        localStorage.setItem("tkn", data.token);
        setUser(data.data.user);
        history.push("/");
      } catch (e) {
        if (e.response.data.errorCode === 11000) {
          setSubmitStatus({
            requestCompleted: false,
            message: "This email is already registered.",
          });
        } else {
          setSubmitStatus({
            requestCompleted: false,
            message: "Something went wrong",
          });
        }
      }
    } else {
      setSubmitStatus({
        requestCompleted: false,
        message: validateMessage,
      });
    }
  };

  const handleChange = (value, fieldId) => {
    const payload = { ...formFields };
    payload[fieldId] = value;
    setFormFields(payload);
  };

  if (type === "signup") {
    return (
      <section>
        <form onSubmit={handleSubmit} className="" action="">
          <h1 className="">{title}</h1>
          <div>
            <label htmlFor="fullName">Fullname*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="fullName"
              type="text"
            />
          </div>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="email"
              type="email"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="password"
              type="password"
              autoComplete="new-password"
            />
          </div>
          <div>
            <label htmlFor="passwordConfirm">Confirm Password*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="passwordConfirm"
              type="password"
              autoComplete="new-password"
            />
          </div>
          <div>
            {/* Byt ut nedantående mot Button components */}
            <button>Sign Up</button>
            <Link to="/login">Login</Link>
          </div>
          {submitStatus && <p>{submitStatus.message}</p>}
        </form>
      </section>
    );
  } else if (type === "login") {
    return (
      <section>
        <form onSubmit={handleSubmit} action="">
          <h1>{title}</h1>
          <div>
            <label htmlFor="email">Email*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="email"
              type="email"
              autoComplete="email"
            />
          </div>
          <div>
            <label htmlFor="password">Password*</label>
            <input
              onChange={(e) => handleChange(e.target.value, e.target.id)}
              id="password"
              type="password"
              autoComplete="password"
            />
          </div>
          <div>
            {/* Byt ut nedantående mot Button components */}
            <button>Login</button>
            <Link to="/register">Register</Link>
          </div>
          {submitStatus && <p>{submitStatus.message}</p>}
        </form>
      </section>
    );
  }
}
