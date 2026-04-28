import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import styles from "./Hero.module.css";

export const Hero = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className={styles.subtitle}>Front-End Developer</h2>
          <h1 className={styles.title}>
            Crafting Digital <br />
            <span>Experiences</span> That Matter
          </h1>
          <p className={styles.description}>
            I am a professional <strong>Front-End Developer</strong> with
            experience in building modern, high-performance web applications and
            AI-driven platforms since September 2024.
          </p>
          <div className={styles.ctaContainer}>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              href="#contact"
              className={styles.contactBtn}
            >
              Let's Talk <ArrowRight size={20} />
            </motion.a>
            <a href="#projects" className={styles.secondaryBtn}>
              View Projects
            </a>
          </div>
        </motion.div>
      </div>

      <div className={styles.visual}>
        {/* Medium Blue sphere */}
        <motion.div
          animate={{ y: [20, -30, 20], x: [15, -15, 15] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className={`${styles.sphere} ${styles.sphereBlue}`}
        />
        {/* Small White sphere */}
        <motion.div
          animate={{ y: [-15, 25, -15], x: [-20, 20, -20] }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          className={`${styles.sphere} ${styles.sphereWhite}`}
        />
        {/* Small Purple sphere */}
        <motion.div
          animate={{ y: [30, -20, 30], x: [20, -10, 20] }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.5,
          }}
          className={`${styles.sphere} ${styles.spherePurple}`}
        />
        <div className={styles.glow} />
      </div>
    </section>
  );
};
