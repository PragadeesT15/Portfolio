import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Skills } from "@/components/skills/skills";
import { Projects } from "@/components/projects/projects";
import { Experience } from "@/components/experience/experience";
import { Playground } from "@/components/playground/playground";
import { Contact } from "@/components/contact/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Playground />
      <Contact />
    </>
  );
}
