import Navbar from "./components/Navbar";
import ThemeToggle from "./components/ThemeToggle";
import About from "./sections/About";
import Intro from "./sections/Intro";
import Education from"./sections/Education";
import Projects from "./sections/Projects";
import Experience from "./sections/Experience";
import Skills from "./sections/Skills";
import Contact from "./sections/Contact";


function App() {
  return (
    <div className="bg-white dark:bg-black text-black dark:text-white transition-colors duration-500">
      <ThemeToggle />
      <Intro />
      <Navbar/>
      <About />
      <Education/>
      <Projects/>
      <Experience/>
      <Skills/>
      <Contact/>
      
      {/* Next sections: About, Skills, Projects, Contact */}
    </div>
  );
}

export default App;
