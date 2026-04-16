import { cn } from "@/lib/utils";

interface StickyFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyFooter({ children, className }: StickyFooterProps) {
  return (
    <footer
      className={cn(
        "sticky bottom-0 bg-white/80 backdrop-blur-sm px-6 py-4 border-[#b1bbc8]/30",
        className,
      )}
    >
      {children}
    </footer>
  );
}

export default StickyFooter;
