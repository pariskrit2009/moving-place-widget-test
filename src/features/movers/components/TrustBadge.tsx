export function TrustBadge({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <div className="flex items-center gap-1">
      {icon}
      <span className="text-sm font-semibold text-gray-800">{label}</span>
    </div>
  );
}
