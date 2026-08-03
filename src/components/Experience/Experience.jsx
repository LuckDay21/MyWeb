import { motion, useReducedMotion } from "framer-motion";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";
import styles from "./Experience.module.css";

export const Experience = () => {
  const reduce = useReducedMotion();

  return (
    <section id="experience" className={styles.section}>
      <div className="container">
        <motion.h2
          className={styles.title}
          initial={reduce ? false : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          Experience
        </motion.h2>

        <div className={styles.list}>
          {history.map((job, i) => (
            <motion.article
              key={`${job.organisation}-${job.role}`}
              className={styles.job}
              initial={reduce ? false : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.7, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={styles.jobHead}>
                <div className={styles.logo}>
                  <img src={getImageUrl(job.imageSrc)} alt={`${job.organisation} logo`} />
                </div>
                <div className={styles.jobMeta}>
                  <h3 className={styles.role}>{job.role}</h3>
                  <p className={styles.org}>{job.organisation}</p>
                </div>
                <span className={styles.period}>
                  {job.startDate} - {job.endDate}
                </span>
              </div>

              <ul className={styles.points}>
                {job.experiences.map((item) => (
                  <li key={item} className={styles.point}>
                    {item}
                  </li>
                ))}
              </ul>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};