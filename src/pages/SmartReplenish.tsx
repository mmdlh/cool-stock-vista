import ReactECharts from "echarts-for-react";
import { RefreshCw, Clock, TrendingUp, Zap } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const forecastOption = {
  tooltip: { trigger: "axis" },
  legend: { textStyle: { color: "#94a3b8" }, top: 0 },
  grid: { top: 40, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: ["今天","明天","后天","第4天","第5天","第6天","第7天"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { name: "预测消耗", type: "line", smooth: true, data: [420,450,380,410,520,480,390], lineStyle: { color: "#f59e0b", width: 2, type: "dashed" }, itemStyle: { color: "#f59e0b" } },
    { name: "建议补货", type: "bar", data: [0,0,200,0,300,0,180], itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#10b981" }, { offset: 1, color: "#047857" }] }, borderRadius: [4, 4, 0, 0] } },
  ],
  backgroundColor: "transparent",
};

const gaugeOption = {
  series: [{
    type: "gauge", startAngle: 200, endAngle: -20, min: 0, max: 100,
    pointer: { show: true, length: "60%", width: 4, itemStyle: { color: "#06b6d4" } },
    axisLine: { lineStyle: { width: 20, color: [[0.3, "#ef4444"], [0.7, "#f59e0b"], [1, "#10b981"]] } },
    axisTick: { show: false }, splitLine: { show: false },
    axisLabel: { color: "#94a3b8", distance: 25, fontSize: 10 },
    detail: { valueAnimation: true, fontSize: 28, color: "#06b6d4", fontFamily: "Orbitron", offsetCenter: [0, "60%"] },
    data: [{ value: 87, name: "补货效率" }],
    title: { color: "#94a3b8", fontSize: 12, offsetCenter: [0, "80%"] },
  }],
  backgroundColor: "transparent",
};

const tasks = [
  { id: "RPL-001", product: "农夫山泉550ml", qty: 500, priority: "紧急", eta: "2h", progress: 75 },
  { id: "RPL-002", product: "雀巢咖啡200g", qty: 200, priority: "紧急", eta: "1.5h", progress: 40 },
  { id: "RPL-003", product: "iPhone充电线", qty: 100, priority: "普通", eta: "4h", progress: 10 },
  { id: "RPL-004", product: "维达纸巾10包装", qty: 300, priority: "普通", eta: "6h", progress: 0 },
];

const priorityStyle: Record<string, string> = { "紧急": "text-cyber-red", "普通": "text-cyber-blue" };

export default function SmartReplenish() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={RefreshCw} label="今日补货单" value="34" change="12% 较昨日" delay={0} />
        <StatCard icon={Clock} label="平均补货时间" value="2.4h" change="0.3h↓" delay={0.05} />
        <StatCard icon={TrendingUp} label="准确率" value="96.8%" change="1.2%" delay={0.1} />
        <StatCard icon={Zap} label="AI建议采纳率" value="89.3%" change="3.5%" delay={0.15} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2" delay={0.2}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">消耗预测 & 补货建议</h3>
          <ReactECharts option={forecastOption} style={{ height: 300 }} />
        </GlassCard>
        <GlassCard delay={0.25}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">补货效率</h3>
          <ReactECharts option={gaugeOption} style={{ height: 300 }} />
        </GlassCard>
      </div>

      <GlassCard delay={0.3}>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">补货任务队列</h3>
        <div className="space-y-3">
          {tasks.map((t) => (
            <div key={t.id} className="glass-card p-4 flex items-center justify-between gap-4">
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className="font-display text-xs text-primary">{t.id}</span>
                  <span className={`text-xs font-semibold ${priorityStyle[t.priority]}`}>{t.priority}</span>
                </div>
                <p className="font-body mt-1">{t.product} × {t.qty}</p>
              </div>
              <div className="text-right text-sm text-muted-foreground">
                <p>预计 {t.eta}</p>
                <div className="flex items-center gap-2 mt-1">
                  <div className="w-20 h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${t.progress}%` }} />
                  </div>
                  <span className="text-xs">{t.progress}%</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
