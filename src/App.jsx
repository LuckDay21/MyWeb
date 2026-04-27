import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";

function App() {
  return (
    <div className={styles.App}>
      <div className="glow-bg" />
      <div className="glow-orb" style={{ top: "10%", left: "10%", width: "400px", height: "400px", background: "var(--accent-primary)" }} />
      <div className="glow-orb" style={{ bottom: "10%", right: "10%", width: "500px", height: "500px", background: "var(--accent-secondary)" }} />
      
      <Navbar />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
      </main>
      <Contact />
    </div>
  );
}

export default App;
