import React from "react";
import { motion } from "framer-motion";
import { ExternalLink, Code } from "lucide-react";
import styles from "./ProjectCard.module.css";
import { getImageUrl } from "../../utils";

export const ProjectCard = ({
  project: { title, imageSrc, description, skills, demo, source },
}) => {
  return (
    <motion.div 
      whileHover={{ y: -10 }}
      className={styles.container}
    >
      <div className={styles.imageWrapper}>
        <img
          src={imageSrc.startsWith("http") ? imageSrc : getImageUrl(imageSrc)}
          alt={`Image of ${title}`}
          className={styles.image}
        />
        <div className={styles.overlay}>
          <div className={styles.overlayLinks}>
            {demo && (
              <a href={demo} target="_blank" rel="noreferrer" title="View Demo">
                <ExternalLink size={24} />
              </a>
            )}
            {source && (
              <a href={source} target="_blank" rel="noreferrer" title="View Source">
                <Code size={24} />
              </a>
            )}
          </div>
        </div>
      </div>
      
      <div className={styles.details}>
        <h3 className={styles.title}>{title}</h3>
        <p className={styles.description}>{description}</p>
        <div className={styles.skills}>
          {skills.map((skill, id) => (
            <span key={id} className={styles.skill}>
              {skill}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
