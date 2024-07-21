import axios from "axios";

async function getItem(id) {
  try {
    const res = await axios.get(`${process.env.REACT_APP_URI}/item/${id}`, {
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
    const res = await axios.get(`${process.env.REACT_APP_URI}/item/range`, {
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
    const res = await axios.get(`${process.env.REACT_APP_URI}/item/all`, {
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
    const res = await axios.post(`${process.env.REACT_APP_URI}/item/create`, data, {
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
    const res = await axios.delete(`${process.env.REACT_APP_URI}/item/delete/${id}`, {
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
    const res = await axios.post(`${process.env.REACT_APP_URI}/item/addCartItem`, data, {
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
    const res = await axios.get(`${process.env.REACT_APP_URI}/item/cart`, {
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
    const res = await axios.get(`${process.env.REACT_APP_URI}/item/cartCount`, {
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
    const res = await axios.patch(`${process.env.REACT_APP_URI}/item/incrementCartItemCount`, data, {
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
    const res = await axios.delete(`${process.env.REACT_APP_URI}/item/removeCartItem/${id}`, {
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
