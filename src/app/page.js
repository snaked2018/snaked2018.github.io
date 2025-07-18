import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import LogoSlider from "@/components/LogoSlider";
import AboutMeDraggable from "@/components/AboutMeDraggable";
import Footer from "@/components/Footer";
import ExperienceSection from "@/components/ExperienceSection";
import SkillSection from "@/components/SkillSection";
import ProjectSection from "@/components/ProjectSection";

export default function Home() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <LogoSlider />
        <AboutMeDraggable />
        <ExperienceSection />
        <SkillSection />
        <ProjectSection />
      </main>
      <Footer />
    </div>
  );
}