import { useState, useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';
import imgImage1 from "figma:asset/ebcece0a7f343cd6f39c2bc8ed714b8b19a7f7c6.png";
import AnimatedName from './AnimatedName';

export default function InteractiveFrame() {
  const [isHovered, setIsHovered] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Mouse position tracking
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // Spring physics for smooth animations
  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);
  
  // Transform mouse position for parallax effects
  const backgroundX = useTransform(x, [-500, 500], [-20, 20]);
  const backgroundY = useTransform(y, [-500, 500], [-10, 10]);
  const textRotateX = useTransform(y, [-500, 500], [5, -5]);
  const textRotateY = useTransform(x, [-500, 500], [-5, 5]);
  
  // Handle mouse movement
  const handleMouseMove = (event: React.MouseEvent) => {
    if (!containerRef.current) return;
    
    const rect = containerRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    mouseX.set(event.clientX - centerX);
    mouseY.set(event.clientY - centerY);
  };

  return (
    <motion.div
      ref={containerRef}
      className="bg-gradient-to-b from-[#11111107] from-[10.577%] relative size-full to-[#6e68793d] to-[79.327%] via-[#64616933] via-[55.769%] overflow-hidden cursor-none"
      data-name="Desktop - 5"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
    >
      <div className="relative size-full">
        {/* Animated background image with parallax */}
        <motion.div
          className="absolute bg-center bg-cover bg-no-repeat h-full left-0 opacity-40 top-0 w-full"
          data-name="image 1"
          style={{ 
            backgroundImage: `url('${imgImage1}')`,
            x: backgroundX,
            y: backgroundY,
            scale: isHovered ? 1.05 : 1
          }}
          transition={{ duration: 0.3 }}
        />
        
        {/* Secondary layer with physics animation */}
        <motion.div
          className="absolute h-full left-0 top-0 w-full"
          data-name="image 2"
          style={{
            x: useTransform(x, [-500, 500], [-5, 5]),
            y: useTransform(y, [-500, 500], [-3, 3]),
          }}
        />
        
        {/* Main text with 3D physics effects */}
        <motion.div
          className="absolute flex flex-col font-['Kristi',_sans-serif] h-[564px] italic justify-center leading-[0] left-[720px] text-[140px] text-center text-white top-[412px] translate-x-[-50%] translate-y-[-50%] w-[844px]"
          style={{
            rotateX: textRotateX,
            rotateY: textRotateY,
            transformPerspective: 1000,
          }}
          whileHover={{
            scale: 1.1,
            textShadow: "0px 0px 20px rgba(255,255,255,0.8)",
            transition: { type: "spring", stiffness: 300, damping: 20 }
          }}
          drag
          dragConstraints={{ left: -100, right: 100, top: -50, bottom: 50 }}
          dragElastic={0.2}
          whileDrag={{ scale: 1.05, rotate: 2 }}
        >
          <AnimatedName name="Vemula Moksha" />
        </motion.div>
        
        {/* Top overlay with breathing animation */}
        <motion.div
          className="absolute bg-[rgba(27,27,27,0.7)] h-[30%] left-0 opacity-[0.15] top-0 w-full"
          animate={{
            opacity: [0.15, 0.25, 0.15],
            scale: [1, 1.01, 1],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Floating particles */}
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + i * 10}%`,
            }}
            animate={{
              y: [-10, 10, -10],
              x: [-5, 5, -5],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
        
        {/* Interactive cursor follower */}
        <motion.div
          className="absolute w-4 h-4 bg-white/30 rounded-full blur-sm pointer-events-none"
          style={{
            x: useTransform(x, (value) => value * 0.1),
            y: useTransform(y, (value) => value * 0.1),
            left: '50%',
            top: '50%',
            translateX: '-50%',
            translateY: '-50%',
          }}
          animate={isHovered ? {
            scale: [1, 1.5, 1],
            opacity: [0.3, 0.6, 0.3],
          } : {
            scale: 0,
            opacity: 0,
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>
      
      {/* Preserved border */}
      <div aria-hidden="true" className="absolute border-b-[3px] border-[rgba(30,30,30,0.94)] border-solid inset-0 pointer-events-none" />
      
      {/* Physics spring indicators */}
      <motion.div
        className="absolute top-4 left-4 text-white/50 text-sm font-mono"
        style={{ opacity: isHovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
      >
        <div>Mouse X: {Math.round(mouseX.get())}</div>
        <div>Mouse Y: {Math.round(mouseY.get())}</div>
        <div className="mt-2 text-xs">Drag the text • Move your mouse</div>
      </motion.div>
    </motion.div>
  );
}
