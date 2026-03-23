interface StickyFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function StickyFooter({ children, className }: StickyFooterProps) {
  return (
    <footer className={`sticky bottom-0 border-t border-gray-200 bg-white px-4 py-3 ${className ?? ""}`}>
      {children}
    </footer>
  );
}

export default StickyFooter;
