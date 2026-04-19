import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const LINKS = [
  { id: "problem", label: "Problem" },
  { id: "modalities", label: "Modalities" },
  { id: "pipeline", label: "Pipeline" },
  { id: "nre", label: "NRE" },
  { id: "patients", label: "Patients" },
  { id: "variation", label: "Variation" },
  { id: "biomarkers", label: "Biomarkers" },
  { id: "ml", label: "ML" },
  { id: "limits", label: "Limits" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${
          scrolled
            ? "bg-ink-900/75 backdrop-blur-lg border-b border-white/5"
            : "bg-transparent"
        }`}
    >
      <nav className="max-w-[1200px] mx-auto px-6 md:px-10 flex items-center justify-between h-16">
        <a
          href="#top"
          className="flex items-center gap-3 group"
          aria-label="Home"
        >
          <span className="relative w-7 h-7 grid place-items-center">
            <span className="absolute inset-0 rounded-full border border-teal-glow/50" />
            <span className="absolute inset-[6px] rounded-full bg-teal-glow/80 animate-pulse-slow" />
          </span>
          <span className="font-display text-sm text-white tracking-tight">
            EEG · Neural Scaffold
          </span>
          <span className="mono text-[0.65rem] tracking-[0.24em] text-slate-400 hidden md:inline-block">
            · RESEARCH
          </span>
        </a>

        {/* desktop */}
        <ul className="hidden lg:flex items-center gap-6">
          {LINKS.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className="mono text-[0.72rem] tracking-[0.2em] uppercase text-slate-400 hover:text-teal-glow transition-colors"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
          className="lg:hidden p-2 text-slate-300 hover:text-white"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </nav>

      {/* mobile */}
      {open ? (
        <div className="lg:hidden bg-ink-900/95 border-b border-white/5">
          <ul className="px-6 py-4 grid grid-cols-2 gap-3">
            {LINKS.map((l) => (
              <li key={l.id}>
                <a
                  onClick={() => setOpen(false)}
                  href={`#${l.id}`}
                  className="block mono text-[0.72rem] tracking-[0.2em] uppercase text-slate-400 hover:text-teal-glow py-2"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </header>
  );
}
