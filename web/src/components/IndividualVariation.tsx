import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import variation from "../data/variation.json";

function VariationScaffold({ seed }: { seed: number }) {
  const channels = 6 + (seed % 4);
  return (
    <svg viewBox="0 0 260 160" className="w-full h-auto">
      <defs>
        <clipPath id={`vc-${seed}`}>
          <path d="M 40 30 Q 90 10 170 22 Q 230 32 235 80 Q 240 130 180 145 Q 110 155 60 135 Q 20 100 40 30 Z" />
        </clipPath>
      </defs>
      <path
        d="M 40 30 Q 90 10 170 22 Q 230 32 235 80 Q 240 130 180 145 Q 110 155 60 135 Q 20 100 40 30 Z"
        fill="rgba(14,230,200,0.04)"
        stroke="rgba(14,230,200,0.4)"
      />
      <g clipPath={`url(#vc-${seed})`}>
        {Array.from({ length: channels }).map((_, i) => {
          const y = 35 + ((i * 18 + seed * 3) % 110);
          const curve = 10 + ((i * 11 + seed * 5) % 30);
          const w = 1.8 + ((i * 7 + seed) % 5) * 0.5;
          return (
            <path
              key={i}
              d={`M 30 ${y} Q 130 ${y + curve - 15} 245 ${y + 4}`}
              stroke="rgba(14,230,200,0.85)"
              strokeWidth={w}
              strokeLinecap="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 3px rgba(14,230,200,0.4))" }}
            />
          );
        })}
      </g>
    </svg>
  );
}

export default function IndividualVariation() {
  return (
    <section
      id="variation"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 06"
            eyebrow="Personalization"
            title={
              <>
                Same lesion, different brain,
                <br />
                <span className="italic text-slate-400">
                  different scaffold.
                </span>
              </>
            }
            kicker="Four subjects with near-identical lesion location received materially different scaffold architectures — because their baseline connectivity differed. The scaffold adapts to the network, not just the anatomy."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
          {variation.map((v, i) => {
            const seed = parseInt(v.subject.replace(/\D/g, "")) || i + 1;
            return (
              <ScrollReveal key={v.subject} delay={i * 120}>
                <article className="glass hair-shadow rounded-lg p-5 h-full flex flex-col">
                  <header className="flex items-center justify-between mb-4">
                    <div>
                      <div className="eyebrow">Subject</div>
                      <div className="font-display text-2xl text-white leading-none mt-1">
                        {v.subject}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="mono text-[0.62rem] tracking-[0.22em] text-slate-500">
                        NRE
                      </div>
                      <div className="mono text-xl text-teal-glow tabular-nums leading-none mt-1">
                        {v.nre.toFixed(2)}
                      </div>
                    </div>
                  </header>
                  <div className="rounded-sm border border-white/5 bg-ink-900/60 p-3">
                    <VariationScaffold seed={seed} />
                  </div>
                  <dl className="mt-4 text-sm flex-1">
                    <dt className="eyebrow mb-1">Primary channels</dt>
                    <dd className="text-slate-200 leading-relaxed">
                      {v.primary_channels}
                    </dd>
                  </dl>
                  <p className="mt-4 pt-4 border-t border-white/5 text-xs text-slate-400 leading-relaxed">
                    <span className="text-teal-glow mr-1">▸</span>
                    {v.note}
                  </p>
                </article>
              </ScrollReveal>
            );
          })}
        </div>

        <ScrollReveal>
          <p className="mt-12 font-display italic text-slate-200/90 text-xl md:text-2xl max-w-3xl">
            Scaffold design should be personalized to the patient's functional
            brain organization — not just the anatomy of the lesion.
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
