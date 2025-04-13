
import { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";

const HeroSection = () => {
  const [typedText, setTypedText] = useState("");
  const roles = ["Full Stack Developer", "AI Engineer", "Cloud Expert"];
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
      className="min-h-screen flex flex-col justify-center items-center relative bg-gradient-to-b from-white to-blue-50 section-padding pt-24"
    >
      <div className="container mx-auto text-center max-w-4xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
          Hi, I'm <span className="heading-gradient">A Certified Developer</span>
        </h1>
        
        <div className="h-10 md:h-16 mb-6">
          <span className="text-2xl md:text-4xl font-semibold text-portfolio-secondary">
            I'm a {" "}
            <span className="text-portfolio-primary">
              {typedText}
              <span className="animate-pulse">|</span>
            </span>
          </span>
        </div>
        
        <p className="text-lg md:text-xl text-portfolio-gray mb-10 max-w-2xl mx-auto">
          With over 4 years of experience in building robust and scalable solutions.
          Specializing in MERN stack, Python, and AI-powered systems.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-4 md:gap-6">
          <a 
            href="#projects" 
            className="bg-portfolio-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 shadow-md hover:shadow-lg"
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
