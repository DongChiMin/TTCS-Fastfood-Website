import React from "react";
import styles from "./SelectFilter.module.css"; // import CSS module

const SelectFilter = ({ name = "", id, options = [], onChange, value }) => (
  <div className={styles["select-filter-wrapper"]}>
    <label className={styles["select-filter-label"]} htmlFor={id || name}>
      {name}
    </label>
    <select
      className={styles["select-filter"]}
      name={name}
      id={id || name}
      onChange={onChange}
      value={value}
    >
      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  </div>
);

export default SelectFilter;
