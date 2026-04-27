import React from "react";
import { motion } from "framer-motion";
import styles from "./Experience.module.css";
import skills from "../../data/skills.json";
import history from "../../data/history.json";
import { getImageUrl } from "../../utils";

export const Experience = () => {
  return (
    <section className={styles.container} id="experience">
      <div className={styles.header}>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          Expertise & Experience
        </motion.h2>
        <div className={styles.underline} />
      </div>

      <div className={styles.content}>
        <div className={styles.skillsSection}>
          <h3 className={styles.subTitle}>Technical Skills</h3>
          <div className={styles.skillsGrid}>
            {skills.map((skill, id) => (
              <motion.div 
                key={id} 
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: id * 0.05 }}
                whileHover={{ y: -5 }}
                className={styles.skill}
              >
                <div className={styles.skillImageContainer}>
                  <img src={getImageUrl(skill.imageSrc)} alt={skill.title} />
                </div>
                <p>{skill.title}</p>
              </motion.div>
            ))}
          </div>
        </div>

        <div className={styles.historySection}>
          <h3 className={styles.subTitle}>Professional Journey</h3>
          <div className={styles.timeline}>
            {history.map((historyItem, id) => (
              <motion.div 
                key={id} 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className={styles.historyItem}
              >
                <div className={styles.historyImageWrapper}>
                  <img
                    src={getImageUrl(historyItem.imageSrc)}
                    alt={`${historyItem.organisation} Logo`}
                  />
                </div>
                <div className={styles.historyDetails}>
                  <h3>{historyItem.role}</h3>
                  <h4>{historyItem.organisation}</h4>
                  <p className={styles.date}>{`${historyItem.startDate} - ${historyItem.endDate}`}</p>
                  <ul className={styles.expList}>
                    {historyItem.experiences.map((experience, i) => (
                      <li key={i}>{experience}</li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
