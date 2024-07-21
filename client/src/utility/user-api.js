import axios from "axios";

async function login(data) {
  try {
    const res = await axios.post(`${process.env.REACT_APP_URI}/user/login`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

async function signup(data) {
  try {
    const res = await axios.post(`${process.env.REACT_APP_URI}/user/signup`, data, {
      headers: { "Content-Type": "application/json" },
    });

    return res;
  } catch (e) {
    console.error(e);
    return e;
  }
}

function isLoggedIn() {
  return localStorage.getItem("token") !== null;
}

function logout() {
  localStorage.removeItem("token");
}

function getToken() {
  return localStorage.getItem("token");
}

export { signup, login, isLoggedIn, logout, getToken };
