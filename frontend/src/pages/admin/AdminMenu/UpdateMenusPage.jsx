import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import styles from "../../../components/Forms/Reservation.module.css";
import ImageBox from "../../../components/Box/ImageBox";
import { useNavigate } from "react-router-dom";

export const UpdateMenusPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    description: "",
    imageUrl: "",
  });

  const [newImage, setNewImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  // Load existing product
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await axios.get(`http://localhost:3001/api/menus/${id}`);
        setFormData(res.data);
      } catch (err) {
        setMessage("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setNewImage(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let updatedData = { ...formData };

      // Chuyển category sang chuẩn backend trước khi gửi
      const categoryMap = {
        Appetizer: "appetizer",
        "Main Dish": "mainCourse",
        Drink: "drink",
        Dessert: "dessert",
      };
      updatedData.category = categoryMap[updatedData.category];

      // Nếu có ảnh mới, upload ảnh tạm thời
      if (newImage) {
        const formDataImage = new FormData();
        formDataImage.append("image", newImage);

        const imgRes = await axios.post(
          "http://localhost:3001/api/upload-temp",
          formDataImage
        );

        updatedData.tempFilename = imgRes.data.tempFilename;
        updatedData.imageUrl = imgRes.data.imageUrl;
      }

      console.log("Category before update:", updatedData.category);

      // Đảm bảo giá là số
      updatedData.price = parseFloat(updatedData.price);

      console.log("Updated Data:", updatedData);

      const response = await axios.put(
        `http://localhost:3001/api/menus/${id}`,
        updatedData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Response:", response.data);
      setMessage("Product updated successfully!");
      navigate("/admin/menus");
    } catch (err) {
      console.error("Error:", err.response?.data || err.message);
      setMessage("Update failed.");
    }
  };

  if (loading) return <div className="text-center mt-5">Loading...</div>;

  return (
    <div className="container mt-4">
      <h3 className="text-center mb-4">Update Product</h3>
      {message && <p className="text-center text-info">{message}</p>}

      <form className={styles.formContainer} onSubmit={handleSubmit}>
        <div className="row">
          {/* Name */}
          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <input
                name="name"
                type="text"
                value={formData.name}
                onChange={handleChange}
                placeholder="Product Name*"
                required
                className={styles.input}
              />
            </fieldset>
          </div>

          {/* Price */}
          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <input
                name="price"
                type="number"
                value={formData.price}
                onChange={handleChange}
                placeholder="Product Price*"
                required
                className={styles.input}
              />
            </fieldset>
          </div>

          {/* Category */}
          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className={styles.select}
                required
              >
                <option value="">Select Category*</option>
                <option value="Drink">Drink</option>
                <option value="Dessert">Dessert</option>
                <option value="Appetizer">Appetizer</option>
                <option value="Main Dish">Main Dish</option>
              </select>
            </fieldset>
          </div>

          {/* Image */}
          <div className="col-lg-6 col-sm-12">
            <fieldset>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                accept="image/*"
                className={styles.input}
              />
              {formData.imageUrl && (
                <div className="mt-3">
                  <ImageBox src={`http://localhost:3001${formData.imageUrl}`} />
                </div>
              )}
            </fieldset>
          </div>

          {/* Description */}
          <div className="col-lg-12">
            <fieldset>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                placeholder="Product Description"
                className={styles.textarea}
              ></textarea>
            </fieldset>
          </div>

          {/* Submit */}
          <div className="col-lg-12 text-center">
            <fieldset>
              <button type="submit" className={styles.button}>
                Update Product
              </button>
            </fieldset>
          </div>
        </div>
      </form>
    </div>
  );
};
