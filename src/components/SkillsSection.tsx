import { useState } from "react";

type SkillCategory = {
  name: string;
  skills: { name: string; level: number }[];
};

const SkillsSection = () => {
  const [activeCategory, setActiveCategory] = useState("frontend");
  
  const skillCategories: SkillCategory[] = [
    {
      name: "frontend",
      skills: [
        { name: "JavaScript", level: 90 },
        { name: "TypeScript", level: 85 },
        { name: "React", level: 90 },
        { name: "Next.js", level: 85 },
        { name: "Redux", level: 80 },
        { name: "HTML5", level: 95 },
        { name: "CSS3", level: 90 },
        { name: "Tailwind CSS", level: 85 },
        { name: "Bootstrap", level: 80 },
        { name: "Ant Design", level: 75 },
        { name: "shadcn/ui", level: 85 },
      ],
    },
    {
      name: "backend",
      skills: [
        { name: "Node.js", level: 90 },
        { name: "Express.js", level: 85 },
        { name: "Nest.js", level: 80 },
        { name: "Python", level: 85 },
        { name: "Fast API", level: 80 },
        { name: ".NET / C#", level: 75 },
        { name: "MySQL", level: 85 },
        { name: "MongoDB", level: 90 },
        { name: "PostgreSQL", level: 80 },
        { name: "SQL Server", level: 75 },
        { name: "SQLite", level: 75 },
      ],
    },
    {
      name: "tools",
      skills: [
        { name: "Git", level: 90 },
        { name: "GitHub", level: 90 },
        { name: "VS Code", level: 95 },
        { name: "AWS", level: 80 },
        { name: "Google Cloud", level: 75 },
        { name: "Docker", level: 70 },
        { name: "CI/CD", level: 75 },
        { name: "Agile/Scrum", level: 85 },
        { name: "Jira", level: 80 },
        { name: "Figma", level: 70 },
        { name: "RAG / Agentic AI", level: 85 },
      ],
    }
  ];
  
  return (
    <section id="skills" className="bg-gray-50 section-padding">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">My Skills</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-portfolio-primary to-portfolio-accent rounded-full mx-auto mb-6"></div>
          <p className="text-lg text-portfolio-gray max-w-3xl mx-auto">
            I've honed my skills across various technologies and domains. Here's a comprehensive overview
            of my technical expertise.
          </p>
        </div>
        
        <div className="mb-12">
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {skillCategories.map((category) => (
              <button
                key={category.name}
                onClick={() => setActiveCategory(category.name)}
                className={`px-6 py-3 rounded-full capitalize font-medium transition-all ${
                  activeCategory === category.name
                    ? "bg-portfolio-primary text-white shadow-md"
                    : "bg-white hover:bg-gray-100 text-portfolio-gray"
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skillCategories
              .find((cat) => cat.name === activeCategory)
              ?.skills.map((skill, index) => (
                <div 
                  key={skill.name} 
                  style={{ animationDelay: `${index * 0.1}s` }}
                  className="bg-white p-6 rounded-lg shadow-md card-hover animate-fade-in"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium text-lg">{skill.name}</h3>
                    <span className="text-sm text-portfolio-primary font-semibold">
                      {skill.level}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 h-2.5 rounded-full">
                    <div
                      className="bg-gradient-to-r from-portfolio-primary to-portfolio-accent h-2.5 rounded-full"
                      style={{ width: `${skill.level}%` }}
                    ></div>
                  </div>
                </div>
              ))}
          </div>
        </div>
        
        {/* <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Achievements</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="text-5xl font-bold text-portfolio-primary mb-2">25+</div>
              <p className="text-lg">Projects Completed</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-portfolio-primary mb-2">5+</div>
              <p className="text-lg">AI Projects Delivered</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-portfolio-primary mb-2">1M+</div>
              <p className="text-lg">Transactions Handled</p>
            </div>
            <div className="text-center">
              <div className="text-5xl font-bold text-portfolio-primary mb-2">4+</div>
              <p className="text-lg">Years of Experience</p>
            </div>
          </div>
        </div> */}
      </div>
    </section>
  );
};

export default SkillsSection;
