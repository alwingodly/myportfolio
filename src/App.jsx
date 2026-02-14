import React from 'react';
import './App.css';
import Header from './components/header/Header';
import Hero from './components/hero/Hero';
import About from './components/about/About';
import Experience from './components/experience/Experience';
import Projects from './components/projects/Projects';
import Skills from './components/skills/Skills';
import Education from './components/education/Education';
import Contact from './components/contact/Contact';
import Footer from './components/footer/Footer';
import CustomCursor from './components/CustomCursor';
import RandomWorm from './components/movingWorm/RandomWorm';

function App() {
  return (
    <div className="app">
      {/* <CustomCursor /> */}
      <RandomWorm />
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Skills />
        {/* <Projects /> */}
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}

export default App;