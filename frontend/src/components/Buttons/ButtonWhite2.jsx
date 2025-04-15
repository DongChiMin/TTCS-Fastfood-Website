import styles from "./ButtonWhite.module.css";

function ButtonWhite2({ buttontext, onClick, className = "" }) {
  return (
    <button className={`${styles.buttonWhite2} ${className}`} onClick={onClick}>
      {buttontext}
    </button>
  );
}

export default ButtonWhite2;
