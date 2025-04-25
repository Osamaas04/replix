import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-secondary/10 dark:bg-zinc-50/10", className)}
      {...props} />
  );
}

export { Skeleton }
