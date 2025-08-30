
import { useState } from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ChevronDown, ChevronUp } from "lucide-react";

interface ProjectCardProps {
  id: number;
  title: string;
  shortDescription: string;
  description: string[];
  techStack: string[];
  image?: string;
}

const ProjectCard = ({
  id,
  title,
  shortDescription,
  description,
  techStack,
  image,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300">
      {image && (
        <div className="h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-contain transition-transform duration-500 hover:scale-105"
          />
        </div>
      )}
      
      <div className="p-6">
        <h3 className="text-xl font-bold mb-2 text-portfolio-secondary">{title}</h3>
        <p className="text-portfolio-gray mb-4">{shortDescription}</p>
        
        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.slice(0, 5).map((tech) => (
            <span 
              key={tech} 
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800"
            >
              {tech}
            </span>
          ))}
          {techStack.length > 5 && (
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-gray-100 text-gray-800">
              +{techStack.length - 5} more
            </span>
          )}
        </div>

        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-96' : 'max-h-0'}`}>
          <div className="space-y-3 mb-4 text-sm">
            {description.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
          
          {techStack.length > 5 && isExpanded && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span 
                    key={tech} 
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-100 text-blue-800"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
        
        <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-100">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm flex items-center text-portfolio-primary hover:text-portfolio-secondary transition-colors"
          >
            {isExpanded ? (
              <>
                <span>Show Less</span>
                <ChevronUp size={16} className="ml-1" />
              </>
            ) : (
              <>
                <span>Read More</span>
                <ChevronDown size={16} className="ml-1" />
              </>
            )}
          </button>
          
          <Link
            to={`/project/${id}`}
            className="text-sm flex items-center text-portfolio-primary hover:text-portfolio-secondary transition-colors"
          >
            <span>View Details</span>
            <ExternalLink size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;
