import React from "react";
import styles from "./Footer.module.css"; // import CSS module

const Footer = () => {
  return (
    <footer className="bg-dark text-light py-5">
      <div className="container-fluid">
        <div className="row g-4">
          {/* Company Info */}
          <div className="col-6 col-md-6">
            <h5 className="mb-4">About Us</h5>
            <p className="mb-4" style={{ paddingRight: "250px" }}>
              We are dedicated to providing innovative solutions that help
              businesses grow and succeed in the digital age.
            </p>
          </div>

          {/* Quick Links */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Home
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  About
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Services
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Portfolio
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4">Our services</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Web Design
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Development
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Marketing
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Consulting
                </a>
              </li>
              <li className="mb-2">
                <a href="#" className={styles.footerLink}>
                  Analytics
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="col-lg-2 col-md-6">
            <h5 className="mb-4">Contact Info</h5>
            <ul className="list-unstyled">
              <li className="mb-3">
                <i className="fas fa-map-marker-alt me-2"></i>
                123 Business Street, New York, NY 10001
              </li>
              <li className="mb-3">
                <i className="fas fa-phone me-2"></i>
                <a href="tel:+1234567890" className={styles.footerLink}>
                  +1 (234) 567-890
                </a>
              </li>
              <li className="mb-3">
                <i className="fas fa-envelope me-2"></i>
                <a
                  href="mailto:contact@example.com"
                  className={styles.footerLink}
                >
                  contact@example.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="row mt-5">
          <div className="col-12">
            <hr className="mb-4" />
            <div className="text-center">
              <p className="mb-0">
                &copy; 2025 A3Building. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
