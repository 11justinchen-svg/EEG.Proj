import { ReactNode } from "react";

type Props = {
  eyebrow?: string;
  index?: string;
  title: ReactNode;
  kicker?: ReactNode;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  index,
  title,
  kicker,
  align = "left",
}: Props) {
  const alignCls = align === "center" ? "text-center mx-auto" : "text-left";
  return (
    <header className={`max-w-3xl ${alignCls} mb-12`}>
      <div
        className={`flex items-center gap-3 mb-5 ${align === "center" ? "justify-center" : ""}`}
      >
        {index ? (
          <span className="mono text-[0.72rem] tracking-[0.22em] text-teal-glow/80">
            {index}
          </span>
        ) : null}
        {eyebrow ? (
          <>
            {index ? (
              <span className="h-px w-6 bg-white/10" aria-hidden />
            ) : null}
            <span className="eyebrow">{eyebrow}</span>
          </>
        ) : null}
      </div>
      <h2 className="font-display text-4xl md:text-5xl leading-[1.05] text-white tracking-tight">
        {title}
      </h2>
      {kicker ? (
        <p className="mt-5 text-slate-300/85 text-lg leading-relaxed max-w-2xl">
          {kicker}
        </p>
      ) : null}
      <div
        className={`teal-rule mt-6 ${align === "center" ? "mx-auto" : ""}`}
      />
    </header>
  );
}
