import ReactECharts from "echarts-for-react";
import { Thermometer, Droplets, Wind, Gauge } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const tempHumidOption = {
  tooltip: { trigger: "axis" },
  legend: { textStyle: { color: "#94a3b8" }, top: 0 },
  grid: { top: 40, right: 60, bottom: 30, left: 50 },
  xAxis: { type: "category", data: Array.from({ length: 24 }, (_, i) => `${i}:00`), axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: [
    { type: "value", name: "温度°C", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" }, nameTextStyle: { color: "#94a3b8" } },
    { type: "value", name: "湿度%", splitLine: { show: false }, axisLabel: { color: "#94a3b8" }, nameTextStyle: { color: "#94a3b8" } },
  ],
  series: [
    { name: "温度", type: "line", smooth: true, data: [20,19.5,19,18.5,18,18,18.5,19,20,21,22,23,24,24.5,24,23.5,23,22.5,22,21.5,21,20.5,20,19.5], lineStyle: { color: "#ef4444", width: 2 }, itemStyle: { color: "#ef4444" } },
    { name: "湿度", type: "line", yAxisIndex: 1, smooth: true, data: [55,56,57,58,59,60,58,55,50,48,45,43,42,41,42,44,46,48,50,52,53,54,55,55], lineStyle: { color: "#3b82f6", width: 2 }, itemStyle: { color: "#3b82f6" } },
  ],
  backgroundColor: "transparent",
};

const zones = [
  { zone: "A区", temp: 22.3, humidity: 45, co2: 420, light: 850, status: "正常" },
  { zone: "B区", temp: 19.8, humidity: 52, co2: 380, light: 720, status: "正常" },
  { zone: "C区", temp: 25.7, humidity: 61, co2: 520, light: 900, status: "预警" },
  { zone: "D区", temp: 16.2, humidity: 38, co2: 350, light: 680, status: "正常" },
  { zone: "冷藏区", temp: 4.2, humidity: 75, co2: 290, light: 400, status: "正常" },
  { zone: "冷冻区", temp: -18.5, humidity: 30, co2: 180, light: 350, status: "正常" },
];

export default function Environment() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Thermometer} label="平均温度" value="21.3°C" change="适宜范围" delay={0} />
        <StatCard icon={Droplets} label="平均湿度" value="48.5%" change="正常" delay={0.05} />
        <StatCard icon={Wind} label="CO₂浓度" value="420ppm" change="达标" delay={0.1} />
        <StatCard icon={Gauge} label="环境评分" value="94" change="优秀" delay={0.15} />
      </div>

      <GlassCard delay={0.2}>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">24h温湿度变化</h3>
        <ReactECharts option={tempHumidOption} style={{ height: 300 }} />
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {zones.map((z, i) => (
          <GlassCard key={z.zone} delay={0.3 + i * 0.05}>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-display text-sm font-semibold text-foreground">{z.zone}</h4>
              <span className={`text-xs px-2 py-0.5 rounded-full font-body font-semibold ${z.status === "正常" ? "bg-cyber-green/20 text-cyber-green" : "bg-cyber-orange/20 text-cyber-orange"}`}>{z.status}</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm">
              {[
                { label: "温度", value: `${z.temp}°C`, icon: "🌡️" },
                { label: "湿度", value: `${z.humidity}%`, icon: "💧" },
                { label: "CO₂", value: `${z.co2}ppm`, icon: "🌬️" },
                { label: "光照", value: `${z.light}lux`, icon: "☀️" },
              ].map((m) => (
                <div key={m.label} className="flex items-center gap-2">
                  <span>{m.icon}</span>
                  <div>
                    <p className="text-xs text-muted-foreground">{m.label}</p>
                    <p className="font-body font-semibold text-foreground">{m.value}</p>
                  </div>
                </div>
              ))}
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
