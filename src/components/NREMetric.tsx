import { useEffect, useRef, useState } from "react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import config from "../data/config.json";
import { useScrollReveal } from "../hooks/useScrollReveal";

const toneMap: Record<string, { bar: string; chip: string; label: string }> = {
  teal: {
    bar: "linear-gradient(90deg, rgba(14,230,200,0.9), rgba(34,211,238,0.7))",
    chip: "text-teal-glow border-teal-glow/40",
    label: "OPTIMAL",
  },
  slate: {
    bar: "linear-gradient(90deg, rgba(203,213,225,0.45), rgba(203,213,225,0.22))",
    chip: "text-slate-300 border-white/15",
    label: "BASELINE",
  },
  "slate-deep": {
    bar: "linear-gradient(90deg, rgba(100,116,139,0.45), rgba(100,116,139,0.18))",
    chip: "text-slate-400 border-white/10",
    label: "CONTROL",
  },
};

function AnimatedBar({
  value,
  tone,
}: {
  value: number;
  tone: keyof typeof toneMap;
}) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();
  const [shown, setShown] = useState(0);
  useEffect(() => {
    if (!visible) return;
    const target = value;
    const start = performance.now();
    const dur = 1200;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setShown(target * eased);
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [visible, value]);
  return (
    <div ref={ref} className="relative">
      <div className="h-9 rounded-sm bg-white/[0.03] border border-white/5 overflow-hidden">
        <div
          className="h-full transition-all"
          style={{
            width: `${shown * 100}%`,
            background: toneMap[tone].bar,
            boxShadow:
              tone === "teal"
                ? "0 0 28px -4px rgba(14,230,200,0.7), inset 0 0 20px rgba(14,230,200,0.15)"
                : "inset 0 0 20px rgba(255,255,255,0.05)",
          }}
        />
      </div>
      <span className="absolute top-1/2 -translate-y-1/2 right-3 mono text-sm text-white font-semibold tabular-nums">
        {shown.toFixed(2)}
      </span>
    </div>
  );
}

export default function NREMetric() {
  const { nre } = config;
  return (
    <section
      id="nre"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 04"
            eyebrow="Key metric"
            title={
              <>
                Measuring success:
                <br />
                <span className="italic text-slate-400">
                  Network Restoration Efficiency.
                </span>
              </>
            }
          />
        </ScrollReveal>

        <ScrollReveal delay={120}>
          <div className="glass hair-shadow rounded-lg p-8 md:p-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none opacity-50 graph-paper" />
            <div className="relative">
              <span className="eyebrow">Formula</span>
              <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-3 formula text-white text-3xl md:text-5xl">
                <span>NRE</span>
                <span className="text-teal-glow">=</span>
                <div className="inline-flex flex-col items-center">
                  <span className="whitespace-nowrap">
                    Σ D(i,j) · 𝟙[has channel(i,j)]
                  </span>
                  <span className="h-px w-full my-1 bg-white/30" aria-hidden />
                  <span>Σ D(i,j)</span>
                </div>
              </div>
              <p className="mt-6 text-slate-300 max-w-2xl leading-relaxed">
                {nre.description}
              </p>
            </div>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid md:grid-cols-[320px_1fr] gap-8 items-start">
          <ScrollReveal className="space-y-4 text-sm text-slate-300 leading-relaxed">
            <p>
              Three scaffold conditions were generated for each patient with
              identical total channel volume. The only variable: channel
              orientation and diameter assignment.
            </p>
            <p className="text-slate-500">
              Higher NRE means more of the functional deficit has been addressed
              by the scaffold's channel geometry.
            </p>
            <div className="mono text-[0.7rem] tracking-[0.22em] uppercase text-slate-500 pt-3 border-t border-white/5">
              <span className="text-teal-glow">placeholder values</span> · will
              be replaced with real data
            </div>
          </ScrollReveal>

          <ScrollReveal delay={150} className="space-y-4">
            {nre.conditions.map((c, i) => {
              const tone =
                toneMap[c.tone as keyof typeof toneMap] ?? toneMap.slate;
              return (
                <div
                  key={c.id}
                  className="grid grid-cols-[36px_1fr] gap-4 items-start"
                  style={{
                    animationDelay: `${i * 120}ms`,
                  }}
                >
                  <span className="font-display text-2xl text-slate-500 leading-none pt-2">
                    {c.id}
                  </span>
                  <div>
                    <div className="flex items-center justify-between mb-2 flex-wrap gap-2">
                      <div className="flex items-center gap-3">
                        <span className="text-white font-semibold">
                          {c.name}
                        </span>
                        <span
                          className={`mono text-[0.62rem] tracking-[0.24em] border rounded-sm px-1.5 py-0.5 ${tone.chip}`}
                        >
                          {tone.label}
                        </span>
                      </div>
                    </div>
                    <AnimatedBar
                      value={c.value}
                      tone={c.tone as keyof typeof toneMap}
                    />
                    <p className="mt-2 text-xs text-slate-400 leading-relaxed">
                      {c.note}
                    </p>
                  </div>
                </div>
              );
            })}
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <p className="mt-10 max-w-3xl text-slate-500 text-sm leading-relaxed border-l-2 border-teal-glow/50 pl-4">
            {nre.footnote}
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}
