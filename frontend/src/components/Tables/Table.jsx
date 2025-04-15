import styles from "./Table.module.css";

//cach su dung
{
  /* <Table
  columns={["Firstname", "Lastname", "Email"]}
  data={[
    ["John", "Doe", "john@example.com"],
    ["Mary", "Moe", "mary@example.com"],
    ["July", "Dooley", "july@example.com"],
  ]}
  fontSize="14px" // 👈 Tùy chỉnh font chữ
/> */
}

function Table({ columns = [], data = [], fontSize = "20px", onAction }) {
  return (
    <div>
      <table className={styles.table} style={{ fontSize }}>
        <thead className={styles.tableDark}>
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col}</th>
            ))}
            <th>Actions</th> {/* 👈 Cột thêm nút bấm */}
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j}>{cell}</td>
              ))}
              <td>
                <button
                  className={styles.actionButton}
                  onClick={() => onAction && onAction(i)}
                >
                  Xem
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
