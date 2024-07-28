import "./item-page.styles.css";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { getToken, isLoggedIn } from "../../utility/user-api";
import { getItem, addCartItem } from "../../utility/item-api";
import { jwtDecode } from "jwt-decode";
import { LuLoader } from "react-icons/lu";
import ErrorCard from "../error-card/error-card.component";
import React from "react";

const ItemPage = ({ triggerRender, setTriggerRender }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();
  let loading = useRef(true);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        loading.current = true;
        const res = await getItem(id);

        switch (res.status || res.response.status) {
          case 200: {
            setItem(res.data.item);
            loading.current = false;
            return;
          }
          default:
            setItem(undefined);
        }
      };

      fetchData();
    }
  }, [id, loggedIn, navigate]);

  const handleAddToCart = async (itemId, userId) => {
    await addCartItem({ itemId, userId });
    setTriggerRender((prev) => prev + 1);
  };

  if (item === undefined) {
    return (
      <div className="item-page">
        <ErrorCard
          message={"404 - Item Not Found"}
          onClick={() => navigate("/selling")}
        />
      </div>
    );
  } else if (loading.current) {
    return (
      <div className="item-loading">
        <LuLoader size={"3rem"} className="rotate" />
        <h2 style={{ marginLeft: "15px" }}>LOADING...</h2>
      </div>
    );
  }

  const showButtons = () => {
    const userId = jwtDecode(getToken()).id;

    if (item.userId !== userId) {
      return (
        <div>
          <button
            className="form-submit"
            onClick={() => handleAddToCart(item.id, userId)}
          >
            Add to Cart
          </button>
        </div>
      );
    }
  };

  return (
    <div className="item-page">
      <img
        src={`${process.env.REACT_APP_URI}${item.images[0].path}`}
        alt={item.images[0].name}
        className="item-page-img"
      />
      <div className="item-details" style={{ marginLeft: "100px" }}>
        <h2>{item.name}</h2>
        <h2>{item.description}</h2>
        <h2>${item.price}</h2>
        <h2 style={{ color: "green" }}>
          {item.stock > 0 ? "In Stock" : "Out of Stock"}
        </h2>
      </div>
      {showButtons()}
    </div>
  );
};

export default ItemPage;
