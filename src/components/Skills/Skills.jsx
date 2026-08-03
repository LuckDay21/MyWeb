import skills from "../../data/skills.json";
import { getImageUrl } from "../../utils";
import styles from "./Skills.module.css";

const ROW = skills.map((skill) => (
  <span key={skill.title} className={styles.item}>
    <img className={styles.icon} src={getImageUrl(skill.imageSrc)} alt="" />
    <span className={styles.name}>{skill.title}</span>
  </span>
));

export const Skills = () => {
  return (
    <section className={styles.section} aria-label="Tools and technologies">
      <div className={styles.marquee}>
        <div className={styles.track}>
          {ROW}
          {ROW}
        </div>
      </div>
    </section>
  );
};