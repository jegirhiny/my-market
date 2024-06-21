import "./login-form.styles.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { login } from "../../utility/user-api";

const LoginForm = () => {
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({ name: "", password: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await login(formData);
    console.log(res.status || res.response.status || res);

    switch (res.status || res.response.status) {
      case 200: {
        localStorage.setItem("token", res.data.token);
        navigate("/");
        return;
      }
      default:
        return setStatus("Username or Password is incorrect.");
    }
  };

  const handleChage = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <React.Fragment>
      {status ? <h4 className="form-status">{status}</h4> : <h4 className="form-status" style={{visibility: "hidden"}}>{status}</h4>}
      <form method="POST" onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="Username"
          name="name"
          onChange={handleChage}
          className="form-field"
          required
        />
        <input
          type="password"
          placeholder="Password"
          name="password"
          onChange={handleChage}
          className="form-field"
          minLength={12}
          required
        />
        <input type="submit" value="Login" className="form-submit" required />
      </form>
    </React.Fragment>
  );
};

export default LoginForm;
