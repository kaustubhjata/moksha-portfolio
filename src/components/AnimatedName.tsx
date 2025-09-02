import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface AnimatedNameProps {
  name: string;
  className?: string;
  position?: 'split' | 'normal';
}

export default function AnimatedName({ name, className = "", position = "normal" }: AnimatedNameProps) {
  const [letterFonts, setLetterFonts] = useState<string[]>([]);

  // Array of 80+ different font families
  const fonts = [
    'serif',
    'sans-serif',
    'monospace',
    'cursive',
    'fantasy',
    'Georgia',
    'Times',
    'Times New Roman',
    'Arial',
    'Arial Black',
    'Helvetica',
    'Helvetica Neue',
    'Courier',
    'Courier New',
    'Verdana',
    'Trebuchet MS',
    'Impact',
    'Comic Sans MS',
    'Palatino',
    'Garamond',
    'Bookman',
    'Avant Garde',
    'system-ui',
    'ui-serif',
    'ui-sans-serif',
    'ui-monospace',
    'Tahoma',
    'Geneva',
    'Lucida Grande',
    'Lucida Sans Unicode',
    'Franklin Gothic Medium',
    'Segoe UI',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro',
    'Raleway',
    'Poppins',
    'Nunito',
    'Ubuntu',
    'Merriweather',
    'Playfair Display',
    'Oswald',
    'Lobster',
    'Dancing Script',
    'Pacifico',
    'Righteous',
    'Orbitron',
    'Bebas Neue',
    'Quicksand',
    'Fjalla One',
    'Bodoni MT',
    'Century Gothic',
    'Copperplate',
    'Didot',
    'Futura',
    'Gill Sans',
    'Hoefler Text',
    'Optima',
    'Perpetua',
    'Rockwell',
    'Snell Roundhand',
    'Brush Script MT',
    'Chalkboard',
    'Marker Felt',
    'Papyrus',
    'Zapfino',
    'American Typewriter',
    'Bradley Hand',
    'Chalkduster',
    'Herculanum',
    'Party LET',
    'Savoye LET',
    'Trattatello',
    'Verdana',
    'Webdings',
    'Wingdings',
    'Zapf Dingbats',
    'Apple Chancery',
    'Big Caslon',
    'Bodoni 72',
    'Bodoni 72 Oldstyle',
    'Bodoni 72 Smallcaps',
    'Bradley Hand ITC',
    'Brush Script Std',
    'Chalkboard SE',
    'Copperplate Gothic',
    'Copperplate Gothic Bold',
    'Copperplate Gothic Light'
  ];

  // Initialize fonts for each letter
  useEffect(() => {
    const initialFonts = name.split('').map(() => 
      fonts[Math.floor(Math.random() * fonts.length)]
    );
    setLetterFonts(initialFonts);
  }, [name]);

  // Change fonts every 200 milliseconds (much slower)
  useEffect(() => {
    const interval = setInterval(() => {
      setLetterFonts(prev => 
        prev.map(() => fonts[Math.floor(Math.random() * fonts.length)])
      );
    }, 300);

    return () => clearInterval(interval);
  }, []);

  if (position === 'split') {
    const nameParts = name.split(' ');
    const firstName = nameParts[0];
    const lastName = nameParts.slice(1).join(' ');
    
    return (
      <div className="flex justify-between items-center w-full">
        {/* First name (Vemula) - Left side */}
        <motion.div
          className={`leading-[normal] select-none text-7xl ${className}`}
          initial={{ y: 20, opacity: 0, x: -50 }}
          animate={{ y: 0, opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.5,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          {firstName.split('').map((letter, index) => (
            <motion.span
              key={`first-${letter}-${index}`}
              style={{
                fontFamily: letterFonts[index] || 'serif',
                display: 'inline-block',
              }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, Math.random() * 4 - 2, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 1
              }}
              whileHover={{
                scale: 1.2,
                color: "#ff6b6b",
                textShadow: "0px 0px 10px rgba(255,107,107,0.8)",
                transition: { duration: 0.1 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>

        {/* Last name (Moksha) - Right side */}
        <motion.div
          className={`leading-[normal] select-none text-5xl ${className}`}
          initial={{ y: 20, opacity: 0, x: 50 }}
          animate={{ y: 0, opacity: 1, x: 0 }}
          transition={{ 
            delay: 0.7,
            type: "spring",
            stiffness: 200,
            damping: 20
          }}
        >
          {lastName.split('').map((letter, index) => (
            <motion.span
              key={`last-${letter}-${index}`}
              style={{
                fontFamily: letterFonts[index + firstName.length] || 'serif',
                display: 'inline-block',
              }}
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, Math.random() * 4 - 2, 0],
              }}
              transition={{
                duration: 0.1,
                repeat: Infinity,
                repeatType: "reverse",
                delay: Math.random() * 1
              }}
              whileHover={{
                scale: 1.2,
                color: "#ff6b6b",
                textShadow: "0px 0px 10px rgba(255,107,107,0.8)",
                transition: { duration: 0.1 }
              }}
            >
              {letter}
            </motion.span>
          ))}
        </motion.div>
      </div>
    );
  }

  // Normal positioning (original behavior)
  return (
    <motion.p
      className={`leading-[normal] select-none text-5xl ${className}`}
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ 
        delay: 0.5,
        type: "spring",
        stiffness: 200,
        damping: 20
      }}
    >
      {name.split('').map((letter, index) => (
        <motion.span
          key={`${letter}-${index}`}
          style={{
            fontFamily: letterFonts[index] || 'serif',
            display: 'inline-block',
          }}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, Math.random() * 4 - 2, 0],
          }}
          transition={{
            duration: 0.1,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 1
          }}
          whileHover={{
            scale: 1.2,
            color: "#ff6b6b",
            textShadow: "0px 0px 10px rgba(255,107,107,0.8)",
            transition: { duration: 0.1 }
          }}
        >
          {letter === ' ' ? '\u00A0' : letter}
        </motion.span>
      ))}
    </motion.p>
  );
}