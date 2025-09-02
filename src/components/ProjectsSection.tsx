import React, { useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useSpring } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Import project images
import teslaImage from '../assets/tesla-clone.png';
import mclarenImage from '../assets/mclaren-website.png';
import ocrImage from '../assets/ocr-project.png';

interface Project {
  id: number;
  title: string;
  description: string;
  image: string;
  tags: string[];
  color: string;
  link: string;
}

export default function ProjectsSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  const projects: Project[] = [
    {
      id: 1,
      title: "Tesla Website Clone",
      description:
        "This project is a high-fidelity clone of the official Tesla website, meticulously designed using Figma. The goal was to replicate the clean, modern, and minimalistic aesthetic that defines Tesla’s digital presence, while focusing on responsive design principles and intuitive user experience.",
      image: teslaImage,
      tags: ["Figma", "UI/UX", "Responsive Design"],
      color: "from-gray-700 to-black",
      link: "#"
    },
    {
      id: 2,
      title: "McLaren Website",
      description:
        "This project is a high-fidelity clone of the official McLaren supercar website, crafted in Figma to mirror the brand’s sleek, high-performance identity. The goal was to replicate the premium aesthetic and immersive browsing experience McLaren offers, with a strong focus on visual storytelling, smooth navigation, and luxury appeal.",
      image: mclarenImage,
      tags: ["Figma", "UI/UX", "Luxury Design"],
      color: "from-orange-500 to-red-600",
      link: "#"
    },
    {
      id: 3,
      title: "Image to Text Conversion using Python and Flask",
      description:
        "Developed a web application that extracts text from uploaded images using Optical Character Recognition (OCR) techniques. Implemented the backend with Python and Flask to handle image processing and text extraction. Designed an interactive frontend using HTML, CSS, and JavaScript, allowing users to upload images, view extracted text, and download the results as a text file.",
      image: ocrImage,
      tags: ["Python", "Flask", "OCR", "JavaScript"],
      color: "from-blue-500 to-purple-600",
      link: "#"
    }
  ];

  return (
    <section
      id="projects"
      ref={containerRef}
      className="min-h-screen bg-background py-20 px-6 relative"
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-4">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A showcase of my recent work and creative explorations
          </p>
        </motion.div>

        <div className="space-y-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              isHovered={hoveredProject === project.id}
              onHover={() => setHoveredProject(project.id)}
              onLeave={() => setHoveredProject(null)}
            />
          ))}
        </div>

        {/* Floating background animation */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-20 h-20 rounded-full bg-gradient-to-r from-primary/10 to-accent/10 blur-xl"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, 100, 0],
                y: [0, -100, 0],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 10 + Math.random() * 5,
                repeat: Infinity,
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  index: number;
  isInView: boolean;
  isHovered: boolean;
  onHover: () => void;
  onLeave: () => void;
}

function ProjectCard({ project, index, isInView, isHovered, onHover, onLeave }: ProjectCardProps) {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(mouseY, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(mouseX, { stiffness: 300, damping: 30 });

  const handleMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const mouseXPos = event.clientX - centerX;
    const mouseYPos = event.clientY - centerY;

    mouseX.set(mouseXPos / 10);
    mouseY.set(-mouseYPos / 10);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
    onLeave();
  };

  return (
    <motion.div
      className={`grid lg:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8, delay: index * 0.2 }}
    >
      {/* Project Image */}
      <motion.div
        className={index % 2 === 1 ? 'lg:col-start-2' : ''}
        style={{ rotateX, rotateY, transformPerspective: 1000 }}
        onMouseMove={handleMouseMove}
        onMouseEnter={onHover}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <div className="relative rounded-2xl overflow-hidden group cursor-pointer">
          <ImageWithFallback
            src={project.image}
            alt={project.title}
            className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>
      </motion.div>

      {/* Project Content */}
      <motion.div
        className={`space-y-6 ${index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}
        initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
        transition={{ duration: 0.8, delay: 0.4 + index * 0.2 }}
      >
        <div>
          <motion.h3 className="text-3xl font-bold text-white mb-4" whileHover={{ scale: 1.02 }}>
            {project.title}
          </motion.h3>
          <p className="text-lg text-white/80 leading-relaxed">{project.description}</p>
        </div>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag, tagIndex) => (
            <motion.span
              key={tag}
              className={`px-3 py-1 bg-gradient-to-r ${project.color} text-white rounded-lg text-sm`}
              initial={{ scale: 0 }}
              animate={isInView ? { scale: 1 } : { scale: 0 }}
              transition={{ duration: 0.5, delay: 0.6 + tagIndex * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              {tag}
            </motion.span>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
