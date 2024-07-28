const express = require("express");
const itemRoute = express.Router();
const multer = require("multer");
const {
  createItem,
  getItem,
  getRangeOfItems,
  getItems,
  getCartItems,
  deleteItem,
  addCartItem,
  getCartItemCount,
  incrementCartItemCount,
  removeCartItem,
} = require("../controller/itemController");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/mnt/data/images");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

itemRoute.get("/range", getRangeOfItems);
itemRoute.get("/all", getItems);
itemRoute.get("/cart", getCartItems);
itemRoute.get("/cartCount", getCartItemCount);
itemRoute.get("/:id", getItem);
itemRoute.post("/create", upload.array("images"), createItem);
itemRoute.post("/addCartItem", addCartItem);
itemRoute.delete("/delete/:id", deleteItem);
itemRoute.delete("/removeCartItem/:id", removeCartItem);
itemRoute.patch("/incrementCartItemCount", incrementCartItemCount);

module.exports = itemRoute;
