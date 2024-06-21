import "./item-form.styles.css";
import { createItem } from "../../utility/item-api";
import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getToken, isLoggedIn } from "../../utility/user-api";
import { jwtDecode } from "jwt-decode";
import ImageCarousel from "../image-carousel/image-carousel.component";

const ItemForm = () => {
  const loggedIn = isLoggedIn();
  const navigate = useNavigate();
  const [status, setStatus] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    images: [],
    price: 0,
    stock: 1,
    description: "",
  });
  const [previewImages, setPreviewImages] = useState([]);
  const imagesRef = useRef(null);

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      formData.token = jwtDecode(getToken());
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.price === "") {
      formData.price = "0";
    }

    if (formData.description === "") {
      formData.description = "No description.";
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("stock", formData.stock);
    data.append("description", formData.description);
    data.append("userId", jwtDecode(getToken()).id);

    formData.images.forEach((image) => {
      data.append("images", image, image.name);
    });

    const res = await createItem(data);
    console.log(res.status || res.response.status || res);

    e.target.reset();
    setPreviewImages([]);
    navigate("/selling");

    switch (res.status || res.response.status) {
      case 201:
        return setStatus("Listing created.");
      default:
        return setStatus("Listing not created.");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleDropdown = () => {
    const div = document.getElementById("form-dropdown");

    if (div.style.display === "none") {
      div.style.display = "initial";
    } else {
      div.style.display = "none";
    }
  };

  const handleimages = (e) => {
    const files = e.target.files;
    setFormData({ ...formData, images: Array.from(files) });
    setPreviewImages(
      Array.from(files).map((file) => URL.createObjectURL(file))
    );
  };

  const removeItem = (index) => {
    const remaining = Array.from(formData.images);
    remaining.splice(index, 1);

    previewImages.splice(index);

    setFormData({ ...formData, images: remaining });
    setPreviewImages(
      Array.from(remaining).map((file) => URL.createObjectURL(file))
    );

    if (remaining.length === 0) {
      imagesRef.current.value = "";
    }
  };

  return (
    <div className="item-foreground">
      <div style={{ outline: "2px solid" }}>
        {status ? (
          <h4 className="form-status">{status}</h4>
        ) : (
          <h4 className="form-status" style={{ visibility: "hidden" }}>
            {status}
          </h4>
        )}
        <form method="POST" onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            name="name"
            onChange={handleChange}
            placeholder="Name"
            className="form-field"
            required
          />
          <input
            type="text"
            name="price"
            pattern="[0-9]+([.][0-9]+)?"
            onChange={handleChange}
            placeholder="Price"
            className="form-field"
          />
          <input
            type="text"
            name="description"
            onChange={handleChange}
            placeholder="Description"
            className="form-field"
          />
          <input
            type="file"
            name="images"
            accept="image/png, image/jpeg"
            onChange={handleimages}
            ref={imagesRef}
            multiple
            required
          />
          {previewImages.length !== 0 && (
            <ImageCarousel images={previewImages} removeItem={removeItem} />
          )}
          <input type="submit" value="Create Listing" className="form-submit" />
          <div className="form-options">
            <h5 className="form-options-title" onClick={handleDropdown}>
              Additional Options{" "}
            </h5>
            <input
              id="form-dropdown"
              type="number"
              name="stock"
              onChange={handleChange}
              placeholder="Stock"
              className="form-field"
              style={{ display: "none", margin: "20px 0" }}
              min={1}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default ItemForm;
