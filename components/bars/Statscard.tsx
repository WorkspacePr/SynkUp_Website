import { LucideIcon } from "lucide-react";

interface StatsCardProps {
  value: string | number;
  label: string;
  emoji?: string;
  icon?: LucideIcon;
  iconColor?: string;
  bgColor: string;
}

export default function StatsCard({
  value,
  label,
  emoji,
  bgColor,
  icon: Icon,
  iconColor,
}: StatsCardProps) {
  return (
    <div className={`${bgColor} rounded-xl p-6`}>
      <div className="flex items-start justify-between">
        <div>
          <div className="text-4xl font-bold text-header mb-2">{value}</div>
          <div className="text-sm font-medium text-header whitespace-pre-line">
            {label}
          </div>
        </div>
        <div className="text-4xl">{emoji}</div>
        {Icon && (
          <Icon
            className="w-10 h-10"
            style={{ color: iconColor || "var(--primary)" }}
          />
        )}
      </div>
    </div>
  );
}10