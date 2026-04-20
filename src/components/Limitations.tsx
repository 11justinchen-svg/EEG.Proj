import { ArrowRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import limitations from "../data/limitations.json";

export default function Limitations() {
  return (
    <section
      id="limits"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 09"
            eyebrow="Intellectual honesty"
            title={
              <>
                Limitations
                <br />
                <span className="italic text-slate-400">
                  & future directions.
                </span>
              </>
            }
            kicker="Every limitation is accompanied by a mitigation. This is where the project's assumptions are made legible — and where the next year of work is scoped."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {limitations.map((lim, i) => (
            <ScrollReveal key={lim.title} delay={Math.min(i * 60, 360)}>
              <article className="glass hair-shadow rounded-lg p-6 h-full flex flex-col transition-all hover:-translate-y-0.5 hover:border-white/25">
                <div className="flex items-start justify-between mb-4">
                  <span className="mono text-[0.62rem] tracking-[0.22em] text-slate-500">
                    LIM · {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="w-2 h-2 rounded-full bg-rose-400/60 mt-1.5 shadow-[0_0_8px_rgba(251,113,133,0.55)]" />
                </div>
                <h3 className="font-display text-xl text-white leading-tight">
                  {lim.title}
                </h3>
                <p className="mt-3 text-sm text-slate-400 leading-relaxed">
                  {lim.limitation}
                </p>
                <div className="mt-auto pt-4 border-t border-white/5 flex gap-3 items-start">
                  <ArrowRight
                    size={13}
                    className="text-teal-glow mt-0.5 flex-shrink-0"
                  />
                  <div>
                    <div className="mono text-[0.62rem] tracking-[0.22em] text-teal-glow">
                      MITIGATION
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed mt-1">
                      {lim.mitigation}
                    </p>
                  </div>
                </div>
              </article>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
