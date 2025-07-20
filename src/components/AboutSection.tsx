
import { Trophy, Users, Zap, Check, Award, Briefcase, Gift, Clock } from "lucide-react";
import ProfilePicture from "./ProfilePicture";

const AboutSection = () => {
  return (
    <section id="about" className="bg-gradient-to-br from-primary/5 to-secondary/10 section-padding border-y border-primary/20">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mx-auto mb-6 shadow-lg"></div>
          <p className="text-lg text-foreground/80 max-w-3xl mx-auto font-medium">
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
                 <div key={index} className="flex items-center p-4 bg-card border border-primary/20 rounded-lg shadow-md card-hover backdrop-blur-sm">
                  <item.icon size={24} className={`${item.color} mr-3`} />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 bg-card border border-primary/30 p-6 rounded-lg mt-8 w-full shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center text-primary">
                <Gift className="text-secondary mr-2" /> Why Hire Me?
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
          
          <div className="bg-gradient-to-br from-primary/20 to-secondary/15 rounded-lg p-8 border-2 border-primary/30 shadow-xl backdrop-blur-sm">
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
                <div key={index} className="border-b border-primary/20 pb-4 last:border-b-0 last:pb-0">
                  <div className="flex items-center mb-2">
                    <div className="p-2 bg-primary/10 border border-primary/30 rounded-full shadow-sm mr-3">
                      <item.icon size={20} className="text-primary" />
                    </div>
                    <h4 className="font-semibold text-lg text-primary">{item.title}</h4>
                  </div>
                  <p className="text-foreground/80 pl-10">{item.description}</p>
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
