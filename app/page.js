import Hero from "../components/Hero";
import Projects from "../components/Projects";
import Skills from "../components/Skills";
import ContactCta from "../components/ContactCta";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <Projects />
      <Skills />
      <ContactCta />
      <Footer />
    </main>
  );
}
