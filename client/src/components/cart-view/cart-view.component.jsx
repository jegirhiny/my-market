import "./cart-view.styles.css";
import { useNavigate } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import {
  getCartItems,
  getItem,
  incrementCartItemCount,
  removeCartItem,
} from "../../utility/item-api";
import { getToken, isLoggedIn } from "../../utility/user-api";
import {
  LuLoader,
  LuChevronLeft,
  LuChevronRight,
  LuTrash2,
} from "react-icons/lu";
import { jwtDecode } from "jwt-decode";

const CartView = () => {
  const [items, setItems] = useState([]);
  const [triggerRender, setTriggerRender] = useState(Math.random());
  const loading = useRef(true);
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      const fetchData = async () => {
        loading.current = true;
        const res = await getCartItems(jwtDecode(getToken()));
        const buying = res.data.buying;

        const fetchedItems = await Promise.all(
          buying.map(async (cartItem) => {
            return {
              item: (await getItem(cartItem.itemId)).data.item,
              cartItem: cartItem,
            };
          })
        );

        setItems(fetchedItems);
        loading.current = false;
      };

      fetchData();
    }
  }, [triggerRender, loggedIn, navigate]);

  const handleIncrement = async (cartItemId, value) => {
    await incrementCartItemCount({
      cartItemId: cartItemId,
      value: value,
    });

    setTriggerRender(Math.random());
  };

  const handleRemove = async (cartItemId) => {
    await removeCartItem(cartItemId);

    setTriggerRender(Math.random());
  };

  if (loading.current) {
    return (
      <div className="item-loading">
        <LuLoader size={"3rem"} className="rotate" />
        <h2 style={{ marginLeft: "15px" }}>LOADING...</h2>
      </div>
    );
  }

  return (
    <div className="cart-view">
      {items.map(({ item, cartItem }) => (
        <div key={item.id} className="cart-item">
          <h4>{item.name}</h4>
          <div className="item-count">
            <LuChevronLeft
              size={"1.3rem"}
              onClick={() => handleIncrement(cartItem.id, -1)}
            />
            <h4>{cartItem.quantity}</h4>
            <LuChevronRight
              size={"1.3rem"}
              onClick={() => handleIncrement(cartItem.id, 1)}
            />
          </div>
          <h4>${item.price}</h4>
          <LuTrash2
            size={"1.3rem"}
            className="trash"
            onClick={() => handleRemove(cartItem.id)}
          />
        </div>
      ))}
    </div>
  );
};

export default CartView;
