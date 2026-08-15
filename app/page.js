import Hero from "../components/Hero";
import Bento from "../components/Bento";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Bento />
      <Projects />
      <Skills />
      <Footer />
    </main>
  );
}