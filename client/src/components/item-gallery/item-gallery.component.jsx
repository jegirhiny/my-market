import "./item-gallery.styles.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { isLoggedIn, getToken } from "../../utility/user-api";
import { getItems } from "../../utility/item-api";
import { LuPlus, LuLoader } from "react-icons/lu";
import ItemCard from "../item-card/item-card.component";

const ItemGallery = () => {
  const [key, setKey] = useState(Math.random());
  const [selling, setSelling] = useState([]);
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();
  let loading = useRef(true);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        loading.current = true;
        const items = await getItems(jwtDecode(getToken()));
        setSelling(items.data.selling);
      };

      fetchData();
      loading.current = false;
    }
  }, [key, loggedIn, navigate]);

  const getItemArr = () => {
    const sellingHTML = [];

    for (let i = 0; i < selling.length; i += 5) {
      sellingHTML.push(
        <div key={i} className="item-row">
          {selling.slice(i, i + 5).map((item) => (
            <ItemCard key={item.id} item={item} setKey={setKey} />
          ))}
        </div>
      );
    }

    const lastRow = sellingHTML[sellingHTML.length - 1];

    const addItemHTML = (
      <div
        key="add-item"
        className="item-card"
        style={{ justifyContent: "center" }}
        onClick={() => navigate("/selling/new")}
      >
        <LuPlus size={"1.3rem"} style={{ marginRight: "5px" }} />
        <h4 className="item-header">Add Item</h4>
      </div>
    );

    if (lastRow.props.children.length < 5) {
      lastRow.props.children.push(addItemHTML);
    } else {
      sellingHTML.push(
        <div key={sellingHTML.length} className="item-row">
          {addItemHTML}
        </div>
      );
    }

    return sellingHTML;
  };

  if (loading.current) {
    return (
      <div className="item-loading">
        <LuLoader size={"3rem"} className="rotate" />
        <h2 style={{ marginLeft: "15px" }}>LOADING...</h2>
      </div>
    );
  } else if (selling.length === 0) {
    return (
      <div className="item-container">
        <div className="item-row">
          <div
            key="add-item"
            className="item-card"
            style={{ justifyContent: "center" }}
            onClick={() => navigate("/selling/new")}
          >
            <LuPlus size={"1.3rem"} style={{ marginRight: "5px" }} />
            <h4 className="item-header">Add Item</h4>
          </div>
        </div>
      </div>
    );
  }

  return <div className="item-container">{getItemArr()}</div>;
};

export default ItemGallery;
