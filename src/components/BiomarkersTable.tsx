import { useMemo, useState } from "react";
import { ArrowUpDown, TrendingDown, TrendingUp } from "lucide-react";
import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import biomarkers from "../data/biomarkers.json";

type Row = (typeof biomarkers)[number];

type SortKey = "name" | "p_fdr" | "domain" | "direction";

const DOMAINS = Array.from(new Set(biomarkers.map((b) => b.domain)));

export default function BiomarkersTable() {
  const [domain, setDomain] = useState<string>("All");
  const [sort, setSort] = useState<{ key: SortKey; dir: 1 | -1 }>({
    key: "p_fdr",
    dir: 1,
  });

  const rows = useMemo(() => {
    const filtered =
      domain === "All"
        ? biomarkers
        : biomarkers.filter((b) => b.domain === domain);
    const pRank: Record<string, number> = {
      "<0.001": 0,
      "<0.01": 1,
      "<0.05": 2,
    };
    return [...filtered].sort((a, b) => {
      let cmp = 0;
      if (sort.key === "p_fdr") {
        cmp = (pRank[a.p_fdr] ?? 99) - (pRank[b.p_fdr] ?? 99);
      } else {
        const av = (a as unknown as Record<string, string>)[sort.key];
        const bv = (b as unknown as Record<string, string>)[sort.key];
        cmp = String(av).localeCompare(String(bv));
      }
      return cmp * sort.dir;
    });
  }, [domain, sort]);

  const toggleSort = (key: SortKey) => {
    setSort((cur) =>
      cur.key === key
        ? { key, dir: (cur.dir * -1) as 1 | -1 }
        : { key, dir: 1 },
    );
  };

  const significanceBar = (p: string) => {
    const rank = p === "<0.001" ? 3 : p === "<0.01" ? 2 : p === "<0.05" ? 1 : 0;
    return (
      <div className="inline-flex gap-0.5 items-center">
        {Array.from({ length: 3 }).map((_, i) => (
          <span
            key={i}
            className="w-1.5 h-4 rounded-[1px]"
            style={{
              background:
                i < rank
                  ? "linear-gradient(180deg, #0ee6c8, #0b8f7c)"
                  : "rgba(255,255,255,0.08)",
              boxShadow: i < rank ? "0 0 6px rgba(14,230,200,0.55)" : "none",
            }}
          />
        ))}
      </div>
    );
  };

  return (
    <section
      id="biomarkers"
      className="relative py-28 md:py-36 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 07"
            eyebrow="Statistical findings"
            title={
              <>
                14 statistically significant
                <br />
                <span className="italic text-slate-400">
                  connectivity biomarkers.
                </span>
              </>
            }
            kicker="All FDR-corrected across 11,390 tests (2,278 region pairs × 5 frequency bands). Dashes indicate F-statistic and effect-size fields pending final computation."
          />
        </ScrollReveal>

        <ScrollReveal>
          <div className="flex flex-wrap items-center gap-2 mb-5">
            <span className="eyebrow mr-2">Filter domain</span>
            {["All", ...DOMAINS].map((d) => (
              <button
                key={d}
                onClick={() => setDomain(d)}
                className={`mono text-[0.7rem] tracking-[0.18em] uppercase px-3 py-1.5 rounded-sm border transition
                  ${
                    domain === d
                      ? "bg-teal-glow/15 border-teal-glow/50 text-teal-glow"
                      : "border-white/10 text-slate-400 hover:text-white hover:border-white/25"
                  }`}
              >
                {d}
              </button>
            ))}
          </div>
        </ScrollReveal>

        <ScrollReveal>
          <div className="glass hair-shadow rounded-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-gradient-to-r from-teal-glow/10 via-teal-glow/5 to-transparent border-b border-teal-glow/20">
                    <th
                      onClick={() => toggleSort("name")}
                      className="eyebrow text-left py-3 px-5 cursor-pointer hover:text-white"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        Biomarker <ArrowUpDown size={11} />
                      </span>
                    </th>
                    <th
                      onClick={() => toggleSort("p_fdr")}
                      className="eyebrow text-left py-3 px-5 cursor-pointer hover:text-white w-32"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        p (FDR) <ArrowUpDown size={11} />
                      </span>
                    </th>
                    <th className="eyebrow text-left py-3 px-5 w-24">F</th>
                    <th className="eyebrow text-left py-3 px-5 w-24">η²</th>
                    <th
                      onClick={() => toggleSort("direction")}
                      className="eyebrow text-left py-3 px-5 cursor-pointer hover:text-white w-36"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        Direction <ArrowUpDown size={11} />
                      </span>
                    </th>
                    <th
                      onClick={() => toggleSort("domain")}
                      className="eyebrow text-left py-3 px-5 cursor-pointer hover:text-white w-40"
                    >
                      <span className="inline-flex items-center gap-1.5">
                        Domain <ArrowUpDown size={11} />
                      </span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r: Row, i) => (
                    <tr
                      key={r.name}
                      className={`border-b border-white/[0.04] transition-colors hover:bg-white/[0.03] ${
                        i % 2 === 0 ? "bg-white/[0.015]" : ""
                      }`}
                    >
                      <td className="py-3 px-5 text-slate-100 font-medium">
                        {r.name}
                      </td>
                      <td className="py-3 px-5 mono text-slate-200 tabular-nums">
                        <span className="inline-flex items-center gap-2.5">
                          {significanceBar(r.p_fdr)}
                          <span>{r.p_fdr}</span>
                        </span>
                      </td>
                      <td className="py-3 px-5 mono text-slate-500 tabular-nums">
                        {r.f_stat}
                      </td>
                      <td className="py-3 px-5 mono text-slate-500 tabular-nums">
                        {r.eta_sq}
                      </td>
                      <td className="py-3 px-5">
                        <span
                          className={`inline-flex items-center gap-1.5 mono text-[0.72rem] tracking-[0.1em] ${
                            r.direction === "Decreased"
                              ? "text-rose-300"
                              : "text-amber-glow"
                          }`}
                        >
                          {r.direction === "Decreased" ? (
                            <TrendingDown size={14} />
                          ) : (
                            <TrendingUp size={14} />
                          )}
                          {r.direction}
                        </span>
                      </td>
                      <td className="py-3 px-5 text-slate-300">{r.domain}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-3 border-t border-white/5 bg-black/30">
              <span className="mono text-[0.7rem] tracking-[0.18em] text-slate-500 uppercase">
                {rows.length} of {biomarkers.length} biomarkers shown
              </span>
              <span className="mono text-[0.7rem] tracking-[0.18em] text-slate-500 uppercase">
                FDR α = 0.05 · Benjamini–Hochberg
              </span>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
