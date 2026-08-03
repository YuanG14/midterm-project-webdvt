function GradientMesh() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 -top-24 -z-10 h-72 overflow-hidden"
    >
      <div
        className="absolute left-1/2 top-0 h-72 w-[42rem] -translate-x-1/2 rounded-full opacity-40 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-primary), transparent)",
        }}
      />
      <div
        className="absolute left-1/4 top-8 h-56 w-96 -translate-x-1/2 rounded-full opacity-30 blur-3xl"
        style={{
          background:
            "radial-gradient(closest-side, var(--color-accent), transparent)",
        }}
      />
    </div>
  );
}

export default GradientMesh;
