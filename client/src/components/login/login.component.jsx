import "./login.styles.css";
import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utility/user-api";
import LoginForm from "../login-form/login-form.component";

const Login = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (isLoggedIn()) {
      navigate("/");
    }
  }, [navigate]);

  return (
    <div className="full" style={{justifyContent: "center"}}>
      <div className="login-foreground">
        <LoginForm />
        <h5 className="login-footer">
          Don't have an account?<span> </span>
          <Link to="/signup">Sign up</Link>
        </h5>
      </div>
    </div>
  );
};

export default Login;
