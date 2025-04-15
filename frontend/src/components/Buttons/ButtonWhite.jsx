import styles from "./ButtonWhite.module.css";

function ButtonWhite({ buttontext, onClick, ...rest }) {
  return (
    <button className={styles.buttonWhite} onClick={onClick} {...rest}>
      {buttontext}
    </button>
  );
}

export default ButtonWhite;
