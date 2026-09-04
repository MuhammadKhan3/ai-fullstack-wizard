
import { useLayoutEffect, useRef, useState } from "react";
import { Trophy, Users, Zap, Check, Award, Briefcase, Gift, Clock, Database } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ProfilePicture from "./ProfilePicture";
import FullStackVisual from "./fullstack/FullStackVisual";
import { EXPERTISE_LAYER_BY_INDEX, type LayerId } from "./fullstack/layers";
import { useIsMobile } from "@/hooks/use-mobile";

const AboutSection = () => {
  const reduceMotion = useReducedMotion();
  const isMobile = useIsMobile();
  const cardRef = useRef<HTMLDivElement>(null);
  const parallaxRef = useRef<HTMLDivElement>(null);
  const [activeLayer, setActiveLayer] = useState<LayerId | null>(null);

  // Staggered reveal for the expertise list (disabled for reduced-motion users).
  const containerVariants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
  };
  const reveal = reduceMotion
    ? {}
    : { initial: "hidden", whileInView: "show", viewport: { once: true, amount: 0.3 } };

  // GSAP scroll-driven parallax on the 3D backdrop for layered depth.
  useLayoutEffect(() => {
    if (reduceMotion || isMobile || !parallaxRef.current || !cardRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      gsap.fromTo(
        parallaxRef.current,
        { yPercent: -10 },
        {
          yPercent: 10,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        }
      );
    }, cardRef);
    return () => ctx.revert();
  }, [reduceMotion, isMobile]);

  return (
    <section id="about" className="bg-gradient-to-br from-portfolio-primary/5 to-portfolio-accent/10 section-padding border-y border-primary/20">
      <div className="container mx-auto">
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">About Me</h2>
          <div className="h-1 w-20 bg-gradient-to-r from-portfolio-primary to-portfolio-accent rounded-full mx-auto mb-6 shadow-lg"></div>
          <div className="space-y-4 max-w-4xl mx-auto">
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
                <span className="text-primary font-semibold">✅ Website Development</span>
              </div>
              <div className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
                <span className="text-primary font-semibold">✅ 3.5+ Years of Experience</span>
              </div>
              {/* <div className="bg-primary/10 border border-primary/30 px-4 py-2 rounded-full">
                <span className="text-primary font-semibold">✅ 20 Projects Completed</span>
              </div> */}
            </div>
            <p className="text-lg text-foreground/80 font-medium leading-relaxed">
              I'm a Full Stack Developer with 3.5+ years of experience building scalable, responsive, and production-ready web applications, backend systems, and business platforms. I specialize in REST APIs, third-party integrations, real-time applications, SDKs, AI-powered solutions, and enterprise systems.
              <br />
              <br />
              I've worked across POS printing modules & reporting dashboards, HRMS platforms, ERP/business management systems, admin portals, custom SDKs, Chrome extensions, real-time chat applications, EHR systems, inventory & asset management, and e-commerce platforms — spanning both modern JavaScript/TypeScript ecosystems (React, Next.js, Node.js, NestJS) and enterprise .NET applications (C#, ASP.NET Core MVC).
              <br />
              <br />
              I care about clean, maintainable architecture and turning business requirements into technical solutions that actually hold up in production.
            </p>
            <div className="flex justify-center">
              <a href="mailto:muhammadkh303@gmail.com" className="text-primary hover:text-portfolio-secondary transition-colors font-medium">
                📧 muhammadkh303@gmail.com
              </a>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6 flex flex-col items-center md:items-start">
            <div className="hidden md:block mb-6">
              <ProfilePicture size="lg" className="shadow-xl" />
            </div>
            
            <div className="grid grid-cols-2 gap-6 w-full mt-8">
              {[
                { icon: Trophy, text: "15+ Projects Completed", color: "text-portfolio-primary" },
                { icon: Zap, text: "2 AI Projects Completed", color: "text-portfolio-accent" },
                { icon: Users, text: "Agile Collaboration", color: "text-portfolio-primary" },
                { icon: Award, text: "Excellence in Web Development", color: "text-portfolio-accent" }
              ].map((item, index) => (
                 <div key={index} className="flex items-center p-4 bg-card border border-primary/20 rounded-lg shadow-md card-hover backdrop-blur-sm">
                  <item.icon size={24} className={`${item.color} mr-3`} />
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
            
            <div className="pt-4 bg-card border border-primary/30 p-6 rounded-lg mt-8 w-full shadow-lg backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3 flex items-center text-primary">
                <Gift className="text-portfolio-secondary mr-2" /> Why Hire Me?
              </h3>
              <ul className="space-y-3">
                {[
                  "Quality support and communication",
                  "Respond quickly to client messages",
                  "Very straight and to the point",
                  "Never make fake commitments"
                ].map((item, index) => (
                  <li key={index} className="flex items-start space-x-2">
                    <Check size={20} className="text-emerald-600 mt-1 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          
          <div
            ref={cardRef}
            className="relative overflow-hidden bg-gradient-to-br from-portfolio-primary/20 to-portfolio-accent/15 rounded-lg border-2 border-primary/30 shadow-xl backdrop-blur-sm"
          >
            {/* Interactive full-stack ecosystem visualization (decorative backdrop) */}
            <div ref={parallaxRef} className="absolute inset-0">
              <FullStackVisual activeLayer={activeLayer} />
            </div>

            {/* Readability scrim: softens the animation behind the text while
                letting it glow through at the corners. */}
            <div
              className="absolute inset-0 z-[1] pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  "radial-gradient(120% 110% at 25% 25%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0.55) 45%, rgba(255,255,255,0.18) 100%)",
              }}
            />

            {/* Content layered above the visualization */}
            <div className="relative z-10 p-8">
              <motion.h3
                className="text-2xl font-bold mb-6 heading-gradient"
                {...(reduceMotion
                  ? {}
                  : {
                      initial: { opacity: 0, y: 12 },
                      whileInView: { opacity: 1, y: 0 },
                      viewport: { once: true },
                      transition: { duration: 0.5, ease: "easeOut" },
                    })}
              >
                How I Deliver
              </motion.h3>

              <motion.div className="space-y-6" variants={containerVariants} {...reveal}>
                {[
                  {
                    icon: Briefcase,
                    title: "Full Ownership",
                    description: "I take a project from architecture to deployment, so there's no handoff friction between design, backend, and frontend."
                  },
                  {
                    icon: Database,
                    title: "Data You Can Trust",
                    description: "Schemas and queries designed to stay fast and reliable as records grow into the millions, not just in a demo."
                  },
                  {
                    icon: Gift,
                    title: "Built Around the Business",
                    description: "Platforms shaped around how the business actually operates, not a generic template bolted onto real workflows."
                  },
                  {
                    icon: Clock,
                    title: "Production-Grade",
                    description: "Deployment and infrastructure choices that hold up under real traffic and real users, not just a local build."
                  }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    variants={itemVariants}
                    onHoverStart={() => setActiveLayer(EXPERTISE_LAYER_BY_INDEX[index])}
                    onHoverEnd={() => setActiveLayer(null)}
                    whileHover={reduceMotion ? undefined : { y: -4, scale: 1.02, rotateX: 2, rotateY: -2 }}
                    style={{ transformPerspective: 600 }}
                    className="group border-b border-primary/20 pb-4 last:border-b-0 last:pb-0 -mx-2 px-2 rounded-md transition-shadow duration-300 hover:bg-primary/5 hover:shadow-[0_0_22px_-6px_rgba(14,165,233,0.55)]"
                  >
                    <div className="flex items-center mb-2">
                      <div className="p-2 bg-primary/10 border border-primary/30 rounded-full shadow-sm mr-3 transition-transform duration-300 group-hover:scale-110">
                        <item.icon size={20} className="text-primary" />
                      </div>
                      <h4 className="font-semibold text-lg text-primary">{item.title}</h4>
                    </div>
                    <p className="text-foreground/80 pl-10">{item.description}</p>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
