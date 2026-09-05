import { useEffect } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { CheckCircle2, Trash2, X } from "lucide-react";

const ICONS = {
  success: CheckCircle2,
  danger: Trash2,
};

const TONE_CLASSES = {
  success: "bg-[var(--color-success)]/10 text-[var(--color-success-dark)]",
  danger: "bg-[var(--color-danger)]/10 text-[var(--color-danger)]",
};

const AUTO_DISMISS_MS = 3200;

function Toast({ message, tone = "success", onDismiss }) {
  const shouldReduceMotion = useReducedMotion();
  const Icon = ICONS[tone] ?? CheckCircle2;

  useEffect(() => {
    if (!message) return undefined;
    const timer = setTimeout(onDismiss, AUTO_DISMISS_MS);
    return () => clearTimeout(timer);
  }, [message, onDismiss]);

  return (
    <div
      aria-live="polite"
      className="pointer-events-none fixed inset-x-0 bottom-5 z-50 flex justify-center px-4 sm:justify-end sm:pr-8"
    >
      <AnimatePresence>
        {message && (
          <motion.div
            role="status"
            className="pointer-events-auto flex items-center gap-3 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-surface)] py-2.5 pl-2.5 pr-3 shadow-[var(--shadow-float)]"
            initial={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.16, 1, 0.3, 1] } }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: 6, transition: { duration: 0.15 } }}
          >
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                TONE_CLASSES[tone] ?? TONE_CLASSES.success
              }`}
            >
              <Icon className="h-3.5 w-3.5" strokeWidth={2.25} />
            </span>
            <p className="text-[13px] font-medium text-[var(--color-ink)]">{message}</p>
            <button
              type="button"
              onClick={onDismiss}
              aria-label="Dismiss notification"
              className="ml-1 flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[var(--color-ink-soft)] transition-colors duration-150 hover:bg-[var(--color-surface-hover)] hover:text-[var(--color-ink)]"
            >
              <X className="h-3.5 w-3.5" strokeWidth={2} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Toast;
