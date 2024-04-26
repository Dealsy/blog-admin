import { cn } from "@/lib/utils";

type ContainerProps = {
  children: React.ReactNode;
  width: string;
  className?: string;
};

export default function Container({
  children,
  width,
  className,
}: ContainerProps) {
  return (
    <div
      className={cn(
        `mx-auto flex max-w-${width} flex-col gap-5 px-3`,
        className
      )}
    >
      {" "}
      {children}{" "}
    </div>
  );
}
