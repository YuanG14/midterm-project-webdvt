function PlaceholderPanel({ icon: Icon, label, hint }) {
  return (
    <div className="rounded-2xl border border-[var(--color-border-soft)] bg-[var(--color-surface)] p-10 shadow-[var(--shadow-card)]">
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-[var(--color-border-soft)] px-6 py-16 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--color-primary)]/10">
          <Icon className="h-5 w-5 text-[var(--color-primary-dark)]" strokeWidth={1.75} />
        </div>
        <p className="font-display text-sm font-semibold text-[var(--color-ink)]">
          {label}
        </p>
        <p className="mt-1.5 max-w-sm text-[13px] leading-relaxed text-[var(--color-ink-soft)]">
          {hint}
        </p>
      </div>
    </div>
  );
}

export default PlaceholderPanel;
