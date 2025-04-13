
import { useState } from "react";
import ProjectCard from "./ProjectCard";

const projects = [
  {
    id: 1,
    title: "Square POS Integration",
    shortDescription: "A lightweight tool for restaurants to authenticate Square POS systems and retrieve transaction data.",
    description: [
      "Developed a tool that allows restaurants to authenticate their Square point-of-sale systems and retrieve transaction data using the Square API.",
      "Implemented features for date range selection and CSV export, prioritizing simplicity and speed.",
      "Created a seamless authentication flow, intuitive filtering, and minimalist UI aligned with client vision.",
    ],
    techStack: ["React.js", "Square API", "Node.js", "Express.js", "OAuth", "CSV Export"],
    image: "https://plus.unsplash.com/premium_photo-1675998427577-a9bcda85d01e?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 2,
    title: "Hashbot AI Platform",
    shortDescription: "AI-driven platform integrating chatbots with vector embeddings for intelligent responses based on article library.",
    description: [
      "Built an AI-driven platform that integrates chatbots providing intelligent, contextually relevant responses based on a library of articles.",
      "Leveraged vector embeddings to enable the chatbot to analyze and respond to user queries with accurate information from the article database.",
      "Implemented WebSockets for real-time communication and developed an SDK for easy integration with external websites.",
      "Created an admin dashboard for managing articles, themes, and sections, with automatic embedding generation."
    ],
    techStack: ["React.js", "Node.js", "WebSockets", "Vector Embeddings", "AI", "SDK", "Admin Dashboard"],
    image: "https://images.unsplash.com/photo-1677442133720-83eef073cfe8?q=80&w=2052&auto=format&fit=crop"
  },
  {
    id: 3,
    title: "Restaurant POS System",
    shortDescription: "Comprehensive POS system for 500+ restaurant locations with advanced order management features.",
    description: [
      "Developed a comprehensive POS system to streamline restaurant operations for 500+ locations.",
      "Implemented shift management, table handling, custom item addition, multi-role management, and advanced printing systems.",
      "Created integration with mobile apps, payment terminals, and kitchen display screens to improve operational efficiency.",
      "Built support for complex order management including discounts, promotions, delivery assignment, and barcode scanning."
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Payment Terminal Integration", "Printing Systems", "Mobile App Integration"],
    image: "https://images.unsplash.com/photo-1590674608573-84d71778afde?q=80&w=2070&auto=format&fit=crop"
  },
  {
    id: 4,
    title: "Shorty Chrome Extension",
    shortDescription: "Productivity Chrome extension that tracks keyboard shortcut usage with real-time stats and leaderboard.",
    description: [
      "Developed a sleek Google Chrome Extension using React.js to help users improve productivity.",
      "Implemented tracking of keyboard shortcut usage, providing real-time stats and a clean UI for learning new shortcuts.",
      "Created a global leaderboard displaying rankings based on shortcut usage with real-time tracking.",
      "Built a curated list of popular shortcuts with explanations and usage examples, along with dark/light mode support."
    ],
    techStack: ["React.js", "Chrome Extension APIs", "Tailwind CSS", "LocalStorage", "Real-time Tracking"],
    image: "https://images.unsplash.com/photo-1616469832301-e6d396843c1a?q=80&w=2070&auto=format&fit=crop"
  }
];

const ProjectsSection = () => {
  const [filter, setFilter] = useState("all");
  
  const filters = [
    { id: "all", label: "All Projects" },
    { id: "ai", label: "AI Projects" },
    { id: "web", label: "Web Apps" },
    { id: "pos", label: "POS Systems" },
  ];

  // In a real implementation, we would filter based on tags in the project data
  const filteredProjects = projects;

  return (
    <section id="projects" className="bg-white section-padding">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Projects</h2>
          <div className="h-1 w-20 bg-portfolio-primary mx-auto mb-6"></div>
          <p className="text-lg text-portfolio-gray max-w-3xl mx-auto">
            Take a look at some of the projects I've worked on. Each project represents my commitment to quality,
            innovation, and solving real business problems.
          </p>
        </div>
        
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
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              title={project.title}
              shortDescription={project.shortDescription}
              description={project.description}
              techStack={project.techStack}
              image={project.image}
            />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <a 
            href="#contact" 
            className="inline-block bg-portfolio-primary hover:bg-blue-600 text-white font-medium py-3 px-8 rounded-md transition duration-300 shadow-md hover:shadow-lg"
          >
            Let's Work Together
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
