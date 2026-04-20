import { ElementType, ReactNode } from "react";
import { useScrollReveal } from "../../hooks/useScrollReveal";

type Props = {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
};

export default function ScrollReveal({
  children,
  delay = 0,
  as: Tag = "div",
  className = "",
}: Props) {
  const [ref, visible] = useScrollReveal<HTMLDivElement>();
  return (
    <Tag
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={`reveal-init ${visible ? "reveal-in" : ""} ${className}`}
    >
      {children}
    </Tag>
  );
}
