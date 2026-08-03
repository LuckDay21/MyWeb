import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import PropTypes from "prop-types";
import styles from "./Hero.module.css";

export const Hero = ({ children }) => {
  const reduce = useReducedMotion();

  const rise = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="top" className={styles.hero}>
      <div className={styles.visual} aria-hidden="true">
        {children}
        <div className={styles.visualShade} />
      </div>

      <div className="container">
        <div className={styles.content}>
          <motion.h1 className={styles.title} {...rise(0.05)}>
            Crafting interfaces
            <br />
            with <em>intent</em>
          </motion.h1>

          <motion.p className={styles.subtext} {...rise(0.15)}>
            Front-end developer building fast, accessible, and detail-obsessed web
            experiences for teams and products since 2024.
          </motion.p>

          <motion.div className={styles.ctas} {...rise(0.25)}>
            <motion.a
              href="#contact"
              className={styles.primary}
              whileHover={reduce ? undefined : { scale: 1.02 }}
              whileTap={reduce ? undefined : { scale: 0.97 }}
            >
              <span>Get in touch</span>
              <span className={styles.primaryIcon}>
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </span>
            </motion.a>
            <a href="#projects" className={styles.secondary}>
              View projects
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

Hero.propTypes = {
  children: PropTypes.node,
};