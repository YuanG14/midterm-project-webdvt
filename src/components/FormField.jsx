function FormField({ label, htmlFor, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="text-[13px] font-semibold text-[var(--color-ink)]">
        {label}
      </label>
      {children}
      {error ? (
        <p className="text-[12.5px] font-medium text-[var(--color-danger)]">{error}</p>
      ) : hint ? (
        <p className="text-[12.5px] text-[var(--color-ink-soft)]">{hint}</p>
      ) : null}
    </div>
  );
}

export default FormField;
