import { ArrowUpRight, MousePointer2, Sparkles } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { ParticleField } from "@/components/playground/particle-field";
import { CodeTerminal } from "@/components/playground/code-terminal";

export function Playground() {
  return (
    <section
      id="playground"
      aria-labelledby="playground-heading"
      className="section relative border-t border-line/40"
    >
      <div
        className="aurora aurora-electric left-[18%] top-[24%] h-[380px] w-[620px]"
        aria-hidden="true"
      />

      <div className="container-shell relative">
        <SectionHeading
          index="05"
          eyebrow="Playground"
          title={
            <span id="playground-heading">
              Bend the{" "}
              <span className="font-serif font-normal italic tracking-[-0.02em] text-gradient-soft">
                field.
              </span>
            </span>
          }
          description="A small, self-contained experiment: one canvas, one cursor, no animation libraries. Motion can be lightweight and still feel alive."
          action={
            <span className="chip">
              <Sparkles className="h-3 w-3 text-cyan-glow" aria-hidden="true" />
              Real interaction, not a video
            </span>
          }
        />

        <div className="mt-12 grid items-stretch gap-4 lg:grid-cols-[1.12fr_0.88fr]">
          <Reveal className="min-w-0">
            <ParticleField />
          </Reveal>

          <div className="flex min-w-0 flex-col gap-4">
            <Reveal delay={0.06} className="min-w-0 flex-1">
              <CodeTerminal />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="card-surface rounded-2xl p-5">
                <div className="flex items-center gap-2">
                  <MousePointer2 className="h-3.5 w-3.5 text-cyan-glow/80" aria-hidden="true" />
                  <h3 className="font-mono text-[0.56rem] uppercase tracking-[0.18em] text-mist">
                    Interaction notes
                  </h3>
                </div>
                <p className="mt-3 text-[0.78rem] leading-relaxed text-mist">
                  The field pauses when it leaves the viewport, caps its device pixel ratio and falls
                  back to a still frame when reduced motion is requested. Touch input works without
                  hijacking scroll.
                </p>
                <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line/60 pt-4">
                  {[
                    ["Canvas 2D", "Render"],
                    ["Zero", "Dependencies"],
                    ["A11y", "Aware"],
                  ].map(([value, label]) => (
                    <div key={label} className="flex flex-col-reverse text-center">
                      <dt className="mt-1 font-mono text-[0.46rem] uppercase tracking-[0.14em] text-mist">
                        {label}
                      </dt>
                      <dd className="font-mono text-[0.78rem] text-frost">{value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Reveal>

            <Reveal delay={0.16}>
              <a
                href="#contact"
                className="group flex items-center justify-between gap-3 rounded-2xl border border-line/60 bg-raised px-5 py-4 transition-colors hover:border-cyan-glow/25 hover:bg-raised-strong"
              >
                <span>
                  <span className="block text-[0.82rem] font-medium text-frost">
                    Want this kind of care in a product?
                  </span>
                  <span className="mt-0.5 block text-[0.7rem] text-mist">
                    Let&apos;s talk about the interaction layer.
                  </span>
                </span>
                <ArrowUpRight
                  className="h-4 w-4 shrink-0 text-mist transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-cyan-glow"
                  aria-hidden="true"
                />
              </a>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
