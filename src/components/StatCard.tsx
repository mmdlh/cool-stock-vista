import GlassCard from "./GlassCard";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  change?: string;
  positive?: boolean;
  delay?: number;
  color?: string;
}

export default function StatCard({ icon: Icon, label, value, change, positive = true, delay = 0, color = "text-primary" }: StatCardProps) {
  return (
    <GlassCard delay={delay}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-body">{label}</p>
          <p className="stat-value mt-1">{value}</p>
          {change && (
            <p className={`text-xs mt-1 font-body ${positive ? "text-cyber-green" : "text-cyber-red"}`}>
              {positive ? "↑" : "↓"} {change}
            </p>
          )}
        </div>
        <div className={`p-2.5 rounded-lg bg-primary/10 ${color}`}>
          <Icon className="w-5 h-5" />
        </div>
      </div>
    </GlassCard>
  );
}
