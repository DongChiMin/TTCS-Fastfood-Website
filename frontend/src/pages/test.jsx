import axios from "axios";
import { useState, useEffect } from "react";

function Test() {
  // Lấy giỏ hàng từ localStorage khi ứng dụng load
  const [items, setItems] = useState([]);

  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart && savedCart.items) {
      setItems(savedCart.items); // Lấy mảng items từ giỏ hàng trong localStorage
    }
  }, []);

  // Hàm giảm số lượng
  const decreaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );

    // Cập nhật giỏ hàng trong localStorage sau khi thay đổi
    const updatedCart = {
      cartId: "67fb8e201f70bf74520565e7",
      items: updatedItems,
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Cập nhật state
    setItems(updatedItems);
  };

  // Hàm tăng số lượng
  const increaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );

    // Cập nhật giỏ hàng trong localStorage sau khi thay đổi
    const updatedCart = {
      cartId: "67fb8e201f70bf74520565e7",
      items: updatedItems,
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Cập nhật state
    setItems(updatedItems);
  };

  // Hàm xóa sản phẩm
  const deleteItem = (id) => {
    const updatedItems = items.filter((item) => item._id !== id);

    // Cập nhật giỏ hàng trong localStorage sau khi thay đổi
    const updatedCart = {
      cartId: "67fb8e201f70bf74520565e7",
      items: updatedItems,
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));

    // Cập nhật state
    setItems(updatedItems);
  };

  // Hàm gửi api để cập nhật lại giỏ hàng
  const updateCart = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/carts/update-cart",
        {
          cart: items, // Hoặc chỉ gửi ID và Quantity nếu muốn tiết kiệm dữ liệu
        }
      );

      console.log("Cart updated:", response.data);
      alert("Cập nhật giỏ hàng thành công!");
    } catch (error) {
      console.error("Lỗi khi cập nhật giỏ hàng:", error);
      alert("Có lỗi xảy ra khi cập nhật giỏ hàng.");
    }
  };

  return (
    <div className="section">
      {items.map((item) => (
        <div key={item._id} className="card mb-3">
          <div className="card-body">
            <h5 className="card-title" style={{ fontSize: "30px" }}>
              {item.title}
            </h5>
            <div className="d-flex">
              <span>
                <p>Quantity: </p>
              </span>
              {/* Nút giảm số lượng */}
              <button
                className="btn btn-outline-secondary mx-1"
                style={{
                  width: "30px",
                  height: "30px",
                }}
                onClick={() => decreaseQuantity(item._id)}
              >
                -
              </button>

              {/* Hiển thị số lượng sản phẩm */}
              <span className="mx-2">
                <p>{item.quantity}</p>
              </span>

              {/* Nút tăng số lượng */}
              <button
                className="btn btn-outline-secondary mx-1"
                style={{ width: "30px", height: "30px" }}
                onClick={() => increaseQuantity(item._id)}
              >
                +
              </button>
            </div>
            <p className="card-text">Unit price: $ {item.price}</p>
            <button onClick={() => deleteItem(item._id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Test;
