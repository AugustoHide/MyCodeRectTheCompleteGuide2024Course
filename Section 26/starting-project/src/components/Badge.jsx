import { motion } from "framer-motion";

export default function Badge({ caption }) {
  return (
    <motion.span
      transition={{ duration: 0.3 }}
      animate={{ scale: [1, 1.2, 1] }}
      className="badge"
    >
      {caption}
    </motion.span>
  );
}
