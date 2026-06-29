import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { projects } from "@/constants";
import ProjectGallery from "@/components/ProjectGallery";


const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id || ""));
  console.log('========================project=========================',project)
  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:text-portfolio-secondary">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  const handleNavigateProjectUrl=(url:string)=>{
     window.open(url, "_blank"); // "_blank" opens in a new tab
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <Link 
            to="/#projects" 
            className="inline-flex items-center text-primary hover:text-portfolio-secondary transition-colors mb-4"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Projects
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold text-foreground">{project.title}</h1>
          <p className="text-lg text-muted-foreground mt-2">{project.shortDescription}</p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Project Image Gallery */}
            <ProjectGallery
              images={project.images && project.images.length ? project.images : [project.image]}
              title={project.title}
            />

            {/* Description */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Project Overview</h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                {project.fullDescription.split('\n\n').map((paragraph, index) => (
                  <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>
                ))}
              </div>
            </section>

            {/* Features */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Key Features</h2>
              <div className="space-y-3">
                {project.features.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-muted-foreground">{feature}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Results */}
            <section>
              <h2 className="text-2xl font-bold mb-4 text-foreground">Results & Impact</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {project.results.map((result, index) => (
                  <div key={index} className="bg-card border border-border rounded-lg p-4">
                    <p className="text-sm text-muted-foreground">{result}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Tech Stack */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-foreground">Technology Stack</h3>
              <div className="flex flex-wrap gap-2">
                {project.techStack.map((tech) => (
                  <span 
                    key={tech}
                    className="bg-portfolio-accent/10 text-portfolio-accent px-3 py-1 rounded-full text-sm font-medium"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            {/* Project Actions */}
            <div className="bg-card border border-border rounded-xl p-6">
              <h3 className="text-xl font-bold mb-4 text-foreground">Project Links</h3>
              <div className="space-y-3">
                <button onClick={()=>handleNavigateProjectUrl(project.url)} className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <ExternalLink size={16} className="mr-2" />
                  View Live Demo
                </button>
                {/* <button className="w-full border border-border hover:bg-accent text-foreground py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Github size={16} className="mr-2" />
                  View Source Code
                </button> */}
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-portfolio-primary/10 to-portfolio-accent/10 border border-primary/20 rounded-xl p-6">
              <h3 className="text-xl font-bold mb-2 text-foreground">Interested in Similar Work?</h3>
              <p className="text-muted-foreground mb-4 text-sm">
                Let's discuss how I can help bring your project ideas to life.
              </p>
              <Link 
                to="/#contact"
                className="inline-block w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-4 rounded-lg font-medium transition-colors text-center"
              >
                Get In Touch
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;