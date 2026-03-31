import ReactECharts from "echarts-for-react";
import { Monitor, Wifi, WifiOff, Activity } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const shelves = [
  { id: "A1-01", zone: "A区", temp: 22.3, humidity: 45, weight: 892, status: "online" },
  { id: "A1-02", zone: "A区", temp: 23.1, humidity: 48, weight: 756, status: "online" },
  { id: "B2-01", zone: "B区", temp: 19.8, humidity: 52, weight: 234, status: "warning" },
  { id: "B2-02", zone: "B区", temp: 21.5, humidity: 44, weight: 678, status: "online" },
  { id: "C1-01", zone: "C区", temp: 25.7, humidity: 61, weight: 990, status: "critical" },
  { id: "C1-02", zone: "C区", temp: 22.0, humidity: 46, weight: 543, status: "online" },
  { id: "D1-01", zone: "D区", temp: 20.2, humidity: 43, weight: 0, status: "offline" },
  { id: "D1-02", zone: "D区", temp: 21.8, humidity: 47, weight: 812, status: "online" },
];

const realtimeOption = {
  tooltip: { trigger: "axis" },
  grid: { top: 20, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: Array.from({ length: 24 }, (_, i) => `${i}:00`), axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { name: "负载", type: "line", smooth: true, data: [65,62,58,55,52,50,48,55,68,78,85,88,90,87,82,79,75,72,68,65,62,60,58,55], lineStyle: { color: "#06b6d4", width: 2 }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(6,182,212,0.25)" }, { offset: 1, color: "rgba(6,182,212,0)" }] } }, itemStyle: { color: "#06b6d4" } },
  ],
  backgroundColor: "transparent",
};

const statusColor: Record<string, string> = { online: "bg-cyber-green", warning: "bg-cyber-orange", critical: "bg-cyber-red", offline: "bg-muted-foreground" };
const statusLabel: Record<string, string> = { online: "在线", warning: "预警", critical: "告急", offline: "离线" };

export default function ShelfMonitor() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Monitor} label="在线货架" value="1,198" change="99.2%" delay={0} />
        <StatCard icon={Wifi} label="传感器在线" value="4,782" change="98.6%" delay={0.05} />
        <StatCard icon={WifiOff} label="离线设备" value="12" change="3 较昨日" positive={false} delay={0.1} color="text-cyber-red" />
        <StatCard icon={Activity} label="平均负载" value="76.4%" change="2.3%" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={0.2}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">24h负载曲线</h3>
          <ReactECharts option={realtimeOption} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard delay={0.25}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">货架实时状态</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {shelves.map((s) => (
              <div key={s.id} className="glass-card p-3 text-center">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className={`status-dot ${statusColor[s.status]}`} />
                  <span className="text-xs text-muted-foreground">{statusLabel[s.status]}</span>
                </div>
                <p className="font-display text-sm text-foreground">{s.id}</p>
                <p className="text-xs text-muted-foreground">{s.zone}</p>
                <div className="mt-2 space-y-0.5 text-xs text-muted-foreground">
                  <p>{s.temp}°C / {s.humidity}%</p>
                  <p className="text-primary font-semibold">{s.weight}kg</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
