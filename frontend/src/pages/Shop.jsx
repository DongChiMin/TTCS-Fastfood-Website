import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import OverlayCard from "../components/OverlayCard/OverlayCard";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { Slider, Typography } from "@mui/material";

function Shop() {
  const [menus, setMenus] = useState([]);
  const [sortedMenus, setSortedMenus] = useState([]);
  const [sortOption, setSortOption] = useState("default");

  //Filter theo khoảng giá
  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const [selectedRange, setSelectedRange] = useState([0, 0]);

  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:3001/api/menus")
      .then((response) => {
        setMenus(response.data);

        const prices = response.data.map((item) => item.price);
        const min = Math.min(...prices);
        const max = Math.max(...prices);
        setPriceRange({ min, max });
        setSelectedRange([min, max]);

        setSortedMenus(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the menus!", error);
      });
  }, []);

  //Hàm xử lý sắp xếp
  const handleSortChange = (event) => {
    const option = event.target.value;
    setSortOption(option);

    let sorted = [...sortedMenus];

    switch (option) {
      case "price-asc":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "name-asc":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "name-desc":
        sorted.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        sorted = [...menus];
    }

    setSortedMenus(sorted);
  };

  return (
    <div>
      <div className="section">
        <div className="row">
          {/* Cột trái - danh sách sản phẩm */}
          <div className="col-8">
            {/* Header */}
            <Box
              sx={{
                mt: 3,
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Box sx={{ fontSize: 16, fontWeight: "bold" }}>
                Showing {menus.length} items
              </Box>

              <FormControl sx={{ width: 200 }}>
                <InputLabel id="sort-select-label">Sort By</InputLabel>
                <Select
                  labelId="sort-select-label"
                  id="sort-select"
                  value={sortOption}
                  label="Sort By"
                  onChange={handleSortChange}
                >
                  <MenuItem value="default">Default</MenuItem>
                  <MenuItem value="price-asc">Price: Low to High</MenuItem>
                  <MenuItem value="price-desc">Price: High to Low</MenuItem>
                  <MenuItem value="name-asc">Name: A to Z</MenuItem>
                  <MenuItem value="name-desc">Name: Z to A</MenuItem>
                </Select>
              </FormControl>
            </Box>

            {/* Danh sách sản phẩm */}
            <div className="row">
              {sortedMenus.map((item) => (
                <div
                  className="col-lg-4 col-md-6 col-sm-12 mb-4"
                  key={item._id}
                >
                  <Link
                    to={`/detail/${item._id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <OverlayCard
                      title={item.name}
                      description={["$ " + item.price]}
                      height="350px"
                      imageSrc={`http://localhost:3001${
                        item.imageUrl.startsWith("/uploads")
                          ? item.imageUrl
                          : "/uploads/" + item.imageUrl
                      }`}
                    />
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* Cột phải - sidebar */}
          <div className="col-lg-4 col-md-6 col-sm-12 mb-4 ps-5">
            {/* Tags */}
            <div className="mb-3">
              <h2 style={{ fontSize: "30px" }}>Tags</h2>
              <ul>
                <li>li 1</li>
                <li>li 2</li>
                <li>li 3</li>
                <li>li 4</li>
              </ul>
            </div>

            {/* Top Seller */}
            <div className="mb-3">
              <h2 style={{ fontSize: "30px" }}>Top seller</h2>
              <ul>
                <li>Sp1</li>
                <li>Sp2</li>
              </ul>
            </div>

            {/* Filter by price */}
            <div className="mb-3">
              <h2 style={{ fontSize: "30px" }}>Filter by price</h2>
              <Typography gutterBottom>
                Price from ${selectedRange[0]} to ${selectedRange[1]}
              </Typography>

              <Slider
                value={selectedRange}
                onChange={(e, newValue) => setSelectedRange(newValue)}
                valueLabelDisplay="auto"
                min={priceRange.min}
                max={priceRange.max}
                sx={{
                  color: "#b8860b", // màu chính cho track và thumb

                  "& .MuiSlider-track": {
                    border: "1px solid #b8860b",
                  },

                  "& .MuiSlider-thumb": {
                    backgroundColor: "#b8860b",
                    border: "2px solid #b8860b",

                    // Hover và focusVisible
                    "&:hover, &.Mui-focusVisible": {
                      boxShadow: "0px 0px 0px 8px rgba(184, 134, 11, 0.16)", // đổi sang rgba của #b8860b
                    },
                  },

                  "& .MuiSlider-rail": {
                    backgroundColor: "#f5f5dc",
                  },
                }}
              />

              <div className="d-flex mt-2" style={{ gap: "10px" }}>
                <button
                  onClick={() => {
                    setSelectedRange([priceRange.min, priceRange.max]);
                    setSortedMenus(menus); // reset về danh sách gốc
                  }}
                >
                  Reset
                </button>

                <button
                  onClick={() => {
                    const filtered = menus.filter(
                      (item) =>
                        item.price >= selectedRange[0] &&
                        item.price <= selectedRange[1]
                    );
                    setSortedMenus(filtered);
                  }}
                >
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Shop;
