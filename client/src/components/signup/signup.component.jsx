import "./signup.styles.css";
import { Link } from "react-router-dom";
import SignupForm from "../signup-form/signup-form.component";
import { logout } from "../../utility/user-api";

const Signup = () => {
  return (
    <div className="full" style={{ justifyContent: "center" }}>
      <div className="signup-foreground">
        <SignupForm />
        <div className="signup-footer">
          <h5>
            Already have an account?<span> </span>
            <Link to="/login">Sign in</Link>
          </h5>
          <h5>
            <Link to="/" onClick={logout}>
              Continue as guest
            </Link>
          </h5>
        </div>
      </div>
    </div>
  );
};

export default Signup;
