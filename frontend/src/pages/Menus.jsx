import React, { useEffect, useState } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Link } from "react-router-dom";

import OverlayCard from "../components/OverlayCard/OverlayCard";
import PageHeader from "../components/PageHeader/PageHeader";

import img1 from "../assets/images/menus/menu-slider-1.jpg"; // Hình ảnh mặc định cho OverlayCard

function Menus() {
  const [menus, setMenus] = useState([]);

  useEffect(() => {
    // Gửi yêu cầu GET đến API backend để lấy danh sách menus
    axios
      .get("http://localhost:3001/api/menus")
      .then((response) => {
        setMenus(response.data); // Lưu dữ liệu nhận được vào state
        console.log(response.data); // In ra dữ liệu để kiểm tra
      })
      .catch((error) => {
        console.error("There was an error fetching the menus!", error);
      });
  }, []);

  // MUI
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
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
          <h2>Some Trendy And Popular Courses Offered</h2>
        </div>
        <Box sx={{ width: "100%" }}>
          <Box
            sx={{ borderBottom: 1, borderColor: "divider" }}
            className="d-flex justify-content-center align-items-center"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="basic tabs example"
            >
              <Tab
                label="Appertizer"
                {...a11yProps(0)}
                style={{ fontSize: "20px" }}
              />
              <Tab
                label="Main Courses"
                {...a11yProps(1)}
                style={{ fontSize: "20px" }}
              />
              <Tab
                label="Dessert"
                {...a11yProps(2)}
                style={{ fontSize: "20px" }}
              />
              <Tab
                label="Drinks"
                {...a11yProps(3)}
                style={{ fontSize: "20px" }}
              />
            </Tabs>
          </Box>
          <CustomTabPanel value={value} index={0}>
            <div className="row">
              {menus
                .filter((item) => item.category === "appetizer")
                .map((item, index) => (
                  <div className="col-3 mb-4" key={index}>
                    <Link to={`/detail/${item._id}`}>
                      <OverlayCard
                        title={item.title}
                        description={["$ " + item.price]}
                        height="450px"
                        imageSrc={`http://localhost:3001/uploads/${item.imageUrl}`} // dùng imageUrl
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={1}>
            <div className="row">
              {menus
                .filter((item) => item.category === "mainCourse")
                .map((item, index) => (
                  <div className="col-3 mb-4" key={index}>
                    <Link to={`/detail/${item._id}`}>
                      <OverlayCard
                        title={item.title}
                        description={[item.description]}
                        height="450px"
                        imageSrc={`http://localhost:3001/uploads/${item.imageUrl}`} // dùng imageUrl
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={2}>
            <div className="row">
              {menus
                .filter((item) => item.category === "dessert")
                .map((item, index) => (
                  <div className="col-3 mb-4" key={index}>
                    <Link to={`/detail/${item._id}`}>
                      <OverlayCard
                        title={item.title}
                        description={[item.description]}
                        height="450px"
                        imageSrc={`http://localhost:3001/uploads/${item.imageUrl}`} // dùng imageUrl
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </CustomTabPanel>
          <CustomTabPanel value={value} index={3}>
            <div className="row">
              {menus
                .filter((item) => item.category === "drink")
                .map((item, index) => (
                  <div className="col-3 mb-4" key={index}>
                    <Link to={`/detail/${item._id}`}>
                      <OverlayCard
                        title={item.title}
                        description={[item.description]}
                        height="450px"
                        imageSrc={`http://localhost:3001/uploads/${item.imageUrl}`} // dùng imageUrl
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </CustomTabPanel>
        </Box>
      </div>
    </div>
  );
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
