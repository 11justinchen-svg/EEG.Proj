import { Github, FileText, Mail } from "lucide-react";
import config from "../data/config.json";

export default function Footer() {
  return (
    <footer
      id="contact"
      className="relative pt-24 pb-12 border-t border-white/5"
    >
      <div className="max-w-[1200px] mx-auto px-6 md:px-10">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-12 items-end">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-teal-glow shadow-[0_0_12px_2px_rgba(14,230,200,0.8)]" />
              <span className="eyebrow">Correspondence</span>
            </div>
            <h3 className="font-display text-4xl md:text-5xl text-white leading-[1.05] max-w-xl">
              Open to lab collaboration,
              <br />
              <span className="italic text-slate-400">
                mentorship, and critique.
              </span>
            </h3>
            <p className="mt-5 text-slate-400 max-w-xl leading-relaxed">
              Feedback from neuroscientists, biomedical engineers, and clinical
              researchers is especially welcome — particularly on the deficit →
              channel-prioritization step and on wet-lab validation design.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={`mailto:${config.author.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-teal-glow text-ink-900 font-semibold text-sm hover:shadow-[0_0_40px_-5px_rgba(14,230,200,0.6)] transition-all"
              >
                <Mail size={14} /> {config.author.email}
              </a>
              <a
                href={config.author.github}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/15 text-slate-200 text-sm hover:border-teal-glow/60 transition-all"
              >
                <Github size={14} /> GitHub
              </a>
              <a
                href={config.author.paper}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-white/15 text-slate-200 text-sm hover:border-teal-glow/60 transition-all"
              >
                <FileText size={14} /> Preprint
              </a>
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <div className="eyebrow mb-2">Author</div>
              <div className="font-display text-2xl text-white">
                {config.author.name}
              </div>
              <div className="text-slate-400 text-sm mt-1">
                {config.author.school}
              </div>
              <div className="mono text-[0.7rem] tracking-[0.22em] text-slate-500 mt-2 uppercase">
                {config.author.cycle}
              </div>
            </div>
            <div className="pt-5 border-t border-white/5">
              <div className="eyebrow mb-2">Built with</div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mono text-[0.72rem] text-slate-400">
                {config.pipelineTools.map((t, i) => (
                  <span key={t} className="flex items-center gap-2">
                    {i > 0 ? <span className="text-slate-700">·</span> : null}
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="pt-5 border-t border-white/5">
              <div className="eyebrow mb-2">Data sources</div>
              <div className="flex flex-wrap gap-x-2 gap-y-1 mono text-[0.72rem] text-slate-400">
                {config.dataSources.map((t, i) => (
                  <span key={t} className="flex items-center gap-2">
                    {i > 0 ? <span className="text-slate-700">·</span> : null}
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-6 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
          <div className="mono text-[0.65rem] tracking-[0.22em] text-slate-500 uppercase">
            © {new Date().getFullYear()} {config.author.name} ·{" "}
            {config.author.school} · All figures placeholder pending data
          </div>
          <div className="mono text-[0.65rem] tracking-[0.22em] text-slate-600 uppercase">
            v0.1 · research preview
          </div>
        </div>
      </div>
    </footer>
  );
}
