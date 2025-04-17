import React from "react";

// Ví dụ sử dụng
// const data = [
//     { _id: "1", name: "Burger", price: 5 },
//     { _id: "2", name: "Pizza", price: 8 },
//   ];

//   const columns = [
//     { header: "Name", accessor: "name" },
//     { header: "Price ($)", accessor: "price" },
//   ];

//   const actions = [
//     {
//       label: "Edit",
//       onClick: (item) => console.log("Edit", item),
//     },
//     {
//       label: "Delete",
//       onClick: (item) => console.log("Delete", item),
//     },
//   ];

//   <Table columns={columns} data={data} actions={actions} />

const Table = ({ columns = [], data = [], actions = [] }) => {
  return (
    <table className="table table-striped table-bordered">
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.accessor} style={{ fontSize: "15px" }}>
              {col.header}
            </th>
          ))}
          {actions.length > 0 && <th style={{ fontSize: "15px" }}>Actions</th>}
        </tr>
      </thead>
      <tbody>
        {data.length > 0 ? (
          data.map((row, rowIndex) => (
            <tr key={row._id || rowIndex}>
              {columns.map((col) => (
                <td key={col.accessor} style={{ fontSize: "15px" }}>
                  {typeof col.cell === "function"
                    ? col.cell(row[col.accessor], row)
                    : row[col.accessor]}
                </td>
              ))}
              {actions.length > 0 && ( // Chỉ hiển thị cột hành động nếu có actions
                <td>
                  {actions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => action.onClick(row)}
                      style={{ marginRight: "5px" }}
                    >
                      {action.label}
                    </button>
                  ))}
                </td>
              )}
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan={columns.length + (actions ? 1 : 0)}>
              No data available
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
