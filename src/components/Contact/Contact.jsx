import React from "react";
import { motion } from "framer-motion";
import { Mail, Send } from "lucide-react";
import styles from "./Contact.module.css";
import { getImageUrl } from "../../utils";

export const Contact = () => {
  return (
    <footer id="contact" className={styles.container}>
      <div className={styles.content}>
        <div className={styles.textSection}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={styles.title}
          >
            Get In Touch
          </motion.h2>
          <p className={styles.description}>
            Have a project in mind or just want to say hi? My inbox is always open!
          </p>
          
          <div className={styles.links}>
            <a href="mailto:quraishiye21@gmail.com" className={styles.link}>
              <div className={styles.iconWrapper}><Mail size={20} /></div>
              <span>quraishiye21@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/m-quraish/" className={styles.link} target="_blank" rel="noreferrer">
              <div className={styles.iconWrapper}>
                <img src={getImageUrl("contact/linkedinIcon.png")} alt="LinkedIn" style={{ width: "20px" }} />
              </div>
              <span>linkedin.com/in/m-quraish</span>
            </a>
            <a href="https://github.com/LuckDay21" className={styles.link} target="_blank" rel="noreferrer">
              <div className={styles.iconWrapper}>
                <img src={getImageUrl("contact/githubIcon.png")} alt="Github" style={{ width: "20px", filter: "invert(1)" }} />
              </div>
              <span>github.com/LuckDay21</span>
            </a>
          </div>
        </div>

        <motion.form 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className={styles.form}
        >
          <div className={styles.formGroup}>
            <input type="text" placeholder="Your Name" required />
          </div>
          <div className={styles.formGroup}>
            <input type="email" placeholder="Your Email" required />
          </div>
          <div className={styles.formGroup}>
            <textarea placeholder="Your Message" rows="5" required></textarea>
          </div>
          <button type="submit" className={styles.submitBtn}>
            Send Message <Send size={18} />
          </button>
        </motion.form>
      </div>
      
      <div className={styles.footerBottom}>
        <p>© {new Date().getFullYear()} Quraish. All rights reserved.</p>
      </div>
    </footer>
  );
};
