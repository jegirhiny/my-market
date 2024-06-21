import "./signup-form.styles.css";
import { useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import { login, signup } from "../../utility/user-api";

const SignupForm = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const confirmPasswordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password === confirmPasswordRef.current.value) {
      const res = await signup(formData);
      console.log(res.status || res.response.status || res);

      switch (res.status || res.response.status) {
        case 201:
          const res = await login({
            name: formData.name,
            password: formData.password,
          });
          localStorage.setItem("token", res.data.token);
          navigate("/");
          return;
        case 409:
          return setStatus("User already exists");
        case 500:
          return setStatus("Error creating user");
        default:
          return setStatus("Unknown response status");
      }
    } else {
      setStatus("Passwords do not match");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <React.Fragment>
      {status ? <h4 className="form-status">{status}</h4> : <h4 className="form-status" style={{visibility: "hidden"}}>{status}</h4>}
      <form method="POST" onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="Username"
          name="name"
          onChange={handleChange}
          className="form-field"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          onChange={handleChange}
          className="form-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChange}
          className="form-field"
          minLength={12}
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          minLength={12}
          onChange={handleChange}
          className="form-field"
          ref={confirmPasswordRef}
          required
        />
        <input
          type="submit"
          value="Create Account"
          className="form-submit"
          required
        />
      </form>
    </React.Fragment>
  );
};

export default SignupForm;
