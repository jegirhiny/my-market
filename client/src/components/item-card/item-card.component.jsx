import "./item-card.styles.css";
import { deleteItem } from "../../utility/item-api";
import { useNavigate, useLocation } from "react-router-dom";
import { LuTrash2 } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";
import { getToken } from "../../utility/user-api";
import React from "react";

const ItemCard = ({ item, setKey }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleDelete = async (e, id) => {
    e.stopPropagation();
    await deleteItem(id);

    if (setKey !== undefined) {
      setKey(Math.random());
    }
  };

  const showButtons = () => {
    if (location.pathname === "/") {
      return;
    }

    if (item.userId === jwtDecode(getToken()).id) {
      return (
        <div className="item-menu">
          <LuTrash2
            size="1.3rem"
            onClick={(e) => handleDelete(e, item.id)}
            className="item-button"
          />
        </div>
      );
    }
  };

  return (
    <div className="item-card" onClick={() => navigate(`/item/${item.id}`)}>
      <img
        src={`${process.env.REACT_APP_URI}/${item.images[0].path}`}
        alt={item.images[0].name}
        className="item-img"
      />
      <h4 className="item-header">{item.name}</h4>
      {location.pathname === "/" && (
        <h4 className="item-header" style={{margin: "5px 0 20px 0"}}>${item.price}</h4>
      )}
      {showButtons()}
    </div>
  );
};

export default ItemCard;
