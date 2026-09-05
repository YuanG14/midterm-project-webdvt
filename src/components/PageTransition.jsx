import { motion, useReducedMotion } from "framer-motion";
import { pageTransitionVariants, pageTransitionVariantsReduced } from "../utils/motionVariants";

function PageTransition({ children }) {
  const shouldReduceMotion = useReducedMotion();
  const variants = shouldReduceMotion ? pageTransitionVariantsReduced : pageTransitionVariants;

  return (
    <motion.div initial="initial" animate="animate" exit="exit" variants={variants}>
      {children}
    </motion.div>
  );
}

export default PageTransition;
