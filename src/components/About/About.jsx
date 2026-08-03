import { motion, useReducedMotion } from "framer-motion";
import styles from "./About.module.css";

const GROUPS = [
  {
    label: "Front-end",
    items: ["React", "Next.js", "Vite", "Framer Motion", "CSS Systems"],
  },
  {
    label: "Data & backend",
    items: ["Node.js", "Prisma", "PostgreSQL", "MongoDB", "Supabase"],
  },
  {
    label: "Tooling",
    items: ["Git", "Figma", "Tailwind", "Expo"],
  },
];

export const About = () => {
  const reduce = useReducedMotion();

  return (
    <section id="about" className={styles.section}>
      <div className="container">
        <motion.h2
          className={styles.headline}
          initial={reduce ? false : { opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          I care about the pixels
          <br />
          people scroll past.
        </motion.h2>

        <div className={styles.body}>
          <motion.p
            className={styles.lead}
            initial={reduce ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
          >
            I&apos;m Quraish, a front-end developer working on high-traffic education
            platforms and product builds. My work balances speed, accessibility,
            and the kind of polish you only notice in retrospect.
          </motion.p>

          <dl className={styles.groups}>
            {GROUPS.map((group, i) => (
              <motion.div
                key={group.label}
                className={styles.group}
                initial={reduce ? false : { opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.6, delay: 0.05 * i, ease: [0.16, 1, 0.3, 1] }}
              >
                <dt className={styles.groupLabel}>{group.label}</dt>
                <dd>
                  <ul className={styles.groupItems}>
                    {group.items.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </dd>
              </motion.div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
};