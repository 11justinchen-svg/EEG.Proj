import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  ReferenceLine,
} from "recharts";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import ml from "../data/ml_results.json";

function mean(values: number[]) {
  return values.reduce((a, b) => a + b, 0) / values.length;
}

function ChartBlock({
  title,
  metric,
  data,
  accent,
}: {
  title: string;
  metric: string;
  data: { name: string; value: number }[];
  accent: string;
}) {
  const avg = mean(data.map((d) => d.value));
  return (
    <div className="glass hair-shadow rounded-lg p-6">
      <header className="flex items-center justify-between mb-4">
        <div>
          <span className="eyebrow">{metric}</span>
          <h3 className="font-display text-2xl text-white mt-1">{title}</h3>
        </div>
        <div className="mono text-[0.7rem] tracking-[0.18em] text-slate-400">
          MEAN · {avg.toFixed(3)}
        </div>
      </header>
      <div className="h-[260px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 40, bottom: 4, left: 0 }}
          >
            <CartesianGrid
              horizontal={false}
              stroke="rgba(255,255,255,0.06)"
              strokeDasharray="3 3"
            />
            <XAxis
              type="number"
              domain={[0, 1]}
              tickFormatter={(v) => v.toFixed(1)}
              stroke="rgba(226,232,240,0.35)"
              tick={{ fontFamily: "JetBrains Mono", fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={130}
              stroke="rgba(226,232,240,0.55)"
              tick={{
                fontFamily: "Plus Jakarta Sans",
                fontSize: 12,
                fill: "#e2e8f0",
              }}
            />
            <Tooltip
              cursor={{ fill: "rgba(14,230,200,0.06)" }}
              contentStyle={{
                background: "#070b13",
                border: "1px solid rgba(14,230,200,0.3)",
                borderRadius: 6,
                fontFamily: "JetBrains Mono",
                fontSize: 12,
                color: "#e2e8f0",
              }}
              formatter={(v: number) => [v.toFixed(3), metric]}
            />
            <ReferenceLine
              x={avg}
              stroke="rgba(245,185,66,0.85)"
              strokeDasharray="4 4"
              label={{
                value: "μ",
                position: "top",
                fill: "#f5b942",
                fontFamily: "JetBrains Mono",
                fontSize: 11,
              }}
            />
            <Bar dataKey="value" radius={[0, 3, 3, 0]}>
              {data.map((d, i) => (
                <Cell
                  key={d.name}
                  fill={accent}
                  style={{
                    filter: `drop-shadow(0 0 8px ${accent}55)`,
                    opacity: 0.6 + (i / data.length) * 0.4,
                  }}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default function MLResults() {
  return (
    <section
      id="ml"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 08"
            eyebrow="Classification"
            title={
              <>
                Can we detect stroke severity
                <br />
                <span className="italic text-slate-400">
                  from connectivity alone?
                </span>
              </>
            }
            kicker="Supervised and unsupervised learners were trained on the connectivity biomarker vector. Every value below is a placeholder — the JSON will be swapped for real results as they are produced."
          />
        </ScrollReveal>

        <div className="grid md:grid-cols-2 gap-5 md:gap-6">
          <ScrollReveal>
            <ChartBlock
              title="Unsupervised"
              metric="Adjusted Rand Index"
              data={ml.unsupervised}
              accent="#8b5cf6"
            />
          </ScrollReveal>
          <ScrollReveal delay={120}>
            <ChartBlock
              title="Supervised"
              metric="Accuracy"
              data={ml.supervised}
              accent="#0ee6c8"
            />
          </ScrollReveal>
        </div>

        <ScrollReveal>
          <div className="mt-8 glass hair-shadow rounded-lg overflow-hidden">
            <header className="flex items-center justify-between px-6 py-4 border-b border-white/5">
              <div>
                <span className="eyebrow">Classification report</span>
                <h3 className="font-display text-xl text-white mt-1">
                  Per-class metrics (best supervised model)
                </h3>
              </div>
              <span className="mono text-[0.65rem] tracking-[0.22em] text-slate-500">
                — = AWAITING RESULTS
              </span>
            </header>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/[0.02]">
                    <th className="eyebrow text-left py-3 px-6">Class</th>
                    <th className="eyebrow text-left py-3 px-6">Precision</th>
                    <th className="eyebrow text-left py-3 px-6">Recall</th>
                    <th className="eyebrow text-left py-3 px-6">F1-Score</th>
                    <th className="eyebrow text-left py-3 px-6">Support</th>
                  </tr>
                </thead>
                <tbody>
                  {ml.classificationReport.map((row, i) => (
                    <tr
                      key={row.class}
                      className={`border-b border-white/[0.04] ${
                        i % 2 === 0 ? "bg-white/[0.015]" : ""
                      }`}
                    >
                      <td
                        className={`py-3 px-6 ${row.class === "Accuracy" ? "font-display text-teal-glow italic" : "text-slate-100 font-medium"}`}
                      >
                        {row.class}
                      </td>
                      <td className="py-3 px-6 mono text-slate-400 tabular-nums">
                        {row.precision}
                      </td>
                      <td className="py-3 px-6 mono text-slate-400 tabular-nums">
                        {row.recall}
                      </td>
                      <td className="py-3 px-6 mono text-slate-400 tabular-nums">
                        {row.f1}
                      </td>
                      <td className="py-3 px-6 mono text-slate-400 tabular-nums">
                        {row.support}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
