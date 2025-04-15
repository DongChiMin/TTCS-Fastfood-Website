import styles from "./TitleWithSubtitle.module.css";

function TitleWithSubtitle({ subTitle = "subtitle", title = "title" }) {
  return (
    <div className={styles.sectionHeading}>
      <h6>{subTitle}</h6>
      <h2>{title}</h2>
    </div>
  );
}

export default TitleWithSubtitle;
