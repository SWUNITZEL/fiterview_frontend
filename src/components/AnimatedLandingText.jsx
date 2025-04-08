// components/AnimatedLandingText.jsx
import { motion } from "framer-motion";

const lines = [
  "생기부 기반 맞춤 질문",
  "다양한 성격의 면접관",
  "AI 분석까지 한 번에!",
];

export function AnimatedLandingText() {
  return (
    <div className="center-screen">
      {lines.map((line, i) => (
        <motion.h1
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 1.5, duration: 1 }}
          className="text-4xl md:text-6xl font-extrabold my-2 bg-gradient-to-r from-pink-400 via-rose-400 to-pink-500 bg-clip-text text-transparent"
        >
          {line}
        </motion.h1>
      ))}
    </div>
  );
}
