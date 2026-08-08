/**
 * Shared card frame for the Summary page's analytics panels (chart,
 * category breakdown). Purely a styling container — no data handling.
 */
function ChartCard({ children, className = "" }) {
  return (
    <div
      className={`animate-[fadeIn_0.5s_var(--ease-premium)] rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-5 shadow-[var(--shadow-card)] transition-shadow duration-300 hover:shadow-[var(--shadow-card-hover)] sm:p-6 ${className}`}
    >
      {children}
    </div>
  );
}

export default ChartCard;
