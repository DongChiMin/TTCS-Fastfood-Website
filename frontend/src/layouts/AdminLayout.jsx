import React from "react";
import { Link } from "react-router-dom";

function AdminLayout({ children }) {
  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <aside
        style={{
          width: "250px",
          background: "#343a40",
          color: "#fff",
          padding: "20px",
        }}
      >
        <h2>Admin Panel</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/admin" style={{ color: "#fff", textDecoration: "none" }}>
              Dashboard
            </Link>
          </li>
          <li style={{ marginBottom: "10px" }}>
            <Link
              to="/admin/menus"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Manage Menus
            </Link>
          </li>
          <li>
            <Link
              to="/admin/chefs"
              style={{ color: "#fff", textDecoration: "none" }}
            >
              Manage Chefs
            </Link>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <main style={{ flex: 1, padding: "20px", background: "#f8f9fa" }}>
        {children} {/* Render the children passed into AdminLayout */}
      </main>
    </div>
  );
}

export default AdminLayout;
