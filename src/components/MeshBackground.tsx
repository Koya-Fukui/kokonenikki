import React from 'react';
import { motion } from 'framer-motion';

interface MeshBackgroundProps {
  colors: string[];
}

const MeshBackground: React.FC<MeshBackgroundProps> = ({ colors }) => {
  // Ensure we always have at least 2 colors
  const safeColors = colors.length >= 2 ? colors : ['#E0F2FE', '#F3E8FF', '#FCE7F3'];

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden bg-white/50">
      <div className="absolute inset-0 bg-white/60 backdrop-blur-3xl z-10" />
      
      {/* Orb 1 */}
      <motion.div
        animate={{
          x: [0, 100, -50, 0],
          y: [0, -50, 50, 0],
          scale: [1, 1.2, 0.9, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[-10%] left-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70"
        style={{ backgroundColor: safeColors[0] }}
      />

      {/* Orb 2 */}
      <motion.div
        animate={{
          x: [0, -70, 50, 0],
          y: [0, 100, -50, 0],
          scale: [1, 1.1, 0.8, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-[-10%] right-[-10%] w-[70vw] h-[70vw] rounded-full mix-blend-multiply filter blur-[80px] opacity-70"
        style={{ backgroundColor: safeColors[1] }}
      />

      {/* Orb 3 (Optional) */}
      <motion.div
        animate={{
          x: [0, 60, -60, 0],
          y: [0, -40, 60, 0],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-[30%] left-[30%] w-[50vw] h-[50vw] rounded-full mix-blend-multiply filter blur-[60px] opacity-60"
        style={{ backgroundColor: safeColors[2] || safeColors[0] }}
      />
    </div>
  );
};

export default MeshBackground;