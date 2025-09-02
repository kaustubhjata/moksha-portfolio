import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useInView } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export default function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const skills = [
    { name: "Figma", level: 95, color: "from-pink-400 to-pink-600", carColor: "#A259FF" },
    { name: "UI/UX Design", level: 95, color: "from-purple-400 to-purple-600", carColor: "#8B5CF6" },
    { name: "Java", level: 90, color: "from-red-400 to-red-600", carColor: "#E11D48" },
    { name: "Python", level: 80, color: "from-yellow-400 to-yellow-600", carColor: "#FFD43B" },
    { name: "React", level: 70, color: "from-blue-400 to-blue-600", carColor: "#61DAFB" }
  ];

  return (
    <section
      id="about"
      ref={containerRef}
      className="min-h-screen bg-background py-20 px-6 relative overflow-hidden"
    >
      {/* Background particles */}
      <div className="absolute inset-0">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-foreground/10 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{ y: [-20, 20, -20], opacity: [0.1, 0.5, 0.1] }}
            transition={{
              duration: 4 + Math.random() * 2,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-foreground mb-4">About Me</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Hey there 👋 I’m Vemula Moksha — a motivated, detail-loving UI/UX designer who’s all about 
            mixing creativity with code. I’m super excited about joining Techolution as an intern so I can 
            dive into human-centered design, user research, and interactive prototyping. My goal? Team up 
            with awesome folks, tackle fun challenges, and craft experiences that aren’t just good-looking 
            but actually meaningful and impactful ✨
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left side - Image */}
          <motion.div style={{ y, opacity }} className="relative">
            <motion.div
              className="relative rounded-2xl overflow-hidden"
              whileHover={{ scale: 1.02, rotateY: 5 }}
              transition={{ duration: 0.3 }}
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1753715613373-90b1ea010731?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&q=80&w=1080"
                alt="Developer workspace"
                className="w-full h-96 object-cover"
              />
            </motion.div>
          </motion.div>

          {/* Right side - Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <p className="text-lg text-foreground/80 leading-relaxed">
                When I’m not designing or coding, you’ll probably find me geeking out on new tools, 
                experimenting with creative animations, or just brainstorming ways to make tech more fun 
                and people-friendly 😄
              </p>
            </div>

            {/* Skills */}
            <div className="space-y-6">
              <h3 className="text-2xl font-semibold text-foreground mb-6">🏁 Skills</h3>
              {skills.map((skill, index) => (
                <F1SkillRace key={skill.name} skill={skill} index={index} isInView={isInView} />
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mt-8">
              {[
                { label: "Projects", value: "5+", icon: "🚀" },
                { label: "Experience", value: "3+ years", icon: "⭐" }
              ].map((stat, index) => (
                <motion.div
                  key={stat.label}
                  className="bg-card backdrop-blur-sm rounded-lg p-4 text-center border border-border"
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.8 + index * 0.1 }}
                >
                  <div className="text-2xl mb-2">{stat.icon}</div>
                  <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

interface F1SkillRaceProps {
  skill: { name: string; level: number; color: string; carColor: string };
  index: number;
  isInView: boolean;
}

function F1SkillRace({ skill, index, isInView }: F1SkillRaceProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.8, delay: 0.5 + index * 0.1 }}
      className="space-y-3"
    >
      <div className="flex justify-between items-center text-foreground/90">
        <span className="font-medium">{skill.name}</span>
        <div className="flex items-center space-x-2">
          <span className="text-sm bg-muted px-2 py-1 rounded">{skill.level}%</span>
          <motion.span
            className="text-xs"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            🏎️
          </motion.span>
        </div>
      </div>

      {/* Racetrack container */}
      <div className="relative h-8 bg-muted/50 rounded-full overflow-hidden border-2 border-border">
        <div className="absolute inset-0 flex items-center">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="h-1 bg-foreground/20 rounded"
              style={{ width: '8px', marginLeft: '8px' }}
              animate={{ opacity: [0.2, 0.6, 0.2], scaleX: [1, 1.2, 1] }}
              transition={{ duration: 0.8, delay: i * 0.05, repeat: Infinity }}
            />
          ))}
        </div>

        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${skill.color} opacity-30`}
          initial={{ width: 0 }}
          animate={isInView ? { width: `${skill.level}%` } : { width: 0 }}
          transition={{ duration: 2, delay: 0.7 + index * 0.2, ease: "easeOut" }}
        />

        {/* F1 Car */}
        <motion.div
          className="absolute top-1/2 transform -translate-y-1/2 text-2xl z-10"
          style={{ color: skill.carColor }}
          initial={{ left: "0%" }}
          animate={isInView ? { left: `${skill.level - 8}%` } : { left: "0%" }}
          transition={{ duration: 2.5, delay: 0.7 + index * 0.2, ease: "easeOut" }}
        >
          <motion.div
            animate={{ rotateZ: [0, 2, -2, 0], scaleX: [-1, -1.05, -1] }}
            transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
          >
            🏎️
          </motion.div>

          <motion.div
            className="absolute -left-8 top-1/2 transform -translate-y-1/2"
            animate={isInView ? { opacity: [0, 1, 0], scaleX: [0, 1, 0] } : { opacity: 0 }}
            transition={{ duration: 0.3, repeat: Infinity, delay: 1 + index * 0.2 }}
          >
            <div className="flex space-x-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="w-1 h-1 bg-foreground/40" style={{ animationDelay: `${i * 0.1}s` }} />
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* Chequered Flag */}
        <motion.div
          className="absolute right-1 top-1/2 transform -translate-y-1/2 text-lg"
          initial={{ opacity: 0, scale: 0 }}
          animate={isInView ? { opacity: 1, scale: 1, rotate: [0, 10, -10, 0] } : { opacity: 0, scale: 0 }}
          transition={{ duration: 0.5, delay: 1.5 + index * 0.2, rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}
        >
          🏁
        </motion.div>

        <motion.div
          className="absolute right-0 top-0 bottom-0 w-1 bg-foreground/40"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: [0, 1, 0] } : { opacity: 0 }}
          transition={{ duration: 1, repeat: Infinity, delay: 2 + index * 0.2 }}
        />
      </div>
    </motion.div>
  );
}
