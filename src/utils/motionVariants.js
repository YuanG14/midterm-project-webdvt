export const EASE_PREMIUM = [0.16, 1, 0.3, 1];

export const pageTransitionVariants = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.28, ease: EASE_PREMIUM } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.18, ease: EASE_PREMIUM } },
};

export const pageTransitionVariantsReduced = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.15 } },
  exit: { opacity: 0, transition: { duration: 0.1 } },
};

export const modalOverlayVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2, ease: EASE_PREMIUM } },
  exit: { opacity: 0, transition: { duration: 0.15, ease: EASE_PREMIUM } },
};

export const modalContentVariants = {
  initial: { opacity: 0, scale: 0.96, y: 8 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.22, ease: EASE_PREMIUM } },
  exit: { opacity: 0, scale: 0.97, y: 4, transition: { duration: 0.15, ease: EASE_PREMIUM } },
};
