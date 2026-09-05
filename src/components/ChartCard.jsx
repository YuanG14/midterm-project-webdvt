function ChartCard({ children, className = "" }) {
  return (
    <div
      className={`animate-[fadeIn_0.5s_var(--ease-premium)] rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-6 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] ${className}`}
    >
      {children}
    </div>
  );
}

export default ChartCard;
