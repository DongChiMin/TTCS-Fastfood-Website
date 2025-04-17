import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";
import OverlayCard from "../components/OverlayCard/OverlayCard";
import PageHeader from "../components/PageHeader/PageHeader";
import img1 from "../assets/images/menus/menu-slider-1.jpg";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function Menus() {
  const [menus, setMenus] = useState([]);
  const [sortOption, setSortOption] = useState("default");
  const [value, setValue] = React.useState(0);

  //Chạy khi component được mount
  useEffect(() => {
    window.scrollTo(0, 0);
    axios
      .get("http://localhost:3001/api/menus")
      .then((response) => {
        setMenus(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the menus!", error);
      });
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleSortChange = (event) => {
    setSortOption(event.target.value);
  };

  const sortMenus = (items) => {
    switch (sortOption) {
      case "price-asc":
        return [...items].sort((a, b) => a.price - b.price);
      case "price-desc":
        return [...items].sort((a, b) => b.price - a.price);
      case "name-asc":
        return [...items].sort((a, b) => a.name.localeCompare(b.name));
      case "name-desc":
        return [...items].sort((a, b) => b.name.localeCompare(a.name));
      default:
        return items;
    }
  };

  const renderTabContent = (category) => {
    //filter các item theo thể loại
    const filteredItems = menus.filter((item) => {
      switch (category) {
        case 0:
          return item.category === "appetizer";
        case 1:
          return item.category === "mainCourse";
        case 2:
          return item.category === "dessert";
        case 3:
          return item.category === "drink";
        default:
          return false;
      }
    });

    //sắp xếp các item đã filter theo loại sort đã chọn
    const sortedItems = sortMenus(filteredItems);

    return (
      <div className="row">
        {sortedItems.map((item, index) => (
          <div className="col-3 mb-4" key={index}>
            <Link to={`/detail/${item._id}`}>
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
    );
  };

  return (
    <div>
      <PageHeader
        backgroundType={"image"}
        backgroundSrc={img1}
        h2Title={""}
        title={"Menus"}
        subTitle={"Welcome to our delicious corner"}
        height="65vh"
      />
      <div className="section">
        <div className="text-center mb-5">
          <h6>Our Offered Menu</h6>
          <h2 style={{ fontSize: "45px", padding: "0px 65px" }}>
            Trendy And Popular Courses Offered
          </h2>
        </div>

        <Box sx={{ width: "100%" }}>
          <Box
            sx={{
              borderBottom: 1,
              borderColor: "divider",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Tabs - nằm bên trái */}
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Appetizer"
                {...a11yProps(0)}
                style={{ fontSize: "16px" }}
              />
              <Tab
                label="Main Courses"
                {...a11yProps(1)}
                style={{ fontSize: "16px" }}
              />
              <Tab
                label="Dessert"
                {...a11yProps(2)}
                style={{ fontSize: "16px" }}
              />
              <Tab
                label="Drinks"
                {...a11yProps(3)}
                style={{ fontSize: "16px" }}
              />
            </Tabs>

            {/* Sort Dropdown - nằm bên phải */}
            <FormControl sx={{ width: 200, marginBottom: "8px" }}>
              <InputLabel id="sort-select-label">Sort By</InputLabel>
              <Select
                labelId="sort-select-label"
                id="sort-select"
                value={sortOption}
                label="Sort By"
                onChange={handleSortChange}
                size="small"
              >
                <MenuItem value="default">Default</MenuItem>
                <MenuItem value="price-asc">Price: Low to High</MenuItem>
                <MenuItem value="price-desc">Price: High to Low</MenuItem>
                <MenuItem value="name-asc">Name: A to Z</MenuItem>
                <MenuItem value="name-desc">Name: Z to A</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Tab Panels */}
          <CustomTabPanel value={value} index={0}>
            {renderTabContent(0)}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            {renderTabContent(1)}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            {renderTabContent(2)}
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            {renderTabContent(3)}
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );

  // return (
  //   <div>
  //     <PageHeader
  //       backgroundType={"image"}
  //       backgroundSrc={img1}
  //       h2Title={""}
  //       title={"Menus"}
  //       subTitle={"Welcome to our delicious corner"}
  //       height="65vh"
  //     />
  //     <div className="section">
  //       <div className="text-center mb-5">
  //         <h6>Our Offered Menu</h6>
  //         <h2 style={{ fontSize: "45px", padding: "0px 65px" }}>
  //           Trendy And Popular Courses Offered
  //         </h2>
  //       </div>
  //       <Box sx={{ width: "100%" }}>
  //         <Box
  //           sx={{ borderBottom: 1, borderColor: "divider" }}
  //           className="d-flex justify-content-center align-items-center"
  //         >
  //           <Tabs
  //             value={value}
  //             onChange={handleChange}
  //             aria-label="basic tabs example"
  //           >
  //             <Tab
  //               label="Appertizer"
  //               {...a11yProps(0)}
  //               style={{ fontSize: "16px" }}
  //             />
  //             <Tab
  //               label="Main Courses"
  //               {...a11yProps(1)}
  //               style={{ fontSize: "16px" }}
  //             />
  //             <Tab
  //               label="Dessert"
  //               {...a11yProps(2)}
  //               style={{ fontSize: "16px" }}
  //             />
  //             <Tab
  //               label="Drinks"
  //               {...a11yProps(3)}
  //               style={{ fontSize: "16px" }}
  //             />
  //           </Tabs>
  //         </Box>
  //         <CustomTabPanel value={value} index={0}>
  //           <div className="row">
  //             {menus
  //               .filter((item) => item.category === "appetizer")
  //               .map((item, index) => (
  //                 <div className="col-3 mb-4" key={index}>
  //                   <Link to={`/detail/${item._id}`}>
  //                     <OverlayCard
  //                       title={item.name}
  //                       description={["$ " + item.price]}
  //                       height="350px"
  //                       imageSrc={`http://localhost:3001${
  //                         item.imageUrl.startsWith("/uploads")
  //                           ? item.imageUrl
  //                           : "/uploads/" + item.imageUrl
  //                       }`}
  //                     />
  //                   </Link>
  //                 </div>
  //               ))}
  //           </div>
  //         </CustomTabPanel>
  //         <CustomTabPanel value={value} index={1}>
  //           <div className="row">
  //             {menus
  //               .filter((item) => item.category === "mainCourse")
  //               .map((item, index) => (
  //                 <div className="col-3 mb-4" key={index}>
  //                   <Link to={`/detail/${item._id}`}>
  //                     <OverlayCard
  //                       title={item.name}
  //                       description={[item.description]}
  //                       height="450px"
  //                       imageSrc={`http://localhost:3001${
  //                         item.imageUrl.startsWith("/uploads")
  //                           ? item.imageUrl
  //                           : "/uploads/" + item.imageUrl
  //                       }`}
  //                     />
  //                   </Link>
  //                 </div>
  //               ))}
  //           </div>
  //         </CustomTabPanel>
  //         <CustomTabPanel value={value} index={2}>
  //           <div className="row">
  //             {menus
  //               .filter((item) => item.category === "dessert")
  //               .map((item, index) => (
  //                 <div className="col-3 mb-4" key={index}>
  //                   <Link to={`/detail/${item._id}`}>
  //                     <OverlayCard
  //                       title={item.name}
  //                       description={[item.description]}
  //                       height="450px"
  //                       imageSrc={`http://localhost:3001${
  //                         item.imageUrl.startsWith("/uploads")
  //                           ? item.imageUrl
  //                           : "/uploads/" + item.imageUrl
  //                       }`}
  //                     />
  //                   </Link>
  //                 </div>
  //               ))}
  //           </div>
  //         </CustomTabPanel>
  //         <CustomTabPanel value={value} index={3}>
  //           <div className="row">
  //             {menus
  //               .filter((item) => item.category === "drink")
  //               .map((item, index) => (
  //                 <div className="col-3 mb-4" key={index}>
  //                   <Link to={`/detail/${item._id}`}>
  //                     <OverlayCard
  //                       title={item.name}
  //                       description={[item.description]}
  //                       height="450px"
  //                       imageSrc={`http://localhost:3001${
  //                         item.imageUrl.startsWith("/uploads")
  //                           ? item.imageUrl
  //                           : "/uploads/" + item.imageUrl
  //                       }`}
  //                     />
  //                   </Link>
  //                 </div>
  //               ))}
  //           </div>
  //         </CustomTabPanel>
  //       </Box>
  //     </div>
  //   </div>
  // );
}

export default Menus;

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
