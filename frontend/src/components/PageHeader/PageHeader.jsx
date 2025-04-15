import styles from "./PageHeader.module.css";
import ButtonWhite2 from "../Buttons/ButtonWhite2";

function PageHeader({
  backgroundType,
  backgroundSrc,
  overlayColor = "rgba(0,0,0,0.5)",
  subTitle,
  title,
  h2Title,
  buttonText,
  height = "85vh", // chiều cao mặc định
}) {
  return (
    <section
      className={styles.section}
      style={{ height: height, position: "relative" }}
    >
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

      <div className={styles.content}>
        <div className="container text-white h-100">
          <div className="d-flex flex-column h-100 text-center align-items-center justify-content-center">
            <h6 className={styles.subTitle}>{subTitle}</h6>
            <h1 className={"display-3 " + styles.titleText}>{title}</h1>
            <h2 className={styles.h2Title}>{h2Title}</h2>
            {buttonText && (
              <ButtonWhite2 buttontext={buttonText} className={styles.btn} />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PageHeader;
