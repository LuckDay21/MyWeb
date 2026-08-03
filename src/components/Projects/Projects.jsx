import { useEffect, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import styles from "./Projects.module.css";

const GH_API = "https://api.github.com/users/LuckDay21/repos?sort=updated&per_page=100";

const screenshot = (homepage) =>
  homepage
    ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(homepage)}?w=1200&h=800`
    : "/assets/projects/project.png";

const mapRepo = (repo) => ({
  title: repo.name.replace(/-/g, " "),
  description: repo.description || "Public repository on GitHub.",
  skills: repo.topics || [],
  demo: repo.homepage,
  source: repo.html_url,
  image: screenshot(repo.homepage),
});

export const Projects = () => {
  const reduce = useReducedMotion();
  const [projects, setProjects] = useState([]);
  const [status, setStatus] = useState("loading");

  const load = useCallback(async () => {
    setStatus("loading");
    try {
      const res = await fetch(GH_API);
      if (!res.ok) throw new Error(`GitHub responded ${res.status}`);
      const data = await res.json();
      const mapped = data
        .filter((repo) => !repo.fork && repo.name !== "MyWeb" && repo.name !== "LuckDay21")
        .slice(0, 5)
        .map(mapRepo);
      setProjects(mapped);
      setStatus("done");
    } catch (err) {
      console.error("Failed to load projects:", err);
      setStatus("error");
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const reveal = (delay = 0) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] },
  });

  return (
    <section id="projects" className={styles.section}>
      <div className="container">
        <motion.h2 className={styles.title} {...reveal(0)}>
          Projects
        </motion.h2>

        {status === "loading" && (
          <div className={styles.grid}>
            <div className={`${styles.card} ${styles.cardFeatured} ${styles.skeleton}`} />
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className={`${styles.card} ${styles.skeleton}`} />
            ))}
          </div>
        )}

        {status === "error" && (
          <div className={styles.state}>
            <p>Couldn&apos;t load projects from GitHub.</p>
            <button className={styles.retry} onClick={load}>
              Try again
            </button>
          </div>
        )}

        {status === "done" && projects.length === 0 && (
          <div className={styles.state}>
            <p>No public repositories right now.</p>
            <a className={styles.retry} href="https://github.com/LuckDay21" target="_blank" rel="noreferrer">
              Visit my GitHub
            </a>
          </div>
        )}

        {status === "done" && projects.length > 0 && (
          <>
            <div className={styles.grid}>
              {projects.map((project, i) => {
                const featured = i === 0;
                return (
                  <motion.article
                    key={project.title}
                    className={`${styles.card} ${featured ? styles.cardFeatured : ""}`}
                    {...reveal(Math.min(i, 3) * 0.06)}
                  >
                    <a
                      href={project.demo || project.source}
                      target="_blank"
                      rel="noreferrer"
                      className={styles.imageLink}
                    >
                      <img
                        className={styles.image}
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        onError={(e) => {
                          if (e.currentTarget.src !== "/assets/projects/project.png") {
                            e.currentTarget.src = "/assets/projects/project.png";
                          }
                        }}
                      />
                    </a>
                    <div className={styles.cardBody}>
                      <div className={styles.cardHead}>
                        <h3 className={styles.cardTitle}>{project.title}</h3>
                        <div className={styles.cardLinks}>
                          {project.demo && (
                            <a
                              href={project.demo}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`Open ${project.title} live demo`}
                            >
                              <ArrowUpRight size={17} strokeWidth={1.5} />
                            </a>
                          )}
                          {project.source && (
                            <a
                              href={project.source}
                              target="_blank"
                              rel="noreferrer"
                              aria-label={`View ${project.title} source`}
                            >
                              <span className={styles.sourceMark}>{"</>"}</span>
                            </a>
                          )}
                        </div>
                      </div>
                      <p className={styles.cardDesc}>{project.description}</p>
                      {project.skills.length > 0 && (
                        <p className={styles.skills}>
                          {project.skills.slice(0, 4).join(" / ")}
                        </p>
                      )}
                    </div>
                  </motion.article>
                );
              })}
            </div>

            <motion.div className={styles.more} {...reveal(0.1)}>
              <a
                className={styles.moreLink}
                href="https://github.com/LuckDay21"
                target="_blank"
                rel="noreferrer"
              >
                View all repositories on GitHub
                <ArrowUpRight size={16} strokeWidth={1.5} />
              </a>
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
};