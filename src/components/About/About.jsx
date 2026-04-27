import React from "react";
import { motion } from "framer-motion";
import { Code2, Server, Layout, Monitor, Users, Rocket } from "lucide-react";
import styles from "./About.module.css";

export const About = () => {
  const items = [
    {
      icon: <Layout size={32} />,
      title: "Frontend Developer",
      description: "Expertise in building responsive, high-performance user interfaces with React and modern CSS."
    },
    {
      icon: <Server size={32} />,
      title: "Backend Exposure",
      description: "Experience with Node.js, Prisma, and SQL/NoSQL databases for building robust full-stack applications."
    },
    {
      icon: <Code2 size={32} />,
      title: "Clean Code",
      description: "Strong advocate for maintainable, scalable, and well-documented codebase architectures."
    },
    {
      icon: <Monitor size={32} />,
      title: "UI/UX Optimization",
      description: "Focus on performance, accessibility, and creating seamless digital experiences."
    },
    {
      icon: <Users size={32} />,
      title: "Agile Collaboration",
      description: "Effective team player with experience in fast-paced government and private sector projects."
    },
    {
      icon: <Rocket size={32} />,
      title: "Professional Growth",
      description: "Actively contributing to complex systems, focusing on scalable and user-centric solutions."
    }
  ];

  return (
    <section className={styles.container} id="about">
      <div className={styles.header}>
        <motion.h2 
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          About Me
        </motion.h2>
        <div className={styles.underline} />
      </div>

      <div className={styles.content}>
        <div className={styles.grid}>
          {items.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={styles.card}
            >
              <div className={styles.iconWrapper}>{item.icon}</div>
              <div className={styles.cardText}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
