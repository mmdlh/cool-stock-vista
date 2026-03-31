import ReactECharts from "echarts-for-react";
import { Bell, AlertTriangle, Shield, Clock } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const alertTrend = {
  tooltip: { trigger: "axis" },
  legend: { textStyle: { color: "#94a3b8" }, top: 0 },
  grid: { top: 40, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: ["1日","5日","10日","15日","20日","25日","30日"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { name: "严重", type: "line", data: [2,1,3,0,1,2,1], lineStyle: { color: "#ef4444", width: 2 }, itemStyle: { color: "#ef4444" }, areaStyle: { color: "rgba(239,68,68,0.1)" } },
    { name: "警告", type: "line", data: [8,12,6,15,9,7,11], lineStyle: { color: "#f59e0b", width: 2 }, itemStyle: { color: "#f59e0b" }, areaStyle: { color: "rgba(245,158,11,0.1)" } },
    { name: "信息", type: "line", data: [25,30,22,28,35,20,32], lineStyle: { color: "#06b6d4", width: 2 }, itemStyle: { color: "#06b6d4" }, areaStyle: { color: "rgba(6,182,212,0.1)" } },
  ],
  backgroundColor: "transparent",
};

const pieOption = {
  tooltip: { trigger: "item" },
  series: [{
    type: "pie", radius: ["45%", "70%"],
    data: [
      { value: 12, name: "设备故障", itemStyle: { color: "#ef4444" } },
      { value: 23, name: "库存预警", itemStyle: { color: "#f59e0b" } },
      { value: 8, name: "环境异常", itemStyle: { color: "#8b5cf6" } },
      { value: 15, name: "网络中断", itemStyle: { color: "#06b6d4" } },
      { value: 5, name: "安全告警", itemStyle: { color: "#ec4899" } },
    ],
    label: { color: "#94a3b8" },
  }],
  backgroundColor: "transparent",
};

const alerts = [
  { id: "ALT-2024-001", type: "严重", msg: "C1-01号架重量传感器异常，超载98%", time: "3分钟前", resolved: false },
  { id: "ALT-2024-002", type: "警告", msg: "B2-01号架库存低于安全线", time: "15分钟前", resolved: false },
  { id: "ALT-2024-003", type: "警告", msg: "D区环境温度偏高 (26.3°C)", time: "32分钟前", resolved: false },
  { id: "ALT-2024-004", type: "信息", msg: "A区自动补货任务已完成", time: "1小时前", resolved: true },
  { id: "ALT-2024-005", type: "严重", msg: "冷藏区温度超标 (8.5°C)", time: "2小时前", resolved: true },
  { id: "ALT-2024-006", type: "信息", msg: "系统日常巡检完成，未发现异常", time: "3小时前", resolved: true },
];

const typeStyle: Record<string, string> = { "严重": "bg-cyber-red/20 text-cyber-red", "警告": "bg-cyber-orange/20 text-cyber-orange", "信息": "bg-cyber-blue/20 text-cyber-blue" };

export default function AlertCenter() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Bell} label="总告警数" value="63" change="本月" delay={0} />
        <StatCard icon={AlertTriangle} label="待处理" value="3" change="紧急" positive={false} delay={0.05} color="text-cyber-red" />
        <StatCard icon={Shield} label="已处理" value="60" change="95.2%" delay={0.1} />
        <StatCard icon={Clock} label="平均响应" value="8.4min" change="1.2min↓" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2" delay={0.2}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">告警趋势</h3>
          <ReactECharts option={alertTrend} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard delay={0.25}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">告警分类</h3>
          <ReactECharts option={pieOption} style={{ height: 280 }} />
        </GlassCard>
      </div>

      <GlassCard delay={0.3}>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">告警列表</h3>
        <div className="space-y-2">
          {alerts.map((a) => (
            <div key={a.id} className={`glass-card p-4 flex items-center justify-between gap-4 ${a.resolved ? "opacity-60" : ""}`}>
              <div className="flex items-center gap-3 flex-1">
                <span className={`text-xs px-2 py-0.5 rounded-full font-body font-semibold ${typeStyle[a.type]}`}>{a.type}</span>
                <div>
                  <p className="font-body text-sm">{a.msg}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{a.id} · {a.time}</p>
                </div>
              </div>
              <span className={`text-xs font-body font-semibold ${a.resolved ? "text-cyber-green" : "text-cyber-orange animate-pulse"}`}>
                {a.resolved ? "已处理" : "待处理"}
              </span>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
