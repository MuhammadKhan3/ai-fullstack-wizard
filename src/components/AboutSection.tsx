
import { Trophy, Users, Zap, Check, Award, Briefcase, Gift, Clock } from "lucide-react";
import ProfilePicture from "./ProfilePicture";

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
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="hidden md:block mb-6">
              <ProfilePicture size="lg" className="shadow-xl" />
            </div>
            
            <p className="text-lg">
              As a certified developer, I specialize in creating responsive web applications and robust backend systems.
              My expertise spans monolithic architectures, microservices, and AI-powered systems,
              delivering impactful results across a wide range of industries.
            </p>
            
            <div className="grid grid-cols-2 gap-6 w-full mt-8">
              {[
                { icon: Trophy, text: "25+ Projects Completed", color: "text-amber-500" },
                { icon: Zap, text: "5 AI Projects Completed", color: "text-blue-500" },
                { icon: Users, text: "Remote Pair-Programming", color: "text-green-500" },
                { icon: Award, text: "Top 10% in Web Development", color: "text-purple-500" }
              ].map((item, index) => (
                <div key={index} className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm card-hover">
                  <item.icon size={24} className={`${item.color} mr-3`} />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 bg-gray-50 p-6 rounded-lg mt-8 w-full">
              <h3 className="text-xl font-semibold mb-3 flex items-center">
                <Gift className="text-portfolio-primary mr-2" /> Why Hire Me?
              </h3>
              <ul className="space-y-3">
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
                  icon: Briefcase,
                  title: "Full Stack Development",
                  description: "Proficient in React.js, Node.js, Express.js, MySQL, and MongoDB, with expertise in creating responsive and user-friendly applications."
                },
                {
                  icon: Zap,
                  title: "AI & Machine Learning",
                  description: "Generative AI and Retrieval-Augmented Generation (RAG) for advanced AI solutions."
                },
                {
                  icon: Gift,
                  title: "SaaS Platforms",
                  description: "Built scalable, AI-integrated platforms tailored to business needs."
                },
                {
                  icon: Clock,
                  title: "Cloud Deployment",
                  description: "Experience with AWS, Google Cloud Functions, and serverless architectures."
                }
              ].map((item, index) => (
                <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-white rounded-full shadow-sm mr-3">
                      <item.icon size={20} className="text-portfolio-primary" />
                    </div>
                    <h4 className="font-semibold text-lg text-portfolio-secondary">{item.title}</h4>
                  </div>
                  <p className="text-portfolio-gray pl-10">{item.description}</p>
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
