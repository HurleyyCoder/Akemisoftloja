import { motion } from "framer-motion";

export function CyberGrid() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden perspective-1000">
      <motion.div 
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(168, 85, 247, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(168, 85, 247, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          transform: 'perspective(500px) rotateX(60deg) translateY(-100px) translateZ(-200px)',
          transformOrigin: 'top center',
        }}
        animate={{
          backgroundPosition: ['0px 0px', '0px 40px']
        }}
        transition={{
          repeat: Infinity,
          duration: 2,
          ease: "linear"
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
    </div>
  );
}