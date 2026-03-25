interface HelperTextProps {
  children: React.ReactNode;
  className?: string;
}

export default function HelperText({ children, className }: HelperTextProps) {
  return (
    <p className={`text-sm text-gray-500 ${className || ""}`}>
      {children}
    </p>
  );
}
