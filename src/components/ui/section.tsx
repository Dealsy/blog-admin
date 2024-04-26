import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  description: string;
  className?: string;
};

export default function Section({
  children,
  description,
  className,
}: SectionProps) {
  return (
    <section
      aria-labelledby={description}
      className={cn("flex justify-center py-6", className)}
    >
      {children}
    </section>
  );
}
