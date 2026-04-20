import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";

function RandomPoreScaffold() {
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto">
      <defs>
        <pattern
          id="pores"
          x="0"
          y="0"
          width="22"
          height="22"
          patternUnits="userSpaceOnUse"
          patternTransform="rotate(12)"
        >
          <circle cx="11" cy="11" r="4" fill="rgba(255,255,255,0.2)" />
        </pattern>
        <clipPath id="cavity1">
          <path d="M 60 30 Q 110 10 180 25 Q 270 20 310 60 Q 340 120 290 170 Q 220 205 140 195 Q 70 190 45 140 Q 30 80 60 30 Z" />
        </clipPath>
      </defs>
      <path
        d="M 60 30 Q 110 10 180 25 Q 270 20 310 60 Q 340 120 290 170 Q 220 205 140 195 Q 70 190 45 140 Q 30 80 60 30 Z"
        fill="rgba(255,255,255,0.03)"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1"
      />
      <g clipPath="url(#cavity1)">
        <rect width="360" height="220" fill="url(#pores)" />
      </g>
    </svg>
  );
}

function GuidedScaffold() {
  // curved channels representing DTI trajectories
  const paths = [
    {
      d: "M 70 60 Q 180 40 300 80",
      w: 5.5,
    },
    {
      d: "M 60 110 Q 170 95 310 125",
      w: 4,
    },
    {
      d: "M 90 160 Q 190 140 295 165",
      w: 3,
    },
    {
      d: "M 130 40 Q 180 110 250 180",
      w: 4.2,
    },
    {
      d: "M 200 30 Q 220 100 230 190",
      w: 2.5,
    },
  ];
  return (
    <svg viewBox="0 0 360 220" className="w-full h-auto">
      <defs>
        <clipPath id="cavity2">
          <path d="M 60 30 Q 110 10 180 25 Q 270 20 310 60 Q 340 120 290 170 Q 220 205 140 195 Q 70 190 45 140 Q 30 80 60 30 Z" />
        </clipPath>
        <linearGradient id="channelGrad" x1="0" x2="1">
          <stop offset="0" stopColor="#0ee6c8" stopOpacity="0.25" />
          <stop offset="0.5" stopColor="#0ee6c8" stopOpacity="0.9" />
          <stop offset="1" stopColor="#22d3ee" stopOpacity="0.3" />
        </linearGradient>
      </defs>
      <path
        d="M 60 30 Q 110 10 180 25 Q 270 20 310 60 Q 340 120 290 170 Q 220 205 140 195 Q 70 190 45 140 Q 30 80 60 30 Z"
        fill="rgba(14,230,200,0.04)"
        stroke="rgba(14,230,200,0.5)"
        strokeWidth="1"
      />
      <g clipPath="url(#cavity2)">
        {paths.map((p, i) => (
          <g key={i}>
            <path
              d={p.d}
              stroke="rgba(14,230,200,0.15)"
              strokeWidth={p.w + 6}
              fill="none"
              strokeLinecap="round"
              style={{ filter: "blur(3px)" }}
            />
            <path
              d={p.d}
              stroke="url(#channelGrad)"
              strokeWidth={p.w}
              fill="none"
              strokeLinecap="round"
            />
          </g>
        ))}
        {/* node endpoints */}
        {paths.flatMap((p, i) => {
          const match = p.d.match(/M (\S+) (\S+).+ ([\d.]+) ([\d.]+)$/);
          if (!match) return [];
          const [, x1, y1, x2, y2] = match;
          return [
            <circle
              key={`a${i}`}
              cx={x1}
              cy={y1}
              r="3"
              fill="#0ee6c8"
              style={{ filter: "drop-shadow(0 0 6px #0ee6c8)" }}
            />,
            <circle
              key={`b${i}`}
              cx={x2}
              cy={y2}
              r="3"
              fill="#0ee6c8"
              style={{ filter: "drop-shadow(0 0 6px #0ee6c8)" }}
            />,
          ];
        })}
      </g>
    </svg>
  );
}

export default function Problem() {
  return (
    <section
      id="problem"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 01"
            eyebrow="The gap"
            title={
              <>
                Scaffolds that fill holes
                <br />
                <span className="italic text-slate-400">
                  but ignore circuits.
                </span>
              </>
            }
          />
        </ScrollReveal>

        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-14 items-start">
          <ScrollReveal className="space-y-5 text-slate-300 leading-relaxed text-[1.02rem]">
            <p>
              <span className="mono text-teal-glow text-sm mr-1">800,000</span>
              strokes occur each year in the United States alone;{" "}
              <span className="mono text-teal-glow text-sm">
                15 million
              </span>{" "}
              worldwide. The ones that survive leave behind a cavity where
              functional cortex used to be — a hole in both tissue and
              computation.
            </p>
            <p>
              Current regenerative scaffolds fill that anatomical void. They
              match the cavity's outer shape from MRI and seed it with stem
              cells. But they ignore the circuits that were cut. A scaffold with
              randomly oriented pores produces tissue that is structurally
              present but functionally useless — neurons grow in every direction
              and connect to nothing in particular.
            </p>
            <p>
              It is like rebuilding a highway bridge without knowing which roads
              it connected. The concrete is back. The traffic is not.
            </p>
            <p className="font-display italic text-slate-200/90 text-xl leading-snug border-l-2 border-teal-glow/60 pl-5 mt-8">
              Anatomy tells you where the hole is. Function tells you what the
              hole was for. Both are needed to rebuild something that{" "}
              <em>works</em>.
            </p>
          </ScrollReveal>

          <ScrollReveal delay={150} className="grid gap-6">
            <figure className="glass hair-shadow rounded-lg p-5">
              <figcaption className="flex items-center justify-between mb-3">
                <span className="eyebrow">Current approach</span>
                <span className="mono text-[0.7rem] text-slate-400">
                  anatomy only
                </span>
              </figcaption>
              <RandomPoreScaffold />
              <p className="mt-3 text-sm text-slate-400">
                Isotropic porosity. Cavity filled. Circuits unaddressed.
              </p>
            </figure>
            <figure className="glass hair-shadow rounded-lg p-5 border border-teal-glow/30">
              <figcaption className="flex items-center justify-between mb-3">
                <span className="eyebrow text-teal-glow">Our approach</span>
                <span className="mono text-[0.7rem] text-teal-glow">
                  functionally informed
                </span>
              </figcaption>
              <GuidedScaffold />
              <p className="mt-3 text-sm text-slate-300">
                Curved microchannels follow real white-matter trajectories.
                Diameters scaled by functional deficit magnitude.
              </p>
            </figure>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
}
