import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import ProjectCard from "./ProjectCard";
import { projects } from "@/constants";


const ProjectsSection = () => {
  const [filter, setFilter] = useState("all");
  const reduceMotion = useReducedMotion();

  const filters = [
    { id: "all", label: "All Projects" },
    { id: "web", label: "Web Apps" },
    { id: "pos", label: "POS Systems" },
  ];

  // In a real implementation, we would filter based on tags in the project data
  const filteredProjects = projects;

  const headerReveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 20 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.5, ease: "easeOut" },
      };

  return (
    <section id="projects" className="bg-white section-padding">
      <div className="container mx-auto">
        <motion.div className="mb-16 text-center" {...headerReveal}>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-gradient-to-r
           from-portfolio-primary to-portfolio-accent mx-auto mb-6 rounded-full"></div>
          <p className="text-lg text-portfolio-gray max-w-3xl mx-auto">
            Take a look at some of the projects I've worked on. Each project represents my commitment to quality,
            innovation, and solving real business problems.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((filterItem) => (
            <button
              key={filterItem.id}
              onClick={() => setFilter(filterItem.id)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                filter === filterItem.id
                  ? "bg-portfolio-primary text-white shadow-md"
                  : "bg-gray-100 hover:bg-gray-200 text-portfolio-gray"
              }`}
            >
              {filterItem.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project, index) => (
            <ProjectCard
              key={project.id}
              id={project.id}
              index={index}
              title={project.title}
              shortDescription={project.shortDescription}
              description={project.features}
              techStack={project.techStack}
              image={project.image}
              images={project.images}
            />
          ))}
        </div>

        <div className="text-center mt-12">
          <a
            href="#contact"
            className="inline-block bg-portfolio-primary hover:bg-sky-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 shadow-md hover:shadow-lg"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
