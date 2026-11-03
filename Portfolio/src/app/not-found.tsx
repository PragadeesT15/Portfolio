import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden pb-20 pt-32">
      <div className="hero-grid" aria-hidden="true" />
      <div className="perspective-floor" aria-hidden="true" />
      <div
        className="aurora aurora-cyan left-[10%] top-[20%] h-[420px] w-[420px]"
        aria-hidden="true"
      />
      <div
        className="aurora aurora-violet right-[8%] bottom-[10%] h-[460px] w-[460px]"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <div className="mx-auto max-w-2xl text-center">
          <span className="chip mx-auto">ERR_ROUTE_NOT_FOUND</span>

          <p
            className="mt-8 select-none font-mono text-[clamp(6rem,22vw,13rem)] font-medium leading-none tracking-[-0.09em] text-transparent"
            style={{ WebkitTextStroke: "1px var(--theme-404)" }}
            aria-hidden="true"
          >
            404
          </p>

          <h1 className="mt-2 text-[clamp(2.2rem,5vw,3.6rem)] font-medium leading-[0.98] tracking-[-0.045em] text-frost">
            Signal <span className="font-serif font-normal italic text-gradient">lost.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-md text-[0.92rem] leading-relaxed text-mist">
            The page you were looking for drifted out of orbit. The good work is still one click away.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
            <Link href="/" className="btn btn-primary">
              <ArrowLeft className="h-4 w-4" aria-hidden="true" />
              Back home
            </Link>
            <Link href="/#projects" className="btn btn-ghost">
              Explore projects
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>

          <p className="mt-12 font-mono text-[0.55rem] uppercase tracking-[0.24em] text-mist">
            Coordinates recalibrated · 00.000 / 00.000
          </p>
        </div>
      </div>
    </section>
  );
}
