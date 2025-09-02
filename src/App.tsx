import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import InteractiveFrame from "./components/InteractiveFrame";
import Navigation from "./components/Navigation";
import ScrollProgress from "./components/ScrollProgress";
import AboutSection from "./components/AboutSection";
import ProjectsSection from "./components/ProjectsSection";
import ContactSection from "./components/ContactSection";
import { ThemeProvider } from "./components/ThemeProvider";

export default function App() {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className="size-full overflow-x-hidden">
        {/* Fixed elements */}
        <ScrollProgress />
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />

      {/* Hero Section */}
      <section id="hero" className="h-screen relative">
        <InteractiveFrame />
        
        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{
            y: [0, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          <motion.div
            className="text-muted-foreground text-3xl cursor-pointer"
            whileHover={{ 
              scale: 1.2, 
              color: "var(--foreground)",
              y: 5
            }}
            onClick={() => {
              document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            ↓
          </motion.div>
        </motion.div>
      </section>

      {/* Other sections */}
      <AboutSection />
      <ProjectsSection />
      <ContactSection />

      {/* Footer */}
      <motion.footer
        className="bg-card text-card-foreground py-8 px-6 text-center border-t border-border"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="max-w-4xl mx-auto">
          <motion.p
            className="text-muted-foreground mb-4"
            whileHover={{ color: "var(--foreground)" }}
          >
            © 2024 Vemula Moksha. Crafted with 💜 and lots of ☕
          </motion.p>
          
          <motion.div
            className="flex justify-center space-x-6"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {['Privacy', 'Terms', 'Cookies'].map((item, index) => (
              <motion.a
                key={item}
                href="#"
                className="text-muted-foreground hover:text-foreground transition-colors"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
              >
                {item}
              </motion.a>
            ))}
          </motion.div>
        </div>
      </motion.footer>

      {/* Back to top button */}
      <motion.button
        className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full flex items-center justify-center shadow-lg z-40"
        onClick={() => {
          window.scrollTo({ top: 0, behavior: 'smooth' });
          setActiveSection('hero');
        }}
        initial={{ opacity: 0, scale: 0 }}
        animate={{
          opacity: activeSection !== 'hero' ? 1 : 0,
          scale: activeSection !== 'hero' ? 1 : 0,
        }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        ↑
      </motion.button>

      {/* Cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-foreground/20 rounded-full pointer-events-none z-50 mix-blend-difference"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        style={{
          left: 0,
          top: 0,
        }}
      />
    </div>
    </ThemeProvider>
  );
}