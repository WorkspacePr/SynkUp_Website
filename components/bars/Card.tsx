import { LucideIcon } from "lucide-react";

interface CardProps {
  value: string | number;
  label: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export default function Card({ value, label, icon: Icon, iconColor, iconBg }: CardProps) {
  return (
    <div className="bg-foreground rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow border border-bd-primary">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-3xl font-bold text-header mb-1">{value}</div>
          <div className="text-sm font-medium text-sub-text">{label}</div>
        </div>
        <div 
          className="w-12 h-12 rounded-xl flex items-center justify-center"
          style={{ backgroundColor: iconBg || 'rgba(13, 148, 136, 0.1)' }}
        >
          <Icon className="w-6 h-6" style={{ color: iconColor || 'var(--primary)' }} />
        </div>
      </div>
    </div>
  );
}