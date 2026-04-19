import { Brain, Activity, GitBranch } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import modalities from "../data/modalities.json";

const icons = { Brain, Activity, GitBranch } as const;

const accentStyles: Record<number, string> = {
  1: "from-slate-100/10 to-transparent border-slate-200/15",
  2: "from-violet-glow/10 to-transparent border-violet-glow/30",
  3: "from-teal-glow/10 to-transparent border-teal-glow/40",
};

const accentText: Record<number, string> = {
  1: "text-slate-200",
  2: "text-violet-glow",
  3: "text-teal-glow",
};

export default function ThreeModalities() {
  return (
    <section
      id="modalities"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 02"
            eyebrow="Three modalities, one scaffold"
            title={
              <>
                Three imaging modalities,
                <br />
                <span className="italic text-slate-400">one scaffold.</span>
              </>
            }
            kicker="Each modality answers a question the others cannot. The scaffold is the only artifact that contains all three answers simultaneously."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-3 gap-5 md:gap-6">
          {modalities.map((m, i) => {
            const Icon =
              (icons as Record<string, typeof Brain>)[m.icon] ?? Brain;
            return (
              <ScrollReveal key={m.name} delay={i * 120}>
                <article
                  className={`relative h-full glass hair-shadow rounded-lg p-7 overflow-hidden
                    bg-gradient-to-b ${accentStyles[m.index]}
                    transition-all duration-500 hover:-translate-y-1 hover:border-white/25`}
                >
                  <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-white/5 blur-3xl pointer-events-none" />
                  <header className="flex items-start justify-between mb-8">
                    <span
                      className={`mono text-[0.7rem] tracking-[0.28em] ${accentText[m.index]}`}
                    >
                      0{m.index} ·{" "}
                      <span className="text-slate-400">MODALITY</span>
                    </span>
                    <div
                      className={`w-11 h-11 grid place-items-center rounded-md border border-white/10 bg-white/[0.02] ${accentText[m.index]}`}
                    >
                      <Icon size={18} strokeWidth={1.6} />
                    </div>
                  </header>
                  <h3 className="font-display text-3xl text-white leading-tight">
                    {m.name}
                  </h3>

                  <dl className="mt-6 space-y-5 text-sm">
                    <div>
                      <dt className="eyebrow mb-1">Measures</dt>
                      <dd className="text-slate-200 leading-relaxed">
                        {m.measures}
                      </dd>
                    </div>
                    <div>
                      <dt
                        className={`mono text-[0.72rem] tracking-[0.22em] uppercase mb-1 ${accentText[m.index]}`}
                      >
                        Gives scaffold
                      </dt>
                      <dd className="text-slate-100 leading-relaxed">
                        {m.gives}
                      </dd>
                    </div>
                    <div className="pt-3 border-t border-white/5">
                      <dt className="mono text-[0.72rem] tracking-[0.22em] uppercase mb-1 text-slate-500">
                        Cannot provide
                      </dt>
                      <dd className="text-slate-500 leading-relaxed text-[0.9rem]">
                        {m.cannot}
                      </dd>
                    </div>
                  </dl>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <p className="mt-14 text-center font-display italic text-slate-200/90 text-xl md:text-2xl">
            No single modality is sufficient.{" "}
            <span className="text-teal-glow not-italic font-sans font-semibold tracking-tight">
              The fusion is the innovation.
            </span>
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
