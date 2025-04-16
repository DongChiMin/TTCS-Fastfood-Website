import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminMenus() {
  const [menus, setMenus] = useState([]);
  const [editMenu, setEditMenu] = useState(null);
  const [newMenu, setNewMenu] = useState({
    name: "",
    description: "",
    imageUrl: "",
    category: "",
    price: "",
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
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/menus/${editMenu._id}`, {
        ...editMenu,
        price: parseFloat(editMenu.price), // ✅ ép sang number
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
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
  
    const formData = new FormData();
    formData.append("image", file);
  
    try {
      const response = await axios.post("http://localhost:3001/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      // Cập nhật đường dẫn ảnh mới vào newMenu
      setNewMenu((prev) => ({
        ...prev,
        imageUrl: response.data.imageUrl, // imageUrl sẽ chứa đường dẫn tới ảnh đã upload
      }));
  
      // Hiển thị ảnh đã upload ngay lập tức
      alert("Image uploaded successfully!");
    } catch (err) {
      console.error("Error uploading image:", err.response?.data || err);
      alert("Error uploading image.");
    }
  };
  

  const handleCreate = async () => {
    try {
      console.log("Creating menu with data:", newMenu); // 👈 Thêm dòng này
  
      await axios.post("http://localhost:3001/api/menus", {
        ...newMenu,
        price: parseFloat(newMenu.price),
      });
  
      alert("Menu created successfully");
      setNewMenu({
        name: "",
        description: "",
        imageUrl: "",
        category: "",
        price: "",
      });
      console.log("🧾 Data being sent:", newMenu);
      fetchMenus();
    } catch (err) {
      console.error("Error creating menu:", err.response?.data || err);
    }
  };
  
  return (
    <div className="container mt-5">
      <h2>Admin: Manage Menus</h2>

      {/* Form to Add New Menu */}
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
          {newMenu.imageUrl && (
            <img
            src={`http://localhost:3001${newMenu.imageUrl}`}
            alt="Preview"
            style={{ width: "100px", marginTop: "10px", border: "1px solid #ccc" }}
          />
          )}
        </div>
          <div className="mb-3">
            <label>Category</label>
            <input
              type="text"
              name="category"
              value={newMenu.category}
              onChange={handleNewMenuChange}
              className="form-control"
            />
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
            onClick={handleCreate}
            className="btn btn-primary"
          >
            Add Menu
          </button>
        </form>
      </div>

      {/* Existing Menus */}
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
            </div>
            <div className="mb-3">
              <label>Category</label>
              <input
                type="text"
                name="category"
                value={editMenu.category}
                onChange={handleChange}
                className="form-control"
              />
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
                  <td>
                    ${menu.price ? Number(menu.price).toFixed(2) : "0.00"}
                  </td>
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