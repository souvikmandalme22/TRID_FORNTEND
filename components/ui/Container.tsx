import { cn } from "@/lib/utils";

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
  narrow?: boolean;
}

export function Container({ children, className, narrow = false }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-8 lg:px-12",
        narrow ? "max-w-3xl" : "max-w-7xl",
        className
      )}
    >
      {children}
    </div>
  );
}
