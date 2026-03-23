interface FieldRowProps {
  children: React.ReactNode;
  className?: string;
}

export default function FieldRow({ children, className }: FieldRowProps) {
  return (
    <div className={`flex flex-col gap-2 ${className || ""}`}>
      {children}
    </div>
  );
}
