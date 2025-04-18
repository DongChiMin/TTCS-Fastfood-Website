import React, { useEffect, useState } from "react";
import axios from "axios";

//MUI
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { TextField } from "@mui/material";

function AdminReservation() {
  //MUI
  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      {/* Modal xem thông tin chi tiết của bàn gồm danh sách các đơn đã được đặt ở bàn đó theo ngày */}
      <div class="modal  fade" id="tableDetail">
        <div class="modal-dialog modal-lg">
          <div class="modal-content">
            {/* <!-- Modal Header --> */}
            <div class="modal-header">
              <h4 class="modal-title" style={{ fontSize: "30px" }}>
                Table 1 Detail
              </h4>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
              ></button>
            </div>

            {/* <!-- Modal body --> */}
            <div class="modal-body">
              <p>Table number: 5</p>
              <p>Area: Indoor Area A</p>
              <p>Sức chứa: 4</p>
              <p>Status: Working/Bảo trì</p>
              {/* Bảng chứa danh sách các đơn đã đặt tại bàn này theo ngày */}
              {/* Tính năng chưa làm: Sắp xếp đơn theo thời gian tăng dần */}
              <div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <TextField
                    id="date"
                    label="Choose date"
                    type="date"
                    size="small"
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                  <button>Add new reservation</button>
                </div>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Time</th>
                      <th>Customer</th>
                      <th>Email</th>
                      <th>Number of People</th>
                      <th>Status</th>
                      <th>Confirm</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        time: "18:00",
                        customer: "John Doe",
                        email: "john@example.com",
                        people: 3,
                        status: "Pending",
                      },
                      {
                        time: "19:30",
                        customer: "Mary Moe",
                        email: "mary@example.com",
                        people: 2,
                        status: "Confirmed",
                      },
                      {
                        time: "20:15",
                        customer: "July Dooley",
                        email: "july@example.com",
                        people: 4,
                        status: "Confirmed",
                      },
                    ].map((order, index) => (
                      <tr key={index}>
                        <td>
                          <button
                            className="btn btn-sm btn-outline-danger me-2"
                            title="Cancel"
                            style={{
                              padding: "0.25rem 0.5rem",
                              fontSize: "0.8rem",
                            }}
                          >
                            <i className="fa fa-times"></i>
                          </button>
                          <button className="btn btn-sm btn-primary">
                            Edit
                          </button>
                        </td>
                        <td>{order.time}</td>
                        <td>{order.customer}</td>
                        <td>{order.email}</td>
                        <td>{order.people}</td>
                        <td>{order.status}</td>
                        <td>
                          {/* Sau khi bấm confirm thì nút này chuyển thành cancel.  */}
                          {/* Chưa làm tính năng: Hiện bảng xác nhận khi bấm nút window.notify... */}
                          <button
                            style={{
                              backgroundColor: "darkgreen",
                              color: "white",
                              border: "transparent",
                            }}
                          >
                            Confirm
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* <!-- Modal footer --> */}
            <div
              class="modal-footer"
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <button className="btn-select">Delete table</button>
              <button type="button" data-bs-dismiss="modal">
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Giao diện start */}
      <div className="section">
        {/* Thông tin về các bàn trong ngày đã chọn: có thể làm thống kê  */}
        <div>
          <div className="row">
            <div className="col-6">
              <p>Total table: 50</p>
              <p>Total table registered: 20</p>
              <p>Total table empty:5</p>
            </div>
            <div className="col-6">
              <div className="d-flex " style={{ gap: "20px" }}>
                {/* Thêm bàn mới */}
                <button>Add new table</button>

                {/* Hiển thị danh sách các yêu cầu đặt bàn chưa được xác nhận */}
                <button>Unconfirmed orders</button>
              </div>
            </div>
          </div>
        </div>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={value}>
            <Box
              sx={{
                borderBottom: 1,
                borderColor: "divider",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <TabList
                onChange={handleChange}
                aria-label="lab API tabs example"
              >
                <Tab label="Indoor Area A" value="1" />
                <Tab label="Indoor Area B" value="2" />
                <Tab label="Outdoor Area A" value="3" />
              </TabList>
              <TextField
                id="date"
                label="Choose date"
                type="date"
                size="small"
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Box>
            {/* Detail các bàn: Sửa, xóa thông tin bàn. Xem, sửa, xóa thông tin đặt bàn */}
            {/* Nếu trong detail có các đơn đặt bàn chưa được xác nhận, thì card sẽ được highlight */}
            <TabPanel value="1">
              {" "}
              <div className="row">
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">Table 1</p>
                      <p>
                        Nếu có đơn đặt bàn của bàn này chưa được xác nhận thì
                        highlight card này
                      </p>
                      <button
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#tableDetail"
                      >
                        Detail
                      </button>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">Table 2</p>
                      <button>Detail</button>
                    </div>
                  </div>
                </div>
                <div className="col-4">
                  <div className="card">
                    <div className="card-body">
                      <p className="card-title">Table 3</p>
                      <button>Detail</button>
                    </div>
                  </div>
                </div>
              </div>
            </TabPanel>
            <TabPanel value="2">Item Two</TabPanel>
            <TabPanel value="3">Item Three</TabPanel>
          </TabContext>
        </Box>
      </div>
    </>
  );
}

export default AdminReservation;
