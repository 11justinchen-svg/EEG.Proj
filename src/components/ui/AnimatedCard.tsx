import { ElementType, ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  accent?: "teal" | "amber" | "violet" | "none";
  as?: ElementType;
};

const accentMap: Record<NonNullable<Props["accent"]>, string> = {
  teal: "before:bg-teal-glow",
  amber: "before:bg-amber-glow",
  violet: "before:bg-violet-glow",
  none: "before:bg-white/20",
};

export default function AnimatedCard({
  children,
  className = "",
  accent = "teal",
  as: Tag = "div",
}: Props) {
  return (
    <Tag
      className={`
        relative glass hair-shadow rounded-lg p-6
        transition-all duration-500 ease-out
        hover:border-white/20 hover:-translate-y-0.5
        before:absolute before:left-0 before:top-6 before:bottom-6 before:w-[2px]
        before:opacity-60 before:rounded-full
        ${accentMap[accent]}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}
