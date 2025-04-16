import styles from "./PageHeader.module.css";
import ButtonWhite2 from "../Buttons/ButtonWhite2";

function PageHeader({
  backgroundType,
  backgroundSrc,
  overlayColor = "rgba(0,0,0,0.5)",
  subTitle,
  title,
  titleSize = "10rem",
  h2Title,
  buttonText,
  height = "85vh",
}) {
  return (
    <section className={styles.section} style={{ height: height }}>
      {backgroundType === "video" ? (
        <video
          className={styles.backgroundMedia}
          autoPlay
          muted
          loop
          playsInline
        >
          <source src={backgroundSrc} type="video/mp4" />
        </video>
      ) : (
        <img
          className={styles.backgroundMedia}
          src={backgroundSrc}
          alt="Background"
        />
      )}

      <div
        className={styles.overlay}
        style={{ backgroundColor: overlayColor }}
      ></div>

      <div className={styles.contentContainer}>
        <div className={styles.content}>
          {subTitle && <h6 className={styles.subTitle}>{subTitle}</h6>}
          {title && (
            <h1 className={styles.titleText} style={{ fontSize: titleSize }}>
              {title}
            </h1>
          )}
          {h2Title && <h2 className={styles.h2Title}>{h2Title}</h2>}
          {buttonText && (
            <ButtonWhite2 buttontext={buttonText} className={styles.btn} />
          )}
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
