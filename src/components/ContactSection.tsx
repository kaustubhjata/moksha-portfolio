import React, { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';

export default function ContactSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsSubmitting(false);
    setFormData({ name: '', email: '', message: '' });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const socialLinks = [
    { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/in/vemula-moksha/', color: 'from-blue-600 to-blue-800' },
    { name: 'Email', icon: '📧', url: 'mailto:v.moksha3981@gmail.com', color: 'from-red-500 to-red-700' }
  ];

  return (
    <section
      id="contact"
      ref={containerRef}
      className="min-h-screen bg-gradient-to-b from-slate-900 to-black py-20 px-6 relative overflow-hidden"
    >
      {/* Animated background grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle, white 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }} />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-5xl font-bold text-white mb-4">Let's Connect</h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Ready to bring your ideas to life? Let's discuss your next project
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left side - Contact info and social links */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <ContactInfo 
                  icon="📍" 
                  label="Location" 
                  value="Hyderabad, India" 
                />
                <ContactInfo 
                  icon="📧" 
                  label="Email" 
                  value="v.moksha3981@gmail.com" 
                />
                <ContactInfo 
                  icon="📱" 
                  label="Phone" 
                  value="9014690146" 
                />
              </div>
            </div>

            {/* Social links */}
            <div>
              <h4 className="text-xl font-semibold text-white mb-6">Follow Me</h4>
              <div className="grid grid-cols-2 gap-4">
                {socialLinks.map((social, index) => (
                  <SocialCard key={social.name} social={social} index={index} />
                ))}
              </div>
            </div>

          </motion.div>

          {/* Right side - Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <AnimatedInput
                label="Name"
                type="text"
                value={formData.name}
                onChange={(value) => handleInputChange('name', value)}
                placeholder="Your full name"
                required
              />
              
              <AnimatedInput
                label="Email"
                type="email"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                placeholder="your.email@example.com"
                required
              />

              <AnimatedTextarea
                label="Message"
                value={formData.message}
                onChange={(value) => handleInputChange('message', value)}
                placeholder="Tell me about your project..."
                required
              />

              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white py-4 rounded-lg font-medium relative overflow-hidden"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                animate={isSubmitting ? {
                  backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
                } : {}}
                transition={{ duration: 2, repeat: isSubmitting ? Infinity : 0 }}
              >
                <motion.span
                  animate={isSubmitting ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                  transition={{ duration: 1, repeat: isSubmitting ? Infinity : 0 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.span>
                
                {!isSubmitting && (
                  <motion.span
                    className="ml-2"
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    →
                  </motion.span>
                )}
              </motion.button>
            </form>
          </motion.div>
        </div>

        {/* Floating interactive elements */}
        <div className="absolute inset-0 pointer-events-none">
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${20 + i * 10}%`,
              }}
              animate={{
                y: [-20, 20, -20],
                x: [-10, 10, -10],
                opacity: [0.3, 0.8, 0.3],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: 4 + i * 0.5,
                repeat: Infinity,
                delay: i * 0.5,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

interface ContactInfoProps {
  icon: string;
  label: string;
  value: string;
}

function ContactInfo({ icon, label, value }: ContactInfoProps) {
  return (
    <motion.div
      className="flex items-center space-x-4"
      whileHover={{ x: 10 }}
      transition={{ duration: 0.2 }}
    >
      <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-lg">
        {icon}
      </div>
      <div>
        <p className="text-white/70 text-sm">{label}</p>
        <p className="text-white">{value}</p>
      </div>
    </motion.div>
  );
}

interface SocialCardProps {
  social: {
    name: string;
    icon: string;
    url: string;
    color: string;
  };
  index: number;
}

function SocialCard({ social, index }: SocialCardProps) {
  return (
    <motion.a
      href={social.url}
      className={`bg-gradient-to-r ${social.color} p-4 rounded-lg text-white font-medium flex items-center space-x-3 group`}
      whileHover={{ scale: 1.05, y: -5 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 + index * 0.1 }}
    >
      <span className="text-xl">{social.icon}</span>
      <span className="group-hover:underline">{social.name}</span>
    </motion.a>
  );
}

interface AnimatedInputProps {
  label: string;
  type: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

function AnimatedInput({ label, type, value, onChange, placeholder, required }: AnimatedInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.label
        className="block text-white/90 mb-2 font-medium"
        animate={{ color: isFocused ? '#ffffff' : 'rgba(255,255,255,0.9)' }}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </motion.label>
      
      <motion.input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors"
        whileFocus={{ scale: 1.02 }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}

interface AnimatedTextareaProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  required?: boolean;
}

function AnimatedTextarea({ label, value, onChange, placeholder, required }: AnimatedTextareaProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <motion.label
        className="block text-white/90 mb-2 font-medium"
        animate={{ color: isFocused ? '#ffffff' : 'rgba(255,255,255,0.9)' }}
      >
        {label} {required && <span className="text-red-400">*</span>}
      </motion.label>
      
      <motion.textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        required={required}
        rows={4}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-white/5 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:outline-none focus:border-purple-400 transition-colors resize-none"
        whileFocus={{ scale: 1.02 }}
      />
      
      <motion.div
        className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400"
        initial={{ width: 0 }}
        animate={{ width: isFocused ? '100%' : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
}
