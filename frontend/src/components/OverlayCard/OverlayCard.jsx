import styles from "./OverlayCard.module.css";

function OverlayCard({
  title = "Title",
  description = ["description", "sub description"],
  imageSrc,
  height = "300px",
}) {
  return (
    <div className={styles.clickableItem}>
      <div className={styles.thumb} style={{ height }}>
        <div className={styles.overlay}></div>
        <ul
          className={styles.content + " d-flex flex-column align-items-center"}
        >
          <li>
            <div href="#" className="d-flex justify-content-center">
              <h2>{title}</h2>
            </div>
          </li>
          <li>
            {description.map((line, index) => (
              <p key={index}>{line}</p>
            ))}
          </li>
        </ul>
        <img src={imageSrc} alt="Thumb" />
      </div>
    </div>
  );
}

export default OverlayCard;
