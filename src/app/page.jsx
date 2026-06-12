import Header from '@/components/header/Header'
import Hero from '@/components/hero/Hero'
import Work from '@/components/work/Work'
import About from '@/components/about/About'
import Experience from '@/components/experience/Experience'
import Skills from '@/components/skills/Skills'
import Education from '@/components/education/Education'
import Contact from '@/components/contact/Contact'
import Footer from '@/components/footer/Footer'
import CustomCursor from '@/components/CustomCursor'
import CosmosBackdrop from '@/components/CosmosBackdrop'

export default function Home() {
  return (
    <div className="app">
      <CustomCursor />
      <Header />
      <main>
        <CosmosBackdrop />
        <Hero />
        <Work />
        <About />
        <Experience />
        <Skills />
        <Education />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
