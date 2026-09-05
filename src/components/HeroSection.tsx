
import { useMemo, useState, useEffect } from "react";
import { ChevronDown, Github, Linkedin, Twitter } from "lucide-react";
import ProjectOrbitVisual from "./fullstack/ProjectOrbitVisual";
import type { OrbitProject } from "./fullstack/ProjectOrbitScene";
import { socialPlatforms, projects } from "@/constants";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const [hoveredProject, setHoveredProject] = useState<OrbitProject | null>(null);
  const orbitProjects: OrbitProject[] = useMemo(
    () =>
      projects.slice(0, 6).map((project) => ({
        id: project.id,
        title: project.title,
        shortDescription: project.shortDescription,
        image: project.image,
      })),
    []
  );
  const roles = ["Full Stack Developer","Python Developer"];
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [delta, setDelta] = useState(200 - Math.random() * 100);

  useEffect(() => {
    const ticker = setInterval(() => {
      tick();
    }, delta);

    return () => clearInterval(ticker);
  });

  const tick = () => {
    const fullText = roles[currentRoleIndex];
    
    if (isDeleting) {
      setTypedText(fullText.substring(0, typedText.length - 1));
      setDelta(100);
    } else {
      setTypedText(fullText.substring(0, typedText.length + 1));
      setDelta(200 - Math.random() * 100);
    }

    if (!isDeleting && typedText === fullText) {
      setIsDeleting(true);
      setDelta(2000);
    } else if (isDeleting && typedText === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((currentRoleIndex + 1) % roles.length);
      setDelta(500);
    }
  };

  return (
    <section 
      id="home" 
      className="min-h-screen flex flex-col justify-center items-center relative overflow-hidden bg-gradient-to-b from-white to-sky-50 section-padding pt-24"
    >
      {/* Rotating dot globe backdrop with orbiting project images + profile picture */}
      <ProjectOrbitVisual projects={orbitProjects} profileImage="./profile.png" onHoverProject={setHoveredProject} />

      {/* Readability scrim: brightens the center so the scene stays visible at the
          edges while keeping the headline and text crisp. */}
      <div
        className="absolute inset-0 z-[5] pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(ellipse 65% 55% at 50% 45%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.45) 45%, rgba(255,255,255,0) 78%)",
        }}
      />

      {/* Hovered project info panel - fades in above the orbit, mirrors what's under the pointer */}
      <div
        className={`absolute top-6 left-0 right-0 z-[6] flex justify-center px-4 pointer-events-none transition-opacity duration-300 ${
          hoveredProject ? "opacity-100" : "opacity-0"
        }`}
        aria-live="polite"
      >
        {hoveredProject && (
          <div className="bg-white/90 backdrop-blur-sm shadow-lg rounded-xl px-5 py-3 max-w-md text-center border border-portfolio-primary/10">
            <p className="font-semibold text-portfolio-secondary">{hoveredProject.title}</p>
            <p className="text-sm text-portfolio-gray">{hoveredProject.shortDescription}</p>
          </div>
        )}
      </div>

      <div className="container mx-auto text-center max-w-4xl relative z-10">
        <div className="flex flex-col items-center mb-8">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Hi, I'm <span className="heading-gradient">A Certified Developer</span>
          </h1>
        </div>
        
        <div className="h-10 md:h-16 mb-6">
          <span className="text-2xl md:text-4xl font-semibold text-portfolio-secondary">
            I'm a {" "}
            <span className="text-portfolio-primary">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </span>
        </div>
        
        {/* Business-facing value statement */}
        <div className="mb-10 flex flex-col items-center gap-4">
          {/* Audience pill */}
     
          {/* Bold value headline */}
          <p className="text-xl md:text-2xl font-semibold text-portfolio-secondary max-w-2xl leading-snug">
            I turn your{" "}
            <span className="heading-gradient">business idea</span> into a{" "}
            <span className="heading-gradient">live, revenue-ready product</span>
            {" "} fast, clean, and built to scale.
          </p>

          {/* Micro-stats row */}
          <div className="flex flex-wrap justify-center gap-3 mt-1">
            {[
              { value: "ROI-Driven", label: "Every Build" },
              { value: "100%", label: "Client Satisfaction" },
              { value: "20+", label: "Products Shipped" },
            ].map(({ value, label }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-portfolio-primary/15 bg-white/70 backdrop-blur-sm px-5 py-2 shadow-sm"
              >
                <span className="text-lg font-bold heading-gradient leading-none">{value}</span>
                <span className="text-[11px] text-portfolio-gray font-medium mt-0.5">{label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6 mb-10">
          <a 
            href="#projects" 
            className="bg-portfolio-primary hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 shadow-md hover:shadow-lg"
          >
            View My Work
          </a>
          <a 
            href="#contact" 
            className="bg-transparent hover:bg-portfolio-secondary border border-portfolio-primary text-portfolio-primary hover:text-white font-medium py-3 px-8 rounded-md transition duration-300"
          >
            Contact Me
          </a>
        </div>
        
        <div className="flex justify-center space-x-4 mb-16">
          {socialPlatforms.map((social, index) => (
            <a 
              key={index}
              href={social.href}
              aria-label={social.name}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white p-3 rounded-full shadow-md hover:shadow-lg transition-all hover:-translate-y-1 text-portfolio-gray hover:text-portfolio-primary"
            >
              <social.icon size={24} />
            </a>
          ))}
        </div>
        
        <div className="absolute bottom-10 left-0 right-0 mx-auto animate-bounce text-center">
          <a href="#about" aria-label="Scroll down">
            <ChevronDown size={32} className="inline-block text-portfolio-primary" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
