
import { Award, ExternalLink, Calendar } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const CertificatesSection = () => {
  const certificates = [
    {
      title: "AWS Certified Solutions Architect",
      issuer: "Amazon Web Services",
      date: "2023",
      description: "Professional certification in cloud architecture and AWS services",
      skills: ["AWS", "Cloud Architecture", "Serverless"],
      credentialId: "AWS-CSA-2023",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Google Cloud Professional Developer",
      issuer: "Google Cloud",
      date: "2023",
      description: "Expertise in developing scalable applications on Google Cloud Platform",
      skills: ["Google Cloud", "Cloud Functions", "GCP"],
      credentialId: "GCP-DEV-2023",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "React Developer Certification",
      issuer: "Meta",
      date: "2022",
      description: "Advanced React.js development patterns and best practices",
      skills: ["React", "JavaScript", "Frontend"],
      credentialId: "META-REACT-2022",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Full Stack JavaScript Developer",
      issuer: "freeCodeCamp",
      date: "2022",
      description: "Comprehensive full-stack development with MERN stack",
      skills: ["Node.js", "MongoDB", "Express", "React"],
      credentialId: "FCC-FULLSTACK-2022",
      image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "Python for Data Science",
      issuer: "IBM",
      date: "2021",
      description: "Data analysis and machine learning with Python",
      skills: ["Python", "Data Science", "Machine Learning"],
      credentialId: "IBM-PYTHON-2021",
      image: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    },
    {
      title: "MongoDB Developer Certification",
      issuer: "MongoDB University",
      date: "2021",
      description: "Database design and development with MongoDB",
      skills: ["MongoDB", "Database", "NoSQL"],
      credentialId: "MONGO-DEV-2021",
      image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&q=80"
    }
  ];

  return (
    <section id="certificates" className="bg-gray-50 section-padding">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Certifications & Achievements</h2>
          <div className="h-1 w-20 bg-portfolio-primary mx-auto mb-6"></div>
          <p className="text-lg text-portfolio-gray max-w-3xl mx-auto">
            Professional certifications that validate my expertise in modern web development,
            cloud technologies, and software engineering best practices.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certificates.map((cert, index) => (
            <Card key={index} className="card-hover group overflow-hidden">
              <div className="relative">
                <img 
                  src={cert.image} 
                  alt={cert.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-4 right-4">
                  <Award className="text-white h-6 w-6 drop-shadow-lg" />
                </div>
              </div>
              
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-bold text-portfolio-secondary group-hover:text-portfolio-primary transition-colors">
                  {cert.title}
                </CardTitle>
                <CardDescription className="text-portfolio-gray font-medium">
                  {cert.issuer}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <p className="text-sm text-portfolio-gray line-clamp-2">
                  {cert.description}
                </p>
                
                <div className="flex items-center text-sm text-portfolio-gray">
                  <Calendar size={16} className="mr-2" />
                  <span>Earned in {cert.date}</span>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {cert.skills.map((skill, skillIndex) => (
                    <Badge key={skillIndex} variant="secondary" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <div className="pt-2 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-portfolio-gray font-mono">
                      ID: {cert.credentialId}
                    </span>
                    <button className="flex items-center text-portfolio-primary hover:text-portfolio-secondary transition-colors text-sm font-medium">
                      <span>Verify</span>
                      <ExternalLink size={14} className="ml-1" />
                    </button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <div className="bg-white p-8 rounded-lg shadow-md inline-block">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <Award className="text-portfolio-primary h-8 w-8" />
              <div>
                <h3 className="text-xl font-bold text-portfolio-secondary">6+ Professional Certifications</h3>
                <p className="text-portfolio-gray">Continuously learning and staying updated with latest technologies</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificatesSection;
