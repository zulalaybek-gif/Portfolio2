import { motion } from "motion/react";

interface Orb3DProps {
  size: number;
  color1: string;
  color2: string;
  color3: string;
  top?: string;
  left?: string;
  right?: string;
  bottom?: string;
  delay?: number;
  className?: string;
}

export function Orb3D({
  size,
  color1,
  color2,
  color3,
  top,
  left,
  right,
  bottom,
  delay = 0,
  className = "",
}: Orb3DProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay, ease: "easeOut" }}
      className={`absolute pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        top,
        left,
        right,
        bottom,
        borderRadius: "50%",
        background: `radial-gradient(circle at 30% 30%, ${color1}, ${color2} 50%, ${color3} 100%)`,
        boxShadow: `
          inset -${size * 0.15}px -${size * 0.15}px ${size * 0.3}px rgba(0,0,0,0.6),
          inset ${size * 0.08}px ${size * 0.08}px ${size * 0.2}px rgba(255,255,255,0.15),
          0 ${size * 0.1}px ${size * 0.4}px rgba(0,0,0,0.4)
        `,
      }}
    >
      {/* Highlight */}
      <div
        style={{
          position: "absolute",
          top: "15%",
          left: "20%",
          width: "35%",
          height: "25%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(255,255,255,0.4) 0%, transparent 70%)",
          filter: "blur(4px)",
        }}
      />
    </motion.div>
  );
}

export function FloatingShape({
  className = "",
  delay = 0,
}: {
  className?: string;
  delay?: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.4, delay, ease: "easeOut" }}
      className={`absolute pointer-events-none ${className}`}
    >
      <motion.div
        animate={{ y: [-8, 8, -8], rotate: [0, 3, -3, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        style={{
          width: 220,
          height: 80,
          borderRadius: "50px",
          background:
            "linear-gradient(135deg, rgba(120,180,120,0.6) 0%, rgba(40,80,50,0.8) 50%, rgba(20,40,30,0.9) 100%)",
          boxShadow:
            "inset -10px -10px 20px rgba(0,0,0,0.5), inset 5px 5px 15px rgba(150,200,150,0.2), 0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "20%",
            left: "15%",
            width: "40%",
            height: "30%",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(200,230,200,0.3) 0%, transparent 70%)",
            filter: "blur(6px)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
