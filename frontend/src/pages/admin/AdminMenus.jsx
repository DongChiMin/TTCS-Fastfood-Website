import React, { useEffect, useState } from "react";
import axios from "axios";

const categories = ["drink", "mainCourse", "dessert", "appetizer"];

function AdminMenus() {
  const [menus, setMenus] = useState([]);
  const [editMenu, setEditMenu] = useState(null);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    price: "",
    imageBuffer: null,
    fileName: "",
    previewUrl: "", 
  });

  useEffect(() => {
    fetchMenus();
  }, []);

  const fetchMenus = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/menus");
      setMenus(response.data);
    } catch (err) {
      console.error("Error fetching menus:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      try {
        await axios.delete(`http://localhost:3001/api/menus/${id}`);
        alert("Menu deleted successfully");
        fetchMenus();
      } catch (err) {
        console.error("Error deleting menu:", err);
      }
    }
  };

  const handleEdit = (menu) => {
    setEditMenu(menu);
    setNewMenu({
      ...menu,
      previewUrl: menu.imageUrl || "",
    });
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/menus/${editMenu._id}`, {
        ...editMenu,
        price: parseFloat(editMenu.price),
      });
      alert("Menu updated successfully");
      setEditMenu(null);
      fetchMenus();
    } catch (err) {
      console.error("Error updating menu:", err);
    }
  };

  const handleChange = (e) => {
    setEditMenu({ ...editMenu, [e.target.name]: e.target.value });
  };

  const handleNewMenuChange = (e) => {
    setNewMenu({ ...newMenu, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);
    formData.append("category", newMenu.category);

    axios.post("http://localhost:3001/api/upload", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    })
      .then((response) => {
        const { fileName, category, imageBuffer } = response.data;
        setNewMenu({
          ...newMenu,
          fileName,
          category,
          imageBuffer,
          previewUrl: URL.createObjectURL(file), // Hiển thị ảnh tạm thời
        });
      })
      .catch((err) => {
        console.error("Error uploading image:", err);
      });
  };

  const handleCreateMenu = () => {
    const { name, description, price, category, fileName, imageBuffer } = newMenu;

    axios.post("http://localhost:3001/api/menus", {
      name,
      description,
      price,
      category,
      fileName,
      imageBuffer,
    })
      .then((res) => {
        alert("Menu created successfully");
        setNewMenu({
          name: "",
          description: "",
          imageUrl: "",
          category: "",
          price: "",
          imageBuffer: null,
          fileName: "",
          previewUrl: "",
        });
        fetchMenus();
      })
      .catch((err) => {
        console.error("Error creating menu:", err);
      });
  };

  return (
    <div className="container mt-5">
      <h2>Admin: Manage Menus</h2>

      <div>
        <h3>Add New Menu</h3>
        <form>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newMenu.name}
              onChange={handleNewMenuChange}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Description</label>
            <textarea
              name="description"
              value={newMenu.description}
              onChange={handleNewMenuChange}
              className="form-control"
            ></textarea>
          </div>
          <div className="mb-3">
            <label>Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="form-control"
            />
            {newMenu.previewUrl && (
              <img
                src={newMenu.previewUrl}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px", border: "1px solid #ccc" }}
              />
            )}
          </div>
          <div className="mb-3">
            <label>Category</label>
            <select
              name="category"
              value={newMenu.category}
              onChange={handleNewMenuChange}
              className="form-control"
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <label>Price</label>
            <input
              type="number"
              name="price"
              value={newMenu.price}
              onChange={handleNewMenuChange}
              className="form-control"
            />
          </div>
          <button
            type="button"
            onClick={handleCreateMenu}
            className="btn btn-primary"
          >
            Add Menu
          </button>
        </form>
      </div>

      {editMenu ? (
        <div>
          <h3>Edit Menu</h3>
          <form>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editMenu.name}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Description</label>
              <textarea
                name="description"
                value={editMenu.description}
                onChange={handleChange}
                className="form-control"
              ></textarea>
            </div>
            <div className="mb-3">
              <label>Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={editMenu.imageUrl}
                onChange={handleChange}
                className="form-control"
              />
              {editMenu.imageUrl && (
              <img
                src={`http://localhost:3001${editMenu.imageUrl}`}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px", border: "1px solid #ccc" }}
              />
            )}
            </div>
            <div className="mb-3">
              <label>Category</label>
              <select
                name="category"
                value={editMenu.category}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">-- Select Category --</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label>Price</label>
              <input
                type="number"
                name="price"
                value={editMenu.price}
                onChange={handleChange}
                className="form-control"
              />
            </div>
            <button
              type="button"
              onClick={handleSave}
              className="btn btn-success"
            >
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditMenu(null)}
              className="btn btn-secondary ms-2"
            >
              Cancel
            </button>
          </form>
        </div>
      ) : (
        <div>
          <table className="table mt-4">
            <thead>
              <tr>
                <th>Name</th>
                <th>Description</th>
                <th>Category</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {menus.map((menu) => (
                <tr key={menu._id}>
                  <td>{menu.name}</td>
                  <td>{menu.description}</td>
                  <td>{menu.category}</td>
                  <td>${menu.price ? Number(menu.price).toFixed(2) : "0.00"}</td>
                  <td>
                    <button
                      className="btn btn-primary me-2"
                      onClick={() => handleEdit(menu)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(menu._id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminMenus;
