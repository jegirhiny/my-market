import axios from "axios";

async function getItem(id) {
  try {
    const res = await axios.get(`/item/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getRangeOfItems(searchTerm, skip, take) {
  try {
    const res = await axios.get("/item/range", {
      params: { searchTerm, skip, take },
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getItems(token) {
  try {
    const res = await axios.get("/item/all", {
      params: { token },
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function createItem(data) {
  try {
    const res = await axios.post("/item/create", data, {
      headers: { "Content-Type": "multipart/form-data" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function deleteItem(id) {
  try {
    const res = await axios.delete(`/item/delete/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function addCartItem(data) {
  try {
    const res = await axios.post("/item/addCartItem", data, {
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getCartItems(token) {
  try {
    const res = await axios.get("/item/cart", {
      params: { token },
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function getCartItemCount(token) {
  try {
    const res = await axios.get("/item/cartCount", {
      params: { token },
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function incrementCartItemCount(data) {
  try {
    const res = await axios.patch("/item/incrementCartItemCount", data, {
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function removeCartItem(id) {
  try {
    const res = await axios.delete(`/item/removeCartItem/${id}`, {
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

export {
  getItem,
  getRangeOfItems,
  getItems,
  getCartItems,
  createItem,
  deleteItem,
  addCartItem,
  getCartItemCount,
  incrementCartItemCount,
  removeCartItem
};
