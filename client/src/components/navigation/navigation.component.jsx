import "./navigation.styles.css";
import { useNavigate, useLocation } from "react-router-dom";
import { getRangeOfItems, getCartItemCount } from "../../utility/item-api";
import { isLoggedIn, logout, getToken } from "../../utility/user-api";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import {
  LuHome,
  LuSearch,
  LuUser,
  LuShoppingCart,
  LuTag,
  LuLogIn,
  LuLogOut,
} from "react-icons/lu";

const Navigation = ({ callbackFunctions }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const triggerRender = callbackFunctions?.triggerRender ?? null;
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let interval;

    if (loggedIn) {
      const token = jwtDecode(getToken());
      const timeout = token.exp * 1000;

      interval = setInterval(() => {
        if (new Date(timeout) <= new Date()) {
          logout();
          navigate("/login");
        }
      }, 1000);

      const fetchData = async () => {
        const res = await getCartItemCount(token);
        setCartCount(res.data.count);
      };

      fetchData();
    }

    return () => {
      clearInterval(interval);
    };
  }, [loggedIn, navigate, cartCount, triggerRender]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    callbackFunctions.setIsLoading(true);
    const res = await getRangeOfItems(searchTerm, 0, 15);
    callbackFunctions.handleFetchedData(res.data.items);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="nav-bar">
      <a
        className={`nav-link ${location.pathname === "/" && "active"}`}
        href="/"
      >
        <LuHome size="1.3rem" style={{ marginRight: "5px" }} />
        Home
      </a>
      <a
        className={`nav-link ${
          location.pathname.includes("/selling") ? "active" : ""
        }`}
        href="/selling"
      >
        <LuTag size="1.3rem" style={{ marginRight: "5px" }} />
        Selling
      </a>
      <a
        className={`nav-link ${location.pathname === "/cart" ? "active" : ""}`}
        style={{ position: "relative" }}
        href="/cart"
      >
        <LuShoppingCart size="1.3rem" style={{ marginRight: "5px" }} />
        Cart
        {loggedIn && cartCount !== 0 ? (
          <span className="cart-icon">{cartCount}</span>
        ) : (
          <></>
        )}
      </a>
      <form method="POST" onSubmit={handleSubmit} className="nav-form">
        <input
          type="text"
          onChange={handleChange}
          className="search-field"
          placeholder="Search for anything"
        />
        <LuSearch size="1.3em" className="search-img" />
      </form>
      <a
        href="/account"
        className={`nav-link ${
          location.pathname === "/account" ? "active" : ""
        }`}
      >
        <LuUser size="1.3rem" style={{ marginRight: "5px" }} />
        {loggedIn ? jwtDecode(getToken()).name : "Account"}
      </a>
      {loggedIn ? (
        <a href="/" onClick={logout} className="nav-link">
          <LuLogOut size="1.3rem" style={{ marginRight: "5px" }} />
          Logout
        </a>
      ) : (
        <a href="/login" className="nav-link">
          <LuLogIn size="1.3rem" style={{ marginRight: "5px" }} />
          Login
        </a>
      )}
    </div>
  );
};

export default Navigation;
