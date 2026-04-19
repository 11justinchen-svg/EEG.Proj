import { useState } from "react";
import { Download, Layers, X, ArrowUpRight } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import patients from "../data/patients.json";

type Patient = (typeof patients)[number];

function severityChip(nre: number) {
  if (nre >= 0.7) {
    return {
      label: "HIGH RESTORATION",
      dot: "bg-teal-glow shadow-[0_0_10px_2px_rgba(14,230,200,0.7)]",
      text: "text-teal-glow",
      border: "border-teal-glow/40",
    };
  }
  if (nre >= 0.6) {
    return {
      label: "MODERATE",
      dot: "bg-amber-glow shadow-[0_0_10px_2px_rgba(245,185,66,0.55)]",
      text: "text-amber-glow",
      border: "border-amber-glow/40",
    };
  }
  return {
    label: "LIMITED",
    dot: "bg-rose-400 shadow-[0_0_10px_2px_rgba(251,113,133,0.45)]",
    text: "text-rose-400",
    border: "border-rose-400/40",
  };
}

function MRIPlaceholder({
  w = 320,
  h = 220,
  label = "MRI Preview",
  seed = 1,
}: {
  w?: number;
  h?: number;
  label?: string;
  seed?: number;
}) {
  // stylized deterministic "scan" with a highlighted lesion region
  const cx = 160 + ((seed * 13) % 40) - 20;
  const cy = 110 + ((seed * 7) % 30) - 15;
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden border border-white/10 bg-[#070b13]"
      style={{ aspectRatio: `${w} / ${h}` }}
    >
      <svg viewBox={`0 0 ${w} ${h}`} className="absolute inset-0 w-full h-full">
        <defs>
          <radialGradient id={`brain-${seed}`} cx="50%" cy="50%" r="55%">
            <stop offset="0%" stopColor="#1e293b" />
            <stop offset="60%" stopColor="#0f172a" />
            <stop offset="100%" stopColor="#070b13" />
          </radialGradient>
          <radialGradient id={`lesion-${seed}`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(14,230,200,0.9)" />
            <stop offset="100%" stopColor="rgba(14,230,200,0)" />
          </radialGradient>
        </defs>
        <ellipse
          cx={w / 2}
          cy={h / 2}
          rx={w * 0.4}
          ry={h * 0.42}
          fill={`url(#brain-${seed})`}
        />
        {/* folds */}
        {Array.from({ length: 10 }).map((_, i) => (
          <path
            key={i}
            d={`M ${40 + i * 25} ${60 + ((i * 11) % 80)} Q ${80 + i * 20} ${90 + ((i * 7) % 40)} ${60 + i * 28} ${160 - ((i * 9) % 60)}`}
            stroke="rgba(148,163,184,0.18)"
            strokeWidth="0.7"
            fill="none"
          />
        ))}
        {/* midline */}
        <line
          x1={w / 2}
          y1={h * 0.08}
          x2={w / 2}
          y2={h * 0.92}
          stroke="rgba(148,163,184,0.22)"
          strokeDasharray="3 4"
        />
        {/* lesion */}
        <circle
          cx={cx}
          cy={cy}
          r="26"
          fill={`url(#lesion-${seed})`}
          opacity="0.9"
        />
        <circle
          cx={cx}
          cy={cy}
          r="26"
          stroke="rgba(14,230,200,0.9)"
          strokeWidth="1"
          fill="none"
        />
        <circle
          cx={cx}
          cy={cy}
          r="36"
          stroke="rgba(14,230,200,0.25)"
          strokeDasharray="2 3"
          fill="none"
        />
      </svg>
      <div className="absolute top-2 left-2 mono text-[0.62rem] tracking-[0.2em] text-slate-400">
        {label} · {w}×{h}
      </div>
      <div className="absolute bottom-2 right-2 mono text-[0.62rem] tracking-[0.2em] text-teal-glow">
        LESION
      </div>
    </div>
  );
}

function ScaffoldPlaceholder({
  channels = 12,
  seed = 1,
}: {
  channels?: number;
  seed?: number;
}) {
  const paths = Array.from({ length: channels }).map((_, i) => {
    const y1 = 25 + ((i * (150 / channels)) % 150);
    const curve = 20 + ((i * 13 + seed * 7) % 40);
    const w = 2 + ((i * 7 + seed) % 5) * 0.6;
    return { y1, curve, w, i };
  });
  return (
    <div
      className="relative w-full rounded-sm overflow-hidden border border-teal-glow/30 bg-[#070b13]"
      style={{ aspectRatio: "320 / 220" }}
    >
      <svg viewBox="0 0 320 220" className="absolute inset-0 w-full h-full">
        <defs>
          <clipPath id={`cav-${seed}`}>
            <path d="M 50 40 Q 120 15 200 30 Q 280 40 290 100 Q 300 170 220 190 Q 130 200 70 170 Q 25 120 50 40 Z" />
          </clipPath>
        </defs>
        <path
          d="M 50 40 Q 120 15 200 30 Q 280 40 290 100 Q 300 170 220 190 Q 130 200 70 170 Q 25 120 50 40 Z"
          fill="rgba(14,230,200,0.04)"
          stroke="rgba(14,230,200,0.5)"
          strokeWidth="1"
        />
        <g clipPath={`url(#cav-${seed})`}>
          {paths.map((p) => (
            <path
              key={p.i}
              d={`M 40 ${p.y1} Q 160 ${p.y1 + p.curve - 20} 300 ${p.y1 + 10}`}
              stroke="rgba(14,230,200,0.85)"
              strokeWidth={p.w}
              strokeLinecap="round"
              fill="none"
              style={{ filter: "drop-shadow(0 0 4px rgba(14,230,200,0.5))" }}
            />
          ))}
        </g>
      </svg>
      <div className="absolute top-2 left-2 mono text-[0.62rem] tracking-[0.2em] text-slate-400">
        SCAFFOLD · 320×220
      </div>
      <div className="absolute bottom-2 right-2 mono text-[0.62rem] tracking-[0.2em] text-teal-glow">
        {channels} CHANNELS
      </div>
    </div>
  );
}

function PatientCard({
  p,
  onSelect,
  active,
}: {
  p: Patient;
  onSelect: () => void;
  active: boolean;
}) {
  const sev = severityChip(p.nre);
  return (
    <button
      onClick={onSelect}
      className={`group relative text-left w-full glass hair-shadow rounded-lg p-5 overflow-hidden
        transition-all duration-300
        ${active ? "border-teal-glow/60 shadow-glow -translate-y-1" : "hover:-translate-y-1 hover:border-white/20"}
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="eyebrow">Patient</div>
          <div className="font-display text-3xl text-white leading-none mt-1">
            {p.id}
          </div>
        </div>
        <span
          className={`mono text-[0.6rem] tracking-[0.22em] border rounded-sm px-2 py-1 flex items-center gap-1.5 ${sev.text} ${sev.border}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
          {sev.label}
        </span>
      </div>
      <MRIPlaceholder
        label={`${p.id} · MRI`}
        seed={parseInt(p.id)}
        w={320}
        h={200}
      />
      <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
        <div>
          <div className="mono text-[0.62rem] tracking-[0.22em] text-slate-500 uppercase">
            Demo
          </div>
          <div className="text-slate-200 mt-0.5">
            {p.age} · {p.sex}
          </div>
        </div>
        <div>
          <div className="mono text-[0.62rem] tracking-[0.22em] text-slate-500 uppercase">
            Type
          </div>
          <div className="text-slate-200 mt-0.5 truncate">{p.stroke_type}</div>
        </div>
      </div>
      <div className="mt-3 text-sm text-slate-300 flex items-center gap-2">
        <Layers size={13} className="text-teal-glow" />
        {p.location}
      </div>

      <div className="mt-5 pt-4 border-t border-white/5 grid grid-cols-3 gap-2 text-center">
        <div>
          <div className="mono text-[0.62rem] tracking-[0.18em] text-slate-500">
            BROKEN
          </div>
          <div className="mono text-lg text-white tabular-nums">
            {p.broken_connections}
          </div>
        </div>
        <div>
          <div className="mono text-[0.62rem] tracking-[0.18em] text-slate-500">
            CHANNELS
          </div>
          <div className="mono text-lg text-teal-glow tabular-nums">
            {p.channels_placed}
          </div>
        </div>
        <div>
          <div className="mono text-[0.62rem] tracking-[0.18em] text-slate-500">
            NRE
          </div>
          <div className="mono text-lg text-white tabular-nums">
            {p.nre.toFixed(2)}
          </div>
        </div>
      </div>

      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span className="mono tracking-[0.22em]">CLICK TO EXPAND</span>
        <ArrowUpRight
          size={14}
          className="group-hover:text-teal-glow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all"
        />
      </div>
    </button>
  );
}

function PatientDetail({ p, onClose }: { p: Patient; onClose: () => void }) {
  const sev = severityChip(p.nre);
  const seed = parseInt(p.id);
  return (
    <div
      className="glass hair-shadow rounded-lg p-6 md:p-8 relative overflow-hidden animate-[reveal_0.6s_cubic-bezier(0.22,1,0.36,1)_forwards]"
      style={{ borderColor: "rgba(14,230,200,0.35)" }}
    >
      <button
        onClick={onClose}
        aria-label="Close patient detail"
        className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white hover:bg-white/5 rounded-md transition"
      >
        <X size={18} />
      </button>

      <header className="flex flex-wrap items-baseline gap-4 pr-12">
        <span className="eyebrow">Selected patient</span>
        <h3 className="font-display text-4xl md:text-5xl text-white">
          Patient {p.id}
        </h3>
        <span
          className={`mono text-[0.62rem] tracking-[0.24em] border rounded-sm px-2 py-1 flex items-center gap-1.5 ${sev.text} ${sev.border}`}
        >
          <span className={`w-1.5 h-1.5 rounded-full ${sev.dot}`} />
          {sev.label}
        </span>
      </header>

      <div className="mt-6 grid md:grid-cols-[1.1fr_1fr] gap-8">
        <div className="space-y-4">
          <MRIPlaceholder
            label={`${p.id} · MRI + LESION`}
            seed={seed}
            w={560}
            h={360}
          />
          <ScaffoldPlaceholder channels={p.channels_placed} seed={seed} />
        </div>
        <div className="space-y-5 text-sm text-slate-300">
          <dl className="grid grid-cols-2 gap-4 pb-4 border-b border-white/5">
            <div>
              <dt className="eyebrow">Demographics</dt>
              <dd className="text-white mt-1">
                {p.age} · {p.sex}
              </dd>
            </div>
            <div>
              <dt className="eyebrow">Stroke type</dt>
              <dd className="text-white mt-1">{p.stroke_type}</dd>
            </div>
            <div>
              <dt className="eyebrow">Location</dt>
              <dd className="text-white mt-1">{p.location}</dd>
            </div>
            <div>
              <dt className="eyebrow">Cavity</dt>
              <dd className="text-white mt-1 mono">{p.cavity_volume_cc} cm³</dd>
            </div>
          </dl>

          <section>
            <h4 className="eyebrow mb-2 text-teal-glow">
              Connectivity Deficit
            </h4>
            <p className="leading-relaxed">{p.deficit_summary}</p>
          </section>
          <section>
            <h4 className="eyebrow mb-2 text-violet-glow">Tract Analysis</h4>
            <p className="leading-relaxed">{p.tract_summary}</p>
          </section>
          <section>
            <h4 className="eyebrow mb-2 text-amber-glow">Scaffold Output</h4>
            <p className="leading-relaxed">{p.scaffold_details}</p>
          </section>

          <div className="pt-4 border-t border-white/5 flex items-center justify-between gap-4">
            <div>
              <div className="mono text-[0.7rem] tracking-[0.22em] text-slate-500">
                NRE SCORE
              </div>
              <div className="font-display text-3xl text-white tabular-nums">
                {p.nre.toFixed(2)}
              </div>
            </div>
            <button
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-teal-glow/40 text-teal-glow hover:bg-teal-glow/10 transition text-sm font-semibold"
              type="button"
            >
              <Download size={14} />
              Download .STL
            </button>
          </div>
          <p className="mono text-[0.65rem] tracking-[0.22em] text-slate-600">
            * PLACEHOLDER · MESH EXPORT PENDING REAL DATA
          </p>
        </div>
      </div>
    </div>
  );
}

export default function PatientCards() {
  const [selected, setSelected] = useState<string | null>(null);
  const active = patients.find((p) => p.id === selected) ?? null;

  return (
    <section
      id="patients"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 05"
            eyebrow="Patient cohort"
            title={
              <>
                10 patient cases:
                <br />
                <span className="italic text-slate-400">
                  from brain scan to scaffold.
                </span>
              </>
            }
            kicker="Each card represents a real stroke patient from the ATLAS v2.0 dataset. Select a patient to inspect the personalized scaffold generated by the pipeline."
          />
        </ScrollReveal>

        {active ? (
          <ScrollReveal>
            <div className="mb-10">
              <PatientDetail p={active} onClose={() => setSelected(null)} />
            </div>
          </ScrollReveal>
        ) : null}

        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-5">
          {patients.map((p, i) => (
            <ScrollReveal key={p.id} delay={Math.min(i * 60, 400)}>
              <PatientCard
                p={p}
                active={selected === p.id}
                onSelect={() =>
                  setSelected((cur) => (cur === p.id ? null : p.id))
                }
              />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
