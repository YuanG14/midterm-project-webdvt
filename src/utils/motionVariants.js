/**
 * Shared Framer Motion variants for Phase 7 (Animations & Micro-Interactions).
 * Centralized here so the same timing/easing is reused instead of being
 * redefined in every component that needs a page or modal animation.
 */

// Matches the existing --ease-premium cubic-bezier already used for CSS
// transitions across the app, so Framer Motion animations feel consistent
// with the rest of the UI.
export const EASE_PREMIUM = [0.16, 1, 0.3, 1];

// Page-level enter/exit: fade + a small upward drift, used for route
// transitions between Dashboard / Add Transaction / Transaction Detail /
// Summary.
export const pageTransitionVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_PREMIUM } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE_PREMIUM } },
};

// Reduced-motion variant: fade only, no movement.
export const pageTransitionVariantsReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

// Modal backdrop fade.
export const modalOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: EASE_PREMIUM } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: EASE_PREMIUM } },
};

// Modal dialog: fade + gentle scale, matching the app's existing
// rounded-card, shadow-float presentation.
export const modalContentVariants = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: EASE_PREMIUM } },
  exit: { opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.15, ease: EASE_PREMIUM } },
};
