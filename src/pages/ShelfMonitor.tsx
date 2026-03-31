import ReactECharts from "echarts-for-react";
import { Monitor, Wifi, WifiOff, Activity, AlertTriangle, CheckCircle, Clock, Zap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const shelves = [
  { id: "A1-01", zone: "A区", temp: 22.3, humidity: 45, weight: 892, capacity: 1000, status: "online", lastUpdate: "2s前" },
  { id: "A1-02", zone: "A区", temp: 23.1, humidity: 48, weight: 756, capacity: 1000, status: "online", lastUpdate: "1s前" },
  { id: "A2-01", zone: "A区", temp: 22.8, humidity: 46, weight: 920, capacity: 1000, status: "online", lastUpdate: "3s前" },
  { id: "B2-01", zone: "B区", temp: 19.8, humidity: 52, weight: 234, capacity: 800, status: "warning", lastUpdate: "5s前" },
  { id: "B2-02", zone: "B区", temp: 21.5, humidity: 44, weight: 678, capacity: 800, status: "online", lastUpdate: "2s前" },
  { id: "B3-01", zone: "B区", temp: 20.1, humidity: 50, weight: 610, capacity: 800, status: "online", lastUpdate: "4s前" },
  { id: "C1-01", zone: "C区", temp: 25.7, humidity: 61, weight: 990, capacity: 1200, status: "critical", lastUpdate: "8s前" },
  { id: "C1-02", zone: "C区", temp: 22.0, humidity: 46, weight: 543, capacity: 1200, status: "online", lastUpdate: "1s前" },
  { id: "C2-01", zone: "C区", temp: 23.4, humidity: 49, weight: 870, capacity: 1200, status: "online", lastUpdate: "2s前" },
  { id: "D1-01", zone: "D区", temp: 20.2, humidity: 43, weight: 0, capacity: 600, status: "offline", lastUpdate: "2h前" },
  { id: "D1-02", zone: "D区", temp: 21.8, humidity: 47, weight: 812, capacity: 1000, status: "online", lastUpdate: "1s前" },
  { id: "D2-01", zone: "D区", temp: 21.0, humidity: 45, weight: 580, capacity: 1000, status: "online", lastUpdate: "3s前" },
];

const realtimeOption = {
  tooltip: { trigger: "axis" },
  legend: { data: ["负载率", "温度"], textStyle: { color: "#94a3b8" }, top: 0 },
  grid: { top: 35, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: Array.from({ length: 24 }, (_, i) => `${i}:00`), axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: [
    { type: "value", name: "%", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
    { type: "value", name: "°C", splitLine: { show: false }, axisLabel: { color: "#94a3b8" } },
  ],
  series: [
    { name: "负载率", type: "line", smooth: true, data: [65,62,58,55,52,50,48,55,68,78,85,88,90,87,82,79,75,72,68,65,62,60,58,55], lineStyle: { color: "#06b6d4", width: 2 }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(6,182,212,0.25)" }, { offset: 1, color: "rgba(6,182,212,0)" }] } }, itemStyle: { color: "#06b6d4" } },
    { name: "温度", yAxisIndex: 1, type: "line", smooth: true, data: [20,19.5,19,18.8,18.5,18.2,18,19,21,22.5,23.5,24,24.5,24.2,23.8,23.2,22.8,22.2,21.5,21,20.5,20.2,20,19.8], lineStyle: { color: "#f97316", width: 2 }, itemStyle: { color: "#f97316" } },
  ],
  backgroundColor: "transparent",
};

const zoneLoadOption = {
  tooltip: { trigger: "axis", axisPointer: { type: "shadow" } },
  grid: { top: 20, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: ["A区", "B区", "C区", "D区"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", max: 100, splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8", formatter: "{value}%" } },
  series: [
    { name: "当前负载", type: "bar", barWidth: 30, data: [
      { value: 86, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#06b6d4" }, { offset: 1, color: "#0891b2" }] } } },
      { value: 63, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#22d3ee" }, { offset: 1, color: "#06b6d4" }] } } },
      { value: 92, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#ef4444" }, { offset: 1, color: "#dc2626" }] } } },
      { value: 58, itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#34d399" }, { offset: 1, color: "#10b981" }] } } },
    ] },
  ],
  backgroundColor: "transparent",
};

const sensorRadarOption = {
  tooltip: {},
  radar: {
    indicator: [
      { name: "温度", max: 100 },
      { name: "湿度", max: 100 },
      { name: "重量", max: 100 },
      { name: "电量", max: 100 },
      { name: "信号", max: 100 },
      { name: "响应", max: 100 },
    ],
    shape: "polygon",
    splitArea: { areaStyle: { color: ["rgba(6,182,212,0.02)", "rgba(6,182,212,0.05)"] } },
    axisLine: { lineStyle: { color: "#334155" } },
    splitLine: { lineStyle: { color: "#1e293b" } },
    axisName: { color: "#94a3b8", fontSize: 11 },
  },
  series: [{
    type: "radar",
    data: [
      { value: [85, 72, 88, 95, 92, 78], name: "A区", lineStyle: { color: "#06b6d4" }, areaStyle: { color: "rgba(6,182,212,0.15)" }, itemStyle: { color: "#06b6d4" } },
      { value: [68, 80, 55, 88, 85, 90], name: "B区", lineStyle: { color: "#f97316" }, areaStyle: { color: "rgba(249,115,22,0.15)" }, itemStyle: { color: "#f97316" } },
    ],
  }],
  backgroundColor: "transparent",
};

const alertTrendOption = {
  tooltip: { trigger: "axis" },
  grid: { top: 20, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { name: "告警", type: "bar", stack: "total", data: [5, 8, 3, 12, 6, 2, 4], itemStyle: { color: "#ef4444", borderRadius: [2, 2, 0, 0] } },
    { name: "预警", type: "bar", stack: "total", data: [12, 15, 8, 20, 14, 6, 9], itemStyle: { color: "#f97316", borderRadius: [2, 2, 0, 0] } },
    { name: "正常", type: "bar", stack: "total", data: [83, 77, 89, 68, 80, 92, 87], itemStyle: { color: "#34d399", borderRadius: [2, 2, 0, 0] } },
  ],
  backgroundColor: "transparent",
};

const statusColor: Record<string, string> = { online: "bg-cyber-green", warning: "bg-cyber-orange", critical: "bg-cyber-red", offline: "bg-muted-foreground" };
const statusLabel: Record<string, string> = { online: "在线", warning: "预警", critical: "告急", offline: "离线" };

const recentEvents = [
  { time: "14:32:05", shelf: "C1-01", type: "critical", msg: "温度超限 25.7°C" },
  { time: "14:28:17", shelf: "B2-01", type: "warning", msg: "库存低于阈值 29%" },
  { time: "14:15:42", shelf: "D1-01", type: "offline", msg: "传感器离线" },
  { time: "13:58:20", shelf: "A1-02", type: "online", msg: "补货完成，负载恢复" },
  { time: "13:42:11", shelf: "C1-02", type: "warning", msg: "湿度偏高 58%" },
  { time: "13:30:05", shelf: "B3-01", type: "online", msg: "设备重启成功" },
];

const eventColor: Record<string, string> = { critical: "text-cyber-red", warning: "text-cyber-orange", offline: "text-muted-foreground", online: "text-cyber-green" };

export default function ShelfMonitor() {
  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Monitor} label="在线货架" value="1,198" change="99.2%" delay={0} />
        <StatCard icon={Wifi} label="传感器在线" value="4,782" change="98.6%" delay={0.05} />
        <StatCard icon={WifiOff} label="离线设备" value="12" change="3 较昨日" positive={false} delay={0.1} color="text-cyber-red" />
        <StatCard icon={Activity} label="平均负载" value="76.4%" change="2.3%" delay={0.15} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard delay={0.2} className="lg:col-span-2">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">24h负载与温度曲线</h3>
          <ReactECharts option={realtimeOption} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard delay={0.25}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">分区负载对比</h3>
          <ReactECharts option={zoneLoadOption} style={{ height: 260 }} />
        </GlassCard>
      </div>

      {/* Shelf Grid */}
      <GlassCard delay={0.3}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground">货架实时状态</h3>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyber-green" />在线</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyber-orange" />预警</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-cyber-red" />告急</span>
            <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-muted-foreground" />离线</span>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {shelves.map((s) => {
            const loadPct = s.capacity ? Math.round((s.weight / s.capacity) * 100) : 0;
            return (
              <div key={s.id} className="glass-card p-3 text-center hover:scale-[1.02] transition-transform">
                <div className="flex items-center justify-center gap-1.5 mb-2">
                  <span className={`status-dot ${statusColor[s.status]}`} />
                  <span className="text-xs text-muted-foreground">{statusLabel[s.status]}</span>
                </div>
                <p className="font-display text-sm text-foreground font-semibold">{s.id}</p>
                <p className="text-xs text-muted-foreground mb-2">{s.zone}</p>
                {/* Load bar */}
                <div className="w-full h-1.5 bg-secondary rounded-full overflow-hidden mb-1.5">
                  <div
                    className={`h-full rounded-full transition-all ${loadPct > 85 ? 'bg-cyber-red' : loadPct > 60 ? 'bg-cyber-orange' : 'bg-cyber-green'}`}
                    style={{ width: `${loadPct}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground">{loadPct}% · {s.weight}kg</p>
                <div className="mt-1.5 space-y-0.5 text-xs text-muted-foreground">
                  <p>{s.temp}°C / {s.humidity}%</p>
                  <p className="text-primary/60">{s.lastUpdate}</p>
                </div>
              </div>
            );
          })}
        </div>
      </GlassCard>

      {/* Charts Row 2 + Event Log */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard delay={0.35}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">传感器健康雷达</h3>
          <ReactECharts option={sensorRadarOption} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard delay={0.4}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">本周告警趋势</h3>
          <ReactECharts option={alertTrendOption} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard delay={0.45}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">实时事件日志</h3>
          <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1 custom-scrollbar">
            {recentEvents.map((e, i) => (
              <div key={i} className="flex items-start gap-2 p-2 rounded-lg bg-secondary/30 hover:bg-secondary/50 transition-colors">
                <Clock className="w-3.5 h-3.5 mt-0.5 text-muted-foreground shrink-0" />
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-muted-foreground">{e.time}</span>
                    <span className="font-display text-xs font-semibold text-foreground">{e.shelf}</span>
                  </div>
                  <p className={`text-xs mt-0.5 ${eventColor[e.type]}`}>{e.msg}</p>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Data Table */}
      <GlassCard delay={0.5}>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">货架详细数据</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border/50 text-muted-foreground">
                <th className="text-left py-2 px-3 font-semibold">编号</th>
                <th className="text-left py-2 px-3 font-semibold">区域</th>
                <th className="text-left py-2 px-3 font-semibold">状态</th>
                <th className="text-right py-2 px-3 font-semibold">温度</th>
                <th className="text-right py-2 px-3 font-semibold">湿度</th>
                <th className="text-right py-2 px-3 font-semibold">重量</th>
                <th className="text-right py-2 px-3 font-semibold">容量</th>
                <th className="text-right py-2 px-3 font-semibold">负载率</th>
                <th className="text-right py-2 px-3 font-semibold">更新</th>
              </tr>
            </thead>
            <tbody>
              {shelves.map((s) => {
                const loadPct = s.capacity ? Math.round((s.weight / s.capacity) * 100) : 0;
                return (
                  <tr key={s.id} className="border-b border-border/20 hover:bg-secondary/20 transition-colors">
                    <td className="py-2.5 px-3 font-display font-semibold text-foreground">{s.id}</td>
                    <td className="py-2.5 px-3 text-muted-foreground">{s.zone}</td>
                    <td className="py-2.5 px-3">
                      <span className="flex items-center gap-1.5">
                        <span className={`w-2 h-2 rounded-full ${statusColor[s.status]}`} />
                        <span className={`text-xs ${s.status === 'critical' ? 'text-cyber-red' : s.status === 'warning' ? 'text-cyber-orange' : s.status === 'offline' ? 'text-muted-foreground' : 'text-cyber-green'}`}>
                          {statusLabel[s.status]}
                        </span>
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{s.temp}°C</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{s.humidity}%</td>
                    <td className="py-2.5 px-3 text-right text-foreground font-semibold">{s.weight}kg</td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground">{s.capacity}kg</td>
                    <td className="py-2.5 px-3 text-right">
                      <span className={`font-semibold ${loadPct > 85 ? 'text-cyber-red' : loadPct > 60 ? 'text-cyber-orange' : 'text-cyber-green'}`}>
                        {loadPct}%
                      </span>
                    </td>
                    <td className="py-2.5 px-3 text-right text-muted-foreground text-xs">{s.lastUpdate}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
