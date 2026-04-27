import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import styles from "./Projects.module.css";
import { ProjectCard } from "./ProjectCard";

export const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchGithubRepos = async () => {
      try {
        const response = await fetch(
          "https://api.github.com/users/LuckDay21/repos?sort=updated&per_page=100",
        );
        const data = await response.json();

        const mappedProjects = data
          .filter(
            (repo) =>
              !repo.fork && repo.name !== "LuckDay21" && repo.name !== "MyWeb",
          )
          .map((repo) => {
            return {
              title: repo.name.replace(/-/g, " "),
              imageSrc: repo.homepage
                ? `https://s0.wp.com/mshots/v1/${encodeURIComponent(repo.homepage)}?w=800&h=600`
                : "projects/project.png",
              description: repo.description || "No description available on GitHub.",
              skills: repo.topics || [],
              demo: repo.homepage,
              source: repo.html_url,
            };
          });

        setProjects(mappedProjects);
      } catch (error) {
        console.error("Error fetching GitHub repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchGithubRepos();
  }, []);

  return (
    <section className={styles.container} id="projects">
      <div className={styles.header}>
        <motion.h2
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className={styles.title}
        >
          {loading ? "Loading Projects..." : "Featured Projects"}
        </motion.h2>
        <div className={styles.underline} />
      </div>

      <div className={styles.projectsGrid}>
        {!loading &&
          projects.map((project, id) => (
            <ProjectCard key={id} project={project} />
          ))}
      </div>
    </section>
  );
};
