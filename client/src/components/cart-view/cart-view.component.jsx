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
import { LuLoader, LuChevronLeft, LuChevronRight } from "react-icons/lu";
import { jwtDecode } from "jwt-decode";

const CartView = ({ triggerRender, setTriggerRender }) => {
  const [items, setItems] = useState([]);
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

        setItems(
          fetchedItems.sort(
            (a, b) =>
              new Date(a.cartItem.createdAt) - new Date(b.cartItem.createdAt)
          )
        );

        loading.current = false;
      };

      fetchData();
    }
  }, [triggerRender, loggedIn, navigate]);

  const handleIncrement = async (cartItem, value) => {
    if (cartItem.quantity + value === 0) {
      handleRemove(cartItem.id);
    } else {
      await incrementCartItemCount({
        cartItemId: cartItem.id,
        value: value,
      });
    }

    setTriggerRender((prev) => prev + 1);
  };

  const handleRemove = async (cartItemId) => {
    const item = document.getElementById(cartItemId);
    item.innerHTML = "";
    item.classList.add("shrink");

    setTimeout(async () => {
      await removeCartItem(cartItemId);
      setTriggerRender((prev) => prev + 1);
    }, 300);
  };

  if (loading.current) {
    return (
      <div className="item-loading">
        <LuLoader size={"3rem"} className="rotate" />
        <h2 style={{ marginLeft: "15px" }}>LOADING...</h2>
      </div>
    );
  }

  let totalCost = 0;
  let numItems = 0;

  return (
    <div className="cart-view">
      <div>
        {items.length !== 0 ? (
          items.map(({ item, cartItem }) => {
            totalCost += item.price * cartItem.quantity;
            numItems += cartItem.quantity;

            return (
              <div
                key={item.id}
                id={cartItem.id}
                className={`cart-item${
                  item.stock === 0 ? " out-of-stock" : ""
                }`}
                onClick={(e) => {
                  e.stopPropagation();
                  navigate(`/item/${item.id}`);
                }}
              >
                <img
                  src={`${process.env.REACT_APP_URI}/${item.images[0].path}`}
                  alt={item.images[0].name}
                  className="item-img"
                  style={{ cursor: "pointer", marginTop: "0" }}
                />
                <ul className="cart-list">
                  <li>
                    <li>
                      <li
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate(`/item/${item.id}`);
                        }}
                        style={{ cursor: "pointer" }}
                      >
                        <li>{item.name}</li>
                      </li>
                      <li className="stock">
                        <span className={item.stock === 0 && "font-red"}>
                          {item.stock > 0 ? "In Stock" : "Out of Stock"}
                        </span>
                      </li>
                    </li>
                    <li>{item.price === "0" ? `FREE` : `$${item.price}`}</li>
                  </li>
                  <li style={item.stock === 0 ? { textAlign: "end" } : {}}>
                    {item.stock !== 0 && (
                      <li style={{ display: "flex" }}>
                        <LuChevronLeft
                          size={"1.3rem"}
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIncrement(cartItem, -1);
                          }}
                        />
                        {cartItem.quantity}
                        <LuChevronRight
                          size={"1.3rem"}
                          style={{ cursor: "pointer" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleIncrement(cartItem, 1);
                          }}
                        />
                      </li>
                    )}

                    <li>
                      <li
                        className="font-red trash"
                        style={{ cursor: "pointer" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRemove(cartItem.id);
                        }}
                      >
                        Remove
                      </li>
                    </li>
                  </li>
                </ul>
              </div>
            );
          })
        ) : (
          <div className="cart-item">
            <ul style={{ listStyle: "none" }}>
              <li>
                <li>Your cart is empty.</li>
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="summary">
        <div>
          <span>{`Subtotal (${numItems} items): `}</span>
          <span style={{ fontWeight: "bold" }}>{`$${totalCost}`}</span>
        </div>
        <span className="checkout">Proceed to Checkout</span>
      </div>
    </div>
  );
};

export default CartView;
