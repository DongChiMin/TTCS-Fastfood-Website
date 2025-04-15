import styles from "./ButtonBlack.module.css";

function ButtonBlack({ buttontext, onClick }) {
  return (
    <button className={styles.buttonBlack} onClick={onClick}>
      {buttontext}
    </button>
  );
}

export default ButtonBlack;
