import "./App.css";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import React from "react";
import Signup from "./components/signup/signup.component";
import Login from "./components/login/login.component";
import Landing from "./components/landing/landing.component";
import Account from "./components/account/account.component";
import ItemForm from "./components/item-form/item-form.component";
import ItemPage from "./components/item-page/item-page.component";
import ItemGallery from "./components/item-gallery/item-gallery.component";
import NavWrapper from "./components/nav-wrapper/nav-wrapper.component";
import CartView from "./components/cart-view/cart-view.component";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/login" element={<Login />} />
        <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/account" element={<NavWrapper child={<Account />} />} />
        <Route exact path="/cart" element={<NavWrapper child={<CartView />} />} />
        <Route exact path="/item/:id" element={<ItemPage />} />
        <Route exact path="/selling" element={<NavWrapper child={<ItemGallery />} />} />
        <Route exact path="/selling/new" element={<NavWrapper child={<ItemForm />} />} />
        <Route path="*" element={<Landing to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
