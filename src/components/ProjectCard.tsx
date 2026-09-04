import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, useReducedMotion } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp, ArrowUpRight } from "lucide-react";

interface ProjectCardProps {
  id: number;
  index?: number;
  title: string;
  shortDescription: string;
  description: string[];
  techStack: string[];
  image?: string;
  images?: string[];
}

const ProjectCard = ({
  id,
  index = 0,
  title,
  shortDescription,
  description,
  techStack,
  image,
  images,
}: ProjectCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const reduceMotion = useReducedMotion();

  // second screenshot (if available) cross-fades in on hover
  const hoverImage = images && images.length > 1 ? images.find((src) => src !== image) : undefined;

  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 28 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, amount: 0.2 },
        transition: { duration: 0.5, ease: "easeOut", delay: (index % 2) * 0.1 },
      };

  return (
    <motion.div
      {...reveal}
      whileHover={reduceMotion ? undefined : { y: -8 }}
      style={{ transformPerspective: 1000 }}
      className="group relative flex flex-col bg-white rounded-2xl overflow-hidden border border-primary/10 shadow-md transition-shadow duration-300 hover:shadow-2xl hover:shadow-portfolio-primary/10 hover:border-portfolio-primary/30"
    >
      {/* animated brand gradient accent line on hover */}
      <span className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-portfolio-primary to-portfolio-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 z-20" />

      {image && (
        <div className="relative h-64 overflow-hidden bg-gray-50">
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
          {hoverImage && (
            <img
              src={hoverImage}
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            />
          )}
          {/* darkening overlay for the quick-view affordance */}
          <div className="absolute inset-0 bg-gradient-to-t from-portfolio-dark/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          {/* index badge */}
          <span className="absolute top-3 left-3 z-10 text-xs font-bold tracking-wider text-white bg-portfolio-primary/90 backdrop-blur-sm px-2.5 py-1 rounded-full shadow">
            {String(id).padStart(2, "0")}
          </span>
          {/* quick view chip */}
          <Link
            to={`/project/${id}`}
            aria-label={`View ${title} details`}
            className="absolute bottom-3 right-3 z-10 flex items-center gap-1 text-xs font-semibold text-portfolio-primary bg-white/95 backdrop-blur-sm px-3 py-1.5 rounded-full shadow translate-y-3 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-500"
          >
            Quick view <ArrowUpRight size={14} />
          </Link>
        </div>
      )}

      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-xl font-bold mb-2 text-portfolio-secondary group-hover:text-portfolio-primary transition-colors duration-300">
          {title}
        </h3>
        <p className="text-portfolio-gray mb-4">{shortDescription}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          {techStack.slice(0, 5).map((tech) => (
            <span
              key={tech}
              className="text-xs font-medium px-2.5 py-1 rounded-full bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/15"
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

        <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? "max-h-96" : "max-h-0"}`}>
          <div className="space-y-3 mb-4 text-sm">
            {description.map((paragraph, idx) => (
              <p key={idx}>{paragraph}</p>
            ))}
          </div>

          {techStack.length > 5 && isExpanded && (
            <div className="mt-4">
              <h4 className="text-sm font-semibold mb-2">Tech Stack:</h4>
              <div className="flex flex-wrap gap-2">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs font-medium px-2.5 py-1 rounded-full bg-portfolio-accent/10 text-portfolio-accent border border-portfolio-accent/15"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center mt-auto pt-4 border-t border-gray-100">
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
            className="text-sm flex items-center font-medium text-portfolio-primary hover:text-portfolio-secondary transition-colors group/link"
          >
            <span>View Details</span>
            <ExternalLink size={16} className="ml-1 transition-transform duration-300 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectCard;
