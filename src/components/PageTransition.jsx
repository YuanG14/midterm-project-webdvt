import { motion, useReducedMotion } from "framer-motion";
import { pageTransitionVariants, pageTransitionVariantsReduced } from "../utils/motionVariants";

/**
 * Wraps the currently active route's page content with a subtle
 * fade + upward-drift entrance (and a quicker fade-out on exit).
 * Purely presentational — it renders `children` unchanged, so it
 * doesn't affect routing, data, or any page's own logic.
 *
 * Respects prefers-reduced-motion via Framer Motion's useReducedMotion
 * hook: motion-sensitive users get a plain fade instead of movement.
 */
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
