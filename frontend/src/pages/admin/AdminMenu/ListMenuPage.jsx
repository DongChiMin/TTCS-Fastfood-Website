import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Table from "../../../components/Table";
import SelectFilter from "../../../components/SelectFilter/SelectFilter";

export const ListMenuPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data from the backend with filter applied
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3001/api/menus", {
        params: { filter },
      });
      console.log("Fetched data:", response.data);
      setData(response.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Call fetchData on component mount and when filter changes
  useEffect(() => {
    fetchData();
  }, [filter]);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this menu?")) {
      try {
        await axios.delete(`http://localhost:3001/api/menus/${id}`);
        alert("Menu deleted successfully");
        fetchData(); // Refresh data after delete
      } catch (error) {
        console.error("Error deleting menu:", error);
        alert("Error deleting menu");
      }
    }
  };

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Price ($)", accessor: "price" },
    { header: "Description", accessor: "description" },
    { header: "Category", accessor: "category" },
  ];

  const actions = [
    {
      label: "Edit",
      onClick: (item) => navigate(`/admin/menus/${item._id}/edit`),
    },
    {
      label: "Delete",
      onClick: (item) => handleDelete(item._id),
    },
  ];

  const filterOptions = [
    { value: "drink", label: "Drink" },
    { value: "dessert", label: "Dessert" },
    { value: "appetizer", label: "Appetizer" },
    { value: "mainCourse", label: "Main Dish" },
  ];

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Menu List</h3>
        <Link to="/admin/menus/create" className="btn btn-primary">
          + Create New Product
        </Link>
      </div>

      <div className="mb-3">
        <label className="form-label">Filter by Category:</label>
        <SelectFilter
          options={filterOptions}
          onChange={(e) => setFilter(e.target.value)}
          value={filter}
        />
      </div>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : (
        <Table columns={columns} data={data} actions={actions} />
      )}
    </div>
  );
};
