import SectionHeading from "./ui/SectionHeading";
import ScrollReveal from "./ui/ScrollReveal";
import pipeline from "../data/pipeline.json";

function highlightCode(snippet: string): JSX.Element {
  // tiny syntax painter — keywords, function calls, strings, numbers
  const tokens = snippet.split(
    /(\b(?:import|from|as|raw|filter|target|extract_segment|splprep|boolean_difference|export|Epochs|ICA|E|Im|mean|sign)\b|[0-9.]+|'[^']*'|"[^"]*"|→|·)/g,
  );
  return (
    <>
      {tokens.map((t, i) => {
        if (!t) return null;
        if (t === "→") {
          return (
            <span key={i} className="text-teal-glow mx-1">
              {t}
            </span>
          );
        }
        if (/^[0-9.]+$/.test(t)) {
          return (
            <span key={i} className="tok-num">
              {t}
            </span>
          );
        }
        if (/^['"].*['"]$/.test(t)) {
          return (
            <span key={i} className="tok-str">
              {t}
            </span>
          );
        }
        if (
          /^(import|from|as|raw|filter|target|extract_segment|splprep|boolean_difference|export|Epochs|ICA|E|Im|mean|sign)$/.test(
            t,
          )
        ) {
          return (
            <span key={i} className="tok-fn">
              {t}
            </span>
          );
        }
        return <span key={i}>{t}</span>;
      })}
    </>
  );
}

export default function Pipeline() {
  return (
    <section
      id="pipeline"
      className="relative py-28 md:py-40 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <ScrollReveal>
          <SectionHeading
            index="§ 03"
            eyebrow="Methods"
            title={
              <>
                The pipeline:
                <br />
                <span className="italic text-slate-400">
                  from brain data to scaffold.
                </span>
              </>
            }
            kicker="Seven computational stages connect raw EEG recordings to a printable mesh. Each stage is implemented; each produces an intermediate artifact that feeds the next."
          />
        </ScrollReveal>

        <div className="relative mt-14">
          {/* vertical spine */}
          <div
            aria-hidden
            className="absolute left-[21px] md:left-[27px] top-4 bottom-4 w-px bg-gradient-to-b from-teal-glow/50 via-white/10 to-transparent"
          />

          <ol className="space-y-14">
            {pipeline.map((s, i) => (
              <ScrollReveal key={s.step} delay={Math.min(i * 80, 360)} as="li">
                <article className="grid md:grid-cols-[60px_1fr] gap-5 md:gap-10">
                  {/* step marker */}
                  <div className="relative">
                    <div className="relative w-11 h-11 md:w-14 md:h-14 rounded-full glass grid place-items-center font-display text-xl md:text-2xl text-teal-glow shadow-glow">
                      <span className="absolute inset-[-4px] rounded-full border border-teal-glow/25 animate-pulse-slow" />
                      {s.step}
                    </div>
                  </div>

                  <div className="min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 mb-2">
                      <span className="eyebrow">{s.eyebrow}</span>
                      <span className="mono text-[0.7rem] text-slate-500">
                        stage {s.step} / {pipeline.length}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl md:text-3xl text-white leading-tight">
                      {s.title}
                    </h3>
                    <p className="mt-3 text-slate-300 leading-relaxed max-w-3xl">
                      {s.description}
                    </p>

                    {s.kind === "code" ? (
                      <div className="code-block mt-5 max-w-3xl">
                        {highlightCode(s.snippet)}
                      </div>
                    ) : (
                      <div className="mt-5 max-w-3xl rounded-md border border-white/10 bg-ink-900/60 px-5 py-4">
                        <div className="formula text-xl md:text-[1.4rem] text-white">
                          {s.snippet}
                        </div>
                        {(s as { legend?: string }).legend ? (
                          <div className="mono text-[0.72rem] tracking-[0.1em] text-slate-500 mt-2">
                            {(s as { legend?: string }).legend}
                          </div>
                        ) : null}
                      </div>
                    )}

                    {(s as { footnote?: string }).footnote ? (
                      <p className="mt-3 text-sm text-slate-500 leading-relaxed max-w-2xl">
                        <span className="text-teal-glow/80 mr-2">—</span>
                        {(s as { footnote?: string }).footnote}
                      </p>
                    ) : null}
                  </div>
                </article>
              </ScrollReveal>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
