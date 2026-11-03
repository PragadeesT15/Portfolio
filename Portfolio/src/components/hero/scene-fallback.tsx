export function SceneFallback({ compact = false }: { compact?: boolean }) {
  return (
    <div className="absolute inset-0 grid place-items-center" aria-hidden="true">
      <div className={compact ? "relative h-[46%] w-[46%]" : "relative h-[58%] w-[58%]"}>
        <div
          className="absolute inset-0 rounded-full shadow-[inset_0_0_70px_var(--theme-orb-shadow)]"
          style={{
            background:
              "radial-gradient(circle at 35% 30%, var(--theme-orb-a), var(--theme-orb-b) 45%, var(--theme-orb-c) 78%)",
          }}
        />
        <div
          className="absolute inset-0 rounded-full blur-md"
          style={{
            background:
              "radial-gradient(circle at 72% 76%, var(--theme-glow-violet), transparent 48%)",
          }}
        />
        <div className="absolute -inset-6 animate-spin-slow rounded-full border border-dashed border-cyan-glow/25" />
        <div className="absolute -inset-14 rounded-full border border-violet-glow/15" />
        <div className="absolute left-1/2 top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-glow shadow-[0_0_30px_8px_var(--theme-orb-shadow)]" />
      </div>
    </div>
  );
}
