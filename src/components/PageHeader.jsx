import GradientMesh from "./GradientMesh";

function PageHeader({ eyebrow, title, description }) {
  return (
    <div className="relative mb-10">
      <GradientMesh />
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-primary-dark)]">
        {eyebrow}
      </p>
      <h1 className="font-display text-3xl font-bold tracking-tight text-[var(--color-ink)] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-xl text-[15px] leading-relaxed text-[var(--color-ink-soft)]">
        {description}
      </p>
    </div>
  );
}

export default PageHeader;
