import React from "react";
import ImageBox from "./Box/ImageBox"; // Giả sử bạn có một component ImageBox để hiển thị hình ảnh

const CartItem = ({ item, onIncrease, onDecrease, onDelete }) => {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <div>
          <ImageBox
            height="200px"
            width="100%"
            src={`http://localhost:3001/uploads/${item.imageUrl}`}
            alt="menu"
          />
        </div>
        <h5
          className="card-title"
          style={{ fontSize: "30px", marginTop: "10px" }}
        >
          {item.title}
        </h5>
        <div className="d-flex align-items-center">
          <p className="mb-0">Quantity: </p>

          {/* Nút giảm số lượng */}
          <button
            style={{
              margin: "0 10px",
              padding: "0px 0px",
              paddingLeft: "5px",
              width: "30px",
              height: "30px",
            }}
            onClick={() => onDecrease(item._id)}
          >
            -
          </button>

          {/* Hiển thị số lượng */}
          <span className="mx-2" style={{ fontSize: "20px" }}>
            {item.quantity}
          </span>

          {/* Nút tăng số lượng */}
          <button
            style={{
              margin: "0 10px",
              padding: "0px 0px",
              paddingLeft: "5px",
              width: "30px",
              height: "30px",
            }}
            onClick={() => onIncrease(item._id)}
          >
            +
          </button>
        </div>

        <p className="card-text">Unit price: $ {item.price}</p>

        <button onClick={() => onDelete(item._id)}>Delete</button>
      </div>
    </div>
  );
};

export default CartItem;
