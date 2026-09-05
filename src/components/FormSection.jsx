function FormSection({ icon: Icon, title, description, children }) {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-3">
        {Icon && (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-[var(--radius-control)] bg-[var(--color-ice-surface)] text-[var(--color-primary-dark)]">
            <Icon className="h-4 w-4" strokeWidth={2} />
          </span>
        )}
        <div>
          <h3 className="font-display text-[15px] font-bold tracking-[-0.015em] text-[var(--color-ink)]">
            {title}
          </h3>
          {description && <p className="mt-0.5 text-[13px] text-[var(--color-ink-soft)]">{description}</p>}
        </div>
      </div>

      <div className="flex flex-col gap-5">{children}</div>
    </div>
  );
}

export default FormSection;
