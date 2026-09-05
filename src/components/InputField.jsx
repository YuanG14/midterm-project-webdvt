import { AlertCircle } from "lucide-react";

function InputField({ label, icon: Icon, htmlFor, error, hint, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={htmlFor} className="flex items-center gap-1.5 text-[13px] font-semibold text-[var(--color-ink)]">
        {Icon && <Icon className="h-3.5 w-3.5 text-[var(--color-ink-soft)]" strokeWidth={2} />}
        {label}
      </label>

      {children}

      {error ? (
        <p className="flex animate-[fadeIn_0.2s_ease-out] items-center gap-1.5 text-[12.5px] font-medium text-[var(--color-danger)]">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" strokeWidth={2} />
          {error}
        </p>
      ) : hint ? (
        <p className="text-[12.5px] text-[var(--color-ink-soft)]">{hint}</p>
      ) : null}
    </div>
  );
}

export default InputField;
