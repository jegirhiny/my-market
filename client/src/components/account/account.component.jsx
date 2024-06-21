import "./account.styles.css";
import React from "react";
import NavCard from "../nav-card/nav-card.component";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../../utility/user-api";
import { useEffect } from "react";
import { LuClipboardList, LuHistory, LuInfo, LuHelpCircle } from "react-icons/lu";

const Account = () => {
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    }
  }, [loggedIn, navigate]);

  return (
    <div className="account">
      <div className="nav-box">
        <NavCard
          Icon={LuInfo}
          title="Edit Account"
          description="Update your account information."
          link=""
        />
        <NavCard
          Icon={LuHistory}
          title="History"
          description="Check your activity history."
          link=""
        />
        <NavCard
          Icon={LuClipboardList}
          title="Wishlists"
          description="Manage your saved lists."
          link=""
        />
      </div>
      <div className="nav-box">
        <NavCard
          Icon={LuHelpCircle}
          title="FAQ"
          description="Answers to common questions."
          link=""
        />
      </div>
    </div>
  );
};

export default Account;
