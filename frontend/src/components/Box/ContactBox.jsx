import React from "react";
import styles from "./ContactBox.module.css";

const ContactBox = ({ title, emails, logo }) => {
  return (
    <div className={styles.message}>
      <div className={styles.logo}>
        <i className={logo}></i>
      </div>
      <h4>{title}</h4>
      <span>
        {emails.map((email, index) => (
          <React.Fragment key={index}>
            <a href={`mailto:${email}`}>{email}</a>
            {index < emails.length - 1 && <br />}
          </React.Fragment>
        ))}
      </span>
    </div>
  );
};

export default ContactBox;
