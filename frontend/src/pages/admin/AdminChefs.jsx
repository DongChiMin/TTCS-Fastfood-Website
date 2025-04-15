import React, { useEffect, useState } from "react";
import axios from "axios";

function AdminChefs() {
  const [chefs, setChefs] = useState([]);
  const [newChef, setNewChef] = useState({
    name: "",
    specialty: "",
    imageUrl: "",
    experience: "",
  });
  const [editChef, setEditChef] = useState(null);

  useEffect(() => {
    fetchChefs();
  }, []);

  const fetchChefs = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/chefs");
      setChefs(response.data);
    } catch (err) {
      console.error("Error fetching chefs:", err);
    }
  };

  const handleCreate = async () => {
    try {
      await axios.post("http://localhost:3001/api/chefs", newChef);
      alert("Chef created successfully");
      setNewChef({ name: "", specialty: "", imageUrl: "", experience: "" });
      fetchChefs();
    } catch (err) {
      console.error("Error creating chef:", err);
    }
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:3001/api/chefs/${editChef._id}`, editChef);
      alert("Chef updated successfully");
      setEditChef(null);
      fetchChefs();
    } catch (err) {
      console.error("Error updating chef:", err);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this chef?")) {
      try {
        await axios.delete(`http://localhost:3001/api/chefs/${id}`);
        alert("Chef deleted successfully");
        fetchChefs();
      } catch (err) {
        console.error("Error deleting chef:", err);
      }
    }
  };

  return (
    <div className="container mt-5">
      <h2>Admin: Manage Chefs</h2>

      {/* Add New Chef */}
      <div>
        <h3>Add New Chef</h3>
        <form>
          <div className="mb-3">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={newChef.name}
              onChange={(e) => setNewChef({ ...newChef, name: e.target.value })}
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Specialty</label>
            <input
              type="text"
              name="specialty"
              value={newChef.specialty}
              onChange={(e) =>
                setNewChef({ ...newChef, specialty: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Image URL</label>
            <input
              type="text"
              name="imageUrl"
              value={newChef.imageUrl}
              onChange={(e) =>
                setNewChef({ ...newChef, imageUrl: e.target.value })
              }
              className="form-control"
            />
          </div>
          <div className="mb-3">
            <label>Experience</label>
            <input
              type="number"
              name="experience"
              value={newChef.experience}
              onChange={(e) =>
                setNewChef({ ...newChef, experience: e.target.value })
              }
              className="form-control"
            />
          </div>
          <button type="button" onClick={handleCreate} className="btn btn-primary">
            Add Chef
          </button>
        </form>
      </div>

      {/* Edit Chef */}
      {editChef && (
        <div>
          <h3>Edit Chef</h3>
          <form>
            <div className="mb-3">
              <label>Name</label>
              <input
                type="text"
                name="name"
                value={editChef.name}
                onChange={(e) => setEditChef({ ...editChef, name: e.target.value })}
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Specialty</label>
              <input
                type="text"
                name="specialty"
                value={editChef.specialty}
                onChange={(e) =>
                  setEditChef({ ...editChef, specialty: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Image URL</label>
              <input
                type="text"
                name="imageUrl"
                value={editChef.imageUrl}
                onChange={(e) =>
                  setEditChef({ ...editChef, imageUrl: e.target.value })
                }
                className="form-control"
              />
            </div>
            <div className="mb-3">
              <label>Experience</label>
              <input
                type="number"
                name="experience"
                value={editChef.experience}
                onChange={(e) =>
                  setEditChef({ ...editChef, experience: e.target.value })
                }
                className="form-control"
              />
            </div>
            <button type="button" onClick={handleSave} className="btn btn-success">
              Save
            </button>
            <button
              type="button"
              onClick={() => setEditChef(null)}
              className="btn btn-secondary ms-2"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Existing Chefs */}
      <div>
        <h3>Existing Chefs</h3>
        <table className="table mt-4">
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialty</th>
              <th>Experience</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {chefs.map((chef) => (
              <tr key={chef._id}>
                <td>{chef.name}</td>
                <td>{chef.specialty}</td>
                <td>{chef.experience} years</td>
                <td>
                  <button
                    className="btn btn-primary me-2"
                    onClick={() => setEditChef(chef)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger"
                    onClick={() => handleDelete(chef._id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default AdminChefs;