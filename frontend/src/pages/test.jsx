import axios from "axios";
import { useState, useEffect } from "react";
import Table1 from "../components/Table";

function Test() {
  const data = [
    { _id: "1", name: "Burger", price: 5 },
    { _id: "2", name: "Pizza", price: 8 },
  ];

  const columns = [
    { header: "Name", accessor: "name" },
    { header: "Price ($)", accessor: "price" },
  ];

  const actions = [
    {
      label: "Edit",
      onClick: (item) => console.log("Edit", item),
    },
    {
      label: "Delete",
      onClick: (item) => console.log("Delete", item),
    },
  ];

  return (
    <>
      <Table1 data={data} actions={actions} columns={columns} />
    </>
  );
}

export default Test;
