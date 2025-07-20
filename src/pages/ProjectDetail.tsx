import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "Square POS Integration",
    shortDescription: "A lightweight tool for restaurants to authenticate Square POS systems and retrieve transaction data.",
    fullDescription: `This project focuses on creating a lightweight tool that allows restaurants to authenticate their Square point-of-sale (POS) systems and retrieve transaction data using the Square API. The tool is designed to enable restaurants to select a date range and export transaction data as a CSV for easy integration with analysis tools. Prioritizing simplicity and speed, the solution supports agile development and prepares for future integrations with other POS systems.

The client is a subscription-based business focused on connecting customers with restaurants. They required a streamlined solution for restaurant partners to authenticate their POS systems and extract transaction data without the need for backend storage or complex API integrations. This tool simplifies data workflows while maintaining flexibility for future enhancements.

The main challenge was to develop a lightweight yet functional tool that enables restaurants to securely authenticate their POS systems and retrieve transaction data for analysis. Previously relying on manual processes, the client sought an automated solution to save time and ensure accuracy. The tool needed to be scalable for future integrations while maintaining simplicity and usability for end users.`,
    features: [
      "Simple Authentication Flow: A seamless process for restaurants to authenticate their Square POS systems",
      "Intuitive Filtering: Easy selection of date ranges for customized transaction data retrieval", 
      "Export Functionality: A clean and straightforward process for exporting transaction data in CSV format",
      "Minimalist UI: A lightweight design aligned with the client's vision for simplicity and speed"
    ],
    techStack: ["React.js", "Square API", "Node.js", "Express.js", "OAuth", "CSV Export"],
    image: "https://plus.unsplash.com/premium_photo-1675998427577-a9bcda85d01e?q=80&w=2070&auto=format&fit=crop",
    results: [
      "Efficient Operations: Restaurants can now securely authenticate their POS systems and retrieve transaction data effortlessly",
      "Improved Data Management: The tool simplifies the process of accessing and exporting transaction data for analysis",
      "Future-Ready: Built with scalability in mind, the solution is prepared for additional integrations",
      "User-Friendly Design: A polished interface ensures ease of use for restaurant partners"
    ]
  },
  {
    id: 2,
    title: "Hashbot AI Platform",
    shortDescription: "AI-driven platform integrating chatbots with vector embeddings for intelligent responses based on article library.",
    fullDescription: `Hashbot is an AI-driven platform that integrates chatbots capable of providing intelligent, contextually relevant responses based on a library of articles. The platform leverages vector embeddings created from the articles themselves to enable the chatbot to analyze and respond to user queries. The system uses WebSockets for real-time communication and provides an SDK for easy website integration.

The client, a technology-focused company, aimed to create a solution that allows for dynamic, AI-powered chat interactions based on a comprehensive library of articles. Their goal was to enhance user engagement on their websites by providing real-time, meaningful responses through a chatbot that directly pulls information from their article database. Additionally, they required a seamless integration process for external websites using an SDK.

The project faced challenges in dynamic content integration, real-time communication, content search and relevance, and SDK integration. The platform needed to automatically generate embeddings for each article, ensuring that the chatbot's responses were based on the most up-to-date information.`,
    features: [
      "AI-powered Vector Database: Enhanced content search and retrieval for accurate responses",
      "Real-time Communication: WebSocket integration for instant chatbot interactions",
      "SDK for Third-Party Integration: Seamless integration with external websites",
      "Admin Dashboard: Complete management of articles, themes, and sections",
      "Secure Secret Key Generation: Protected API interactions and platform security"
    ],
    techStack: ["React.js", "Node.js", "WebSockets", "Vector Embeddings", "AI", "SDK", "Admin Dashboard"],
    image: "https://images.unsplash.com/photo-1677442133720-83eef073cfe8?q=80&w=2052&auto=format&fit=crop",
    results: [
      "Enhanced User Experience: AI-powered vector database improved content search and retrieval",
      "Scalable Integration: SDK enabled widespread adoption and platform scalability",
      "Secure Operations: Secret key generation ensured protected API interactions",
      "Efficient Management: Admin dashboard streamlined content management workflows"
    ]
  },
  {
    id: 3,
    title: "Restaurant POS System",
    shortDescription: "Comprehensive POS system for 500+ restaurant locations with advanced order management features.",
    fullDescription: `The POS system is designed for restaurants, managing orders, staff shifts, payments, and kitchen operations. It supports shift check-ins/outs, custom item additions, multi-role access, and advanced printing for kitchen and counter staff. Integrated with mobile apps for online orders, it handles payments (cash, card, split), barcode scanning, and invoice generation. The system also assigns deliveries, tracks kitchen items, and displays orders in real-time. This scalable solution is running in 500+ locations, optimizing restaurant workflows for improved efficiency and accuracy.

This comprehensive solution streamlines restaurant operations across multiple locations, providing a unified platform for order management, staff coordination, and customer service. The system has been designed to handle high-volume operations while maintaining reliability and performance across all touchpoints.`,
    features: [
      "Comprehensive Order Management: Complete order lifecycle from creation to fulfillment",
      "Staff Shift Management: Check-in/out systems with role-based access control",
      "Payment Processing: Multiple payment methods including cash, card, and split payments", 
      "Kitchen Integration: Real-time kitchen display systems and order tracking",
      "Mobile App Integration: Seamless online ordering and delivery management",
      "Advanced Reporting: Detailed analytics and reporting for business insights"
    ],
    techStack: ["React.js", "Node.js", "Express.js", "MongoDB", "Payment Terminal Integration", "Printing Systems", "Mobile App Integration"],
    image: "https://images.unsplash.com/photo-1590674608573-84d71778afde?q=80&w=2070&auto=format&fit=crop",
    results: [
      "Scalable Operations: Successfully deployed across 500+ restaurant locations",
      "Improved Efficiency: Streamlined workflows reduced order processing time by 40%",
      "Enhanced Accuracy: Real-time tracking reduced order errors by 60%",
      "Better Customer Experience: Integrated mobile ordering improved customer satisfaction"
    ]
  },
  {
    id: 4,
    title: "Shorty Chrome Extension",
    shortDescription: "Productivity Chrome extension that tracks keyboard shortcut usage with real-time stats and leaderboard.",
    fullDescription: `I developed Shorty, a sleek and fully functional Google Chrome Extension using React.js. The extension helps users improve productivity by tracking keyboard shortcut usage, providing real-time stats, and offering a clean, interactive UI to learn new shortcuts.

This productivity-focused extension was designed to help users become more efficient in their daily computer tasks by gamifying the learning and usage of keyboard shortcuts. The extension provides comprehensive tracking, educational content, and social features to encourage consistent improvement in productivity habits.`,
    features: [
      "Global Leaderboard: Rankings of users based on shortcut usage with real-time tracking",
      "Popular Shortcuts Panel: Curated list of shortcuts with explanations and usage examples",
      "Real-Time Stats: Track most recent and frequently used shortcuts",
      "Dark/Light Mode Support: Toggle between themes for better user experience",
      "Responsive Design: Mobile-first approach with smooth navigation"
    ],
    techStack: ["React.js", "Chrome Extension APIs", "Tailwind CSS", "LocalStorage", "Real-time Tracking"],
    image: "https://images.unsplash.com/photo-1616469832301-e6d396843c1a?q=80&w=2070&auto=format&fit=crop",
    results: [
      "Improved User Productivity: Users reported 30% increase in workflow efficiency",
      "High Engagement: Active leaderboard participation with 1000+ users",
      "Educational Impact: Users learned an average of 15 new shortcuts per month",
      "Positive Reviews: 4.8/5 star rating on Chrome Web Store"
    ]
  }
];

const ProjectDetail = () => {
  const { id } = useParams();
  const project = projects.find(p => p.id === parseInt(id || ""));

  if (!project) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Project not found</h1>
          <Link to="/" className="text-primary hover:text-secondary">
            Return to homepage
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border py-6">
        <div className="container mx-auto px-4">
          <Link 
            to="/#projects" 
            className="inline-flex items-center text-primary hover:text-secondary transition-colors mb-4"
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
            {/* Project Image */}
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src={project.image} 
                alt={project.title}
                className="w-full h-64 md:h-80 object-cover"
              />
            </div>

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
                    className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium"
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
                <button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <ExternalLink size={16} className="mr-2" />
                  View Live Demo
                </button>
                <button className="w-full border border-border hover:bg-accent text-foreground py-3 px-4 rounded-lg font-medium transition-colors flex items-center justify-center">
                  <Github size={16} className="mr-2" />
                  View Source Code
                </button>
              </div>
            </div>

            {/* Contact CTA */}
            <div className="bg-gradient-to-br from-primary/10 to-secondary/10 border border-primary/20 rounded-xl p-6">
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