import React from "react";

const QuantitySelector = ({ quantity, setQuantity }) => {
  const increase = () => setQuantity((prev) => prev + 1);
  const decrease = () => setQuantity((prev) => Math.max(1, prev - 1)); // không cho nhỏ hơn 1

  return (
    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
      <button
        onClick={decrease}
        style={{ fontSize: "25px", padding: "0px 10px", paddingLeft: "20px" }}
      >
        -
      </button>
      <span
        style={{
          fontSize: "35px",
          width: "50px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {quantity}
      </span>
      <button
        onClick={increase}
        style={{ fontSize: "25px", padding: "0px 10px", paddingLeft: "20px" }}
      >
        +
      </button>
    </div>
  );
};

export default QuantitySelector;
