import { useState, useEffect } from "react";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import styles from "./Navbar.module.css";

const LINKS = [
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Projects", href: "#projects" },
  { name: "Contact", href: "#contact" },
];

export const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => setScrolled(y > 24));

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <nav className={styles.nav}>
        <div className={`${styles.pill} ${scrolled ? styles.pillScrolled : ""}`}>
          <a href="#top" className={styles.brand}>
            Quraish<span className={styles.brandDot}>.</span>
          </a>

          <div className={styles.links}>
            {LINKS.map((link) => (
              <a key={link.name} href={link.href} className={styles.link}>
                {link.name}
              </a>
            ))}
          </div>

          <button
            className={styles.burger}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className={`${styles.burgerLine} ${open ? styles.burgerLineA : ""}`} />
            <span className={`${styles.burgerLine} ${open ? styles.burgerLineB : ""}`} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <div className={styles.overlayInner}>
              {LINKS.map((link, i) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  className={styles.overlayLink}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 20, opacity: 0 }}
                  transition={{ delay: 0.08 * i + 0.1, duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setOpen(false)}
                >
                  <span className={styles.overlayIndex}>{String(i + 1).padStart(2, "0")}</span>
                  {link.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};