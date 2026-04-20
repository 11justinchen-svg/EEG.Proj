import { ArrowDown, ArrowRight } from "lucide-react";
import NetworkBackground from "./ui/NetworkBackground";
import config from "../data/config.json";

const bands = [
  {
    name: "δ  0.5–4 Hz",
    color: "rgba(139, 92, 246, 0.55)",
    amp: 14,
    freq: 0.008,
    y: 90,
  },
  {
    name: "θ  4–8 Hz",
    color: "rgba(34, 211, 238, 0.55)",
    amp: 9,
    freq: 0.022,
    y: 150,
  },
  {
    name: "α  8–13 Hz",
    color: "rgba(14, 230, 200, 0.72)",
    amp: 6,
    freq: 0.05,
    y: 210,
  },
  {
    name: "β  13–30 Hz",
    color: "rgba(245, 185, 66, 0.55)",
    amp: 4,
    freq: 0.11,
    y: 270,
  },
  {
    name: "γ  30–45 Hz",
    color: "rgba(226, 232, 240, 0.35)",
    amp: 2.5,
    freq: 0.22,
    y: 330,
  },
];

function buildPath(amp: number, freq: number, y: number, phase = 0, w = 1600) {
  const step = 6;
  let d = `M 0 ${y}`;
  for (let x = step; x <= w; x += step) {
    // jittered sine to feel organic
    const noise = Math.sin(x * freq * 0.5 + phase * 0.3) * (amp * 0.25);
    const val = y + Math.sin(x * freq + phase) * amp + noise;
    d += ` L ${x} ${val.toFixed(2)}`;
  }
  return d;
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative min-h-[100svh] overflow-hidden pt-24 pb-20 flex items-center"
    >
      <NetworkBackground opacity={0.55} />

      {/* Drifting EEG waveforms */}
      <svg
        aria-hidden
        viewBox="0 0 1600 420"
        preserveAspectRatio="none"
        className="absolute inset-x-0 bottom-0 w-full h-[58%] opacity-70"
      >
        <defs>
          <linearGradient id="fade-x" x1="0" x2="1">
            <stop offset="0" stopColor="black" stopOpacity="0" />
            <stop offset="0.1" stopColor="black" stopOpacity="1" />
            <stop offset="0.9" stopColor="black" stopOpacity="1" />
            <stop offset="1" stopColor="black" stopOpacity="0" />
          </linearGradient>
          <mask id="fade-mask">
            <rect width="1600" height="420" fill="url(#fade-x)" />
          </mask>
        </defs>
        <g mask="url(#fade-mask)">
          {bands.map((b, i) => (
            <g key={b.name}>
              <path
                className="eeg-wave"
                d={buildPath(b.amp, b.freq, b.y)}
                stroke={b.color}
                strokeWidth={1.1}
                style={{
                  filter: "blur(0.4px)",
                  animation: `drift 22s linear infinite`,
                  animationDelay: `${i * -3.1}s`,
                }}
              />
              <path
                className="eeg-wave"
                d={buildPath(b.amp * 0.9, b.freq, b.y + 2, Math.PI / 2)}
                stroke={b.color}
                strokeWidth={0.5}
                opacity={0.5}
                style={{
                  animation: `drift 32s linear infinite reverse`,
                  animationDelay: `${i * -2.2}s`,
                }}
              />
            </g>
          ))}
        </g>
      </svg>

      {/* Graph paper grid layer */}
      <div
        aria-hidden
        className="absolute inset-0 graph-paper pointer-events-none"
      />

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 w-full">
        <div className="flex items-center gap-3 mb-10">
          <span className="w-1.5 h-1.5 rounded-full bg-teal-glow animate-pulse-slow shadow-[0_0_12px_2px_rgba(14,230,200,0.8)]" />
          <span className="eyebrow">{config.author.cycle}</span>
        </div>

        <h1 className="font-display text-white leading-[0.96] tracking-tight text-[clamp(2.4rem,7vw,5.5rem)] max-w-[18ch]">
          {config.hero.title.split(" ").map((word, i) => (
            <span
              key={i}
              className="inline-block opacity-0 animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
              style={{ animationDelay: `${120 + i * 90}ms` }}
            >
              {word}
              {i < config.hero.title.split(" ").length - 1 ? (
                <span>&nbsp;</span>
              ) : null}
            </span>
          ))}
        </h1>

        <p
          className="mt-7 font-display italic text-slate-200/95 text-xl md:text-2xl max-w-3xl leading-snug opacity-0 animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{ animationDelay: "700ms" }}
        >
          {config.hero.subtitle}
        </p>

        <p
          className="mt-8 text-slate-400 max-w-2xl leading-relaxed text-[15px] md:text-base opacity-0 animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{ animationDelay: "900ms" }}
        >
          {config.hero.hook}
        </p>

        <div
          className="mt-10 flex flex-wrap items-center gap-4 opacity-0 animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{ animationDelay: "1100ms" }}
        >
          <a
            href="#pipeline"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-md bg-teal-glow text-ink-900 font-semibold text-sm tracking-wide shadow-[0_0_40px_-5px_rgba(14,230,200,0.55)] hover:shadow-[0_0_60px_-5px_rgba(14,230,200,0.85)] transition-all hover:-translate-y-0.5"
          >
            Explore the Pipeline
            <ArrowDown
              size={15}
              className="group-hover:translate-y-0.5 transition-transform"
            />
          </a>
          <a
            href="#patients"
            className="group inline-flex items-center gap-3 px-5 py-3 rounded-md border border-white/15 text-slate-100 font-medium text-sm tracking-wide hover:border-teal-glow/60 hover:text-white transition-all"
          >
            View Patient Cases
            <ArrowRight
              size={15}
              className="group-hover:translate-x-1 transition-transform"
            />
          </a>
        </div>

        {/* Frequency band legend */}
        <div
          className="mt-16 flex flex-wrap gap-x-6 gap-y-2 opacity-0 animate-[reveal_0.9s_cubic-bezier(0.22,1,0.36,1)_forwards]"
          style={{ animationDelay: "1350ms" }}
        >
          {bands.map((b) => (
            <div key={b.name} className="flex items-center gap-2">
              <span
                className="w-6 h-px"
                style={{ background: b.color, boxShadow: `0 0 6px ${b.color}` }}
              />
              <span className="mono text-[0.68rem] tracking-[0.18em] text-slate-400 uppercase">
                {b.name}
              </span>
            </div>
          ))}
        </div>

        {/* metadata ribbon */}
        <div className="absolute bottom-6 left-6 md:left-10 right-6 md:right-10 flex items-end justify-between gap-6 pointer-events-none">
          <span className="mono text-[0.68rem] tracking-[0.22em] uppercase text-slate-500">
            {config.hero.metadata}
          </span>
          <a
            href="#problem"
            aria-label="Scroll to content"
            className="pointer-events-auto hidden md:flex flex-col items-center gap-2 text-slate-400 hover:text-teal-glow transition-colors"
          >
            <span className="mono text-[0.62rem] tracking-[0.32em] uppercase">
              Scroll
            </span>
            <ArrowDown size={14} className="animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
}
