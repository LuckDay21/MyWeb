import { Suspense, lazy } from "react";
import styles from "./App.module.css";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Skills } from "./components/Skills/Skills";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import { Contact } from "./components/Contact/Contact";

const HeroScene = lazy(() => import("./components/Hero/HeroScene"));

function App() {
  return (
    <div className={styles.app}>
      <div className="bg-scene" />

      <Navbar />
      <main>
        <Hero>
          <Suspense fallback={null}>
            <HeroScene />
          </Suspense>
        </Hero>
        <About />
        <Skills />
        <Experience />
        <Projects />
      </main>
      <Contact />
    </div>
  );
}

export default App;