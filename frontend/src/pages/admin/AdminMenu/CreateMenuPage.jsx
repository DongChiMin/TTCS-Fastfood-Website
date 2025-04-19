import React, { useState } from "react";
import axios from "axios";
import styles from "../../../components/Forms/Reservation.module.css";
import { useNavigate } from "react-router-dom";

export const CreateMenusPage = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [tempFilename, setTempFilename] = useState("");
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const res = await axios.post(
        "http://localhost:3001/api/upload-temp",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      setTempFilename(res.data.tempFilename);
    } catch (err) {
      console.error("Error uploading image:", err);
      alert("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !price || !category || !description || !tempFilename) {
      alert("Please fill in all fields and upload an image.");
      return;
    }

    if (isNaN(price) || Number(price) <= 0) {
      alert("Please enter a valid price.");
      return;
    }

    const productData = {
      name,
      price,
      category,
      description,
      tempFilename,
    };

    try {
      const response = await axios.post(
        "http://localhost:3001/api/menus",
        productData
      );
      console.log("Product created successfully:", response.data);
      alert("Product created successfully");
      navigate("/admin/menus");

      // Reset form
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setImage(null);
      setTempFilename("");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Error creating product");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      handleImageUpload(file);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Create New Product</h3>
      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className="row">
          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <input
                name="name"
                type="text"
                id="name"
                placeholder="Product Name*"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className={styles.input}
              />
            </fieldset>
          </div>

          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <input
                name="price"
                type="number"
                id="price"
                placeholder="Product Price*"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className={styles.input}
              />
            </fieldset>
          </div>

          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <select
                name="category"
                id="category"
                className={styles.select}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                required
              >
                <option value="">Select Category*</option>
                <option value="drink">Drink</option>
                <option value="dessert">Dessert</option>
                <option value="appetizer">Appetizer</option>
                <option value="mainCourse">Main Course</option>
              </select>
            </fieldset>
          </div>

          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <input
                type="file"
                name="image"
                id="image"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.input}
              />
              {uploading && (
                <small className="text-warning">Uploading image...</small>
              )}
              {tempFilename && !uploading && (
                <small className="text-success">
                  Image uploaded temporarily
                </small>
              )}
            </fieldset>
          </div>

          <div className="col-lg-12">
            <fieldset>
              <textarea
                name="description"
                rows="4"
                id="description"
                placeholder="Product Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
              ></textarea>
            </fieldset>
          </div>

          <div className="col-lg-12 text-center">
            <fieldset>
              <button
                type="submit"
                className={styles.button}
                disabled={uploading}
              >
                {uploading ? "Please wait..." : "Create Product"}
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};
