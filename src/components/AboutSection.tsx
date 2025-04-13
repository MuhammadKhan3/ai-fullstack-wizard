
import { Trophy, Users, Zap, Check } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="bg-white section-padding">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">About Me</h2>
          <div className="h-1 w-20 bg-portfolio-primary mx-auto mb-6"></div>
          <p className="text-lg text-portfolio-gray max-w-3xl mx-auto">
            A seasoned Full Stack Developer and GEN AI Engineer with over 4 years of experience,
            specializing in building robust and scalable solutions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <p className="text-lg">
              As a certified developer, I specialize in creating responsive web applications and robust backend systems.
              My expertise spans monolithic architectures, microservices, and AI-powered systems,
              delivering impactful results across a wide range of industries.
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: Trophy, text: "25+ Projects Completed" },
                { icon: Zap, text: "5 AI Projects Completed" },
                { icon: Users, text: "Remote Pair-Programming" },
                { icon: Check, text: "Top 10% in Web Development" }
              ].map((item, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <item.icon size={20} className="text-portfolio-primary" />
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4">
              <h3 className="text-xl font-semibold mb-3">Why Hire Me?</h3>
              <ul className="space-y-2">
                {[
                  "Quality support and communication",
                  "Respond quickly to client messages",
                  "Very straight and to the point",
                  "Never make fake commitments"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check size={20} className="text-green-500 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-portfolio-primary/10 to-portfolio-accent/10 rounded-lg p-8 border border-gray-100 shadow-lg">
            <h3 className="text-2xl font-bold mb-6 heading-gradient">Key Expertise</h3>
            
            <div className="space-y-6">
              {[
                {
                  title: "Full Stack Development",
                  description: "Proficient in React.js, Node.js, Express.js, MySQL, and MongoDB, with expertise in creating responsive and user-friendly applications."
                },
                {
                  title: "AI & Machine Learning",
                  description: "Generative AI and Retrieval-Augmented Generation (RAG) for advanced AI solutions."
                },
                {
                  title: "SaaS Platforms",
                  description: "Built scalable, AI-integrated platforms tailored to business needs."
                },
                {
                  title: "Cloud Deployment",
                  description: "Experience with AWS, Google Cloud Functions, and serverless architectures."
                }
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0 last:pb-0">
                  <h4 className="font-semibold text-lg text-portfolio-secondary mb-2">{item.title}</h4>
                  <p className="text-portfolio-gray">{item.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
