import { Link } from "react-router-dom";
import logo from "../../assets/images/logo-black.png";
import styles from "./Header.module.css";
import ButtonWhite from "../Buttons/ButtonWhite";

import CartItem from "../CartItem";

import React, { useEffect, useState } from "react";

function Header() {
  const [items, setItems] = useState([]);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(true);

  // Start Phần xử lý cuộn chuột hiển thị header
  useEffect(() => {
    const loadCart = () => {
      const savedCart = JSON.parse(localStorage.getItem("cart")) || {
        items: [],
      };
      setItems(savedCart.items);
    };

    loadCart();
    window.addEventListener("cartUpdated", loadCart);

    return () => {
      window.removeEventListener("cartUpdated", loadCart);
    };
  }, []);

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scroll down
        setHeaderVisible(false);
      } else {
        // Scroll up
        setHeaderVisible(true);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader, { passive: true });

    return () => {
      window.removeEventListener("scroll", controlHeader);
    };
  }, [lastScrollY]);
  // End Phần xử lý cuộn chuột hiển thị header

  // Start phần xử lý giỏ hàng
  const updateCart = (updatedItems) => {
    setItems(updatedItems);
    const updatedCart = {
      cartId: "67fb8e201f70bf74520565e7",
      items: updatedItems,
    };
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const increaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item._id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    updateCart(updatedItems);
  };

  const decreaseQuantity = (id) => {
    const updatedItems = items.map((item) =>
      item._id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    updateCart(updatedItems);
  };

  const deleteItem = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmDelete) {
      const updatedItems = items.filter((item) => item._id !== id);
      updateCart(updatedItems);
    }
  };
  // End phần xử lý giỏ hàng

  return (
    <>
      {" "}
      {/* *****offcanvas sidebar start***** */}
      <div
        className="offcanvas offcanvas-start w-25 d-flex flex-column"
        tabIndex="-1"
        id="cartSideBar"
        aria-labelledby="offcanvasDemoLabel"
      >
        {/* Phần header */}
        <div className="offcanvas-header">
          <h1
            className="offcanvas-title"
            id="offcanvasDemoLabel"
            style={{ fontSize: "40px" }}
          >
            Your cart
          </h1>
          <button
            type="button"
            className="btn-close text-reset"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>

        {/* Phần body có thể cuộn */}
        <div className="offcanvas-body flex-grow-1 overflow-auto">
          {/* Nội dung giỏ hàng có thể cuộn */}
          <div style={{ minHeight: "100%" }}>
            {/* Các items trong giỏ hàng */}
            {items.map((item) => (
              <CartItem
                key={item._id}
                item={item}
                onIncrease={increaseQuantity}
                onDecrease={decreaseQuantity}
                onDelete={deleteItem}
              />
            ))}
          </div>
        </div>

        {/* Phần footer cố định */}
        <div
          className="offcanvas-footer p-3 border-top"
          style={{ flexShrink: 0 }}
        >
          <div className="d-flex justify-content-between align-items-center">
            <p className="mb-0">Total:</p>
            <span className="fs-4 fw-bold">
              $
              {items
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toLocaleString()}
            </span>
          </div>
          <Link to={"/check-out"}>
            <ButtonWhite
              buttontext={"Check Out"}
              className="w-100 mt-3 py-2"
              style={{ height: "80px", fontSize: "25px" }}
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            />
          </Link>
        </div>
      </div>
      {/* *****offcanvas sidebar end***** */}
      {/* *****Header start***** */}
      <header
        className={`d-flex align-items-center ${styles.header} ${
          headerVisible ? styles.visible : styles.hidden
        }`}
      >
        <div className="container-fluid">
          <div className="row justify-content-center">
            {/* Header Left */}
            <div
              className={
                "col-5 text-center  d-flex justify-content-between " +
                styles.nav
              }
            >
              <div>
                <ButtonWhite
                  buttontext={`Cart (${items.length})`}
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#cartSideBar"
                />
              </div>
              <ul className={styles.mainMenus}>
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/chefs">Chefs</Link>
                </li>
                <li>
                  <Link to="/menus">Menus</Link>
                </li>
              </ul>
            </div>

            {/* Header Center */}
            <div className={"col-2 text-center " + styles.center}>
              <Link to="/">
                <img src={logo} alt="logo-black" />
              </Link>
            </div>

            {/* Header Right */}
            <div
              className={
                "col-5 text-center d-flex justify-content-between " + styles.nav
              }
            >
              <div>
                <ul className={styles.mainMenus}>
                  <li>
                    <Link to="/shop">Shop</Link>
                  </li>
                  <li>
                    <div className="dropdown">
                      <div
                        className={
                          styles.dropdownText + " dropdown-toggle text-dark"
                        }
                        data-bs-toggle="dropdown"
                        role="button"
                        style={{ cursor: "pointer" }}
                      >
                        Join with us
                      </div>
                      <ul className="dropdown-menu">
                        <li>
                          <a className="dropdown-item" href="/register-class">
                            Register a cooking class
                          </a>
                        </li>
                        <li>
                          <a className="dropdown-item" href="/recuitment">
                            Recruitment
                          </a>
                        </li>
                      </ul>
                    </div>
                  </li>
                  <li>
                    <Link to="#">Book table</Link>
                  </li>
                </ul>
              </div>
              <div>
                <ButtonWhite
                  buttontext="Login"
                  onClick={() => alert("Button Clicked!")}
                />
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className={styles.contentPadding}></div>
      {/* *****Header end***** */}
    </>
  );
}

export default Header;
