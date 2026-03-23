interface FormSectionProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

export default function FormSection({ title, description, children, className }: FormSectionProps) {
  return (
    <section className={`mb-6 ${className || ""}`}>
      {title && <h2 className="text-lg font-semibold">{title}</h2>}
      {description && <p className="text-sm text-gray-500 mb-4">{description}</p>}
      <div className="space-y-4">{children}</div>
    </section>
  );
}
