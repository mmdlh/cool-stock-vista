import ReactECharts from "echarts-for-react";
import { BarChart3, TrendingUp, PieChart, Activity } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const multiLineOption = {
  tooltip: { trigger: "axis" },
  legend: { textStyle: { color: "#94a3b8" }, top: 0 },
  grid: { top: 40, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: ["Q1","Q2","Q3","Q4"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { name: "营收(万)", type: "bar", data: [1200,1800,2400,3200], itemStyle: { color: "#06b6d4" } },
    { name: "成本(万)", type: "bar", data: [800,1100,1500,1900], itemStyle: { color: "#8b5cf6" } },
    { name: "利润(万)", type: "line", data: [400,700,900,1300], lineStyle: { color: "#10b981", width: 3 }, itemStyle: { color: "#10b981" } },
  ],
  backgroundColor: "transparent",
};

const heatData: number[][] = [];
for (let i = 0; i < 7; i++) for (let j = 0; j < 24; j++) heatData.push([j, i, Math.floor(Math.random() * 100)]);

const heatOption = {
  tooltip: { formatter: (p: any) => `${["周一","周二","周三","周四","周五","周六","周日"][p.data[1]]} ${p.data[0]}:00 — 活跃度: ${p.data[2]}` },
  grid: { top: 10, right: 20, bottom: 40, left: 60 },
  xAxis: { type: "category", data: Array.from({ length: 24 }, (_, i) => `${i}:00`), axisLabel: { color: "#94a3b8", interval: 3 }, axisLine: { lineStyle: { color: "#334155" } } },
  yAxis: { type: "category", data: ["周一","周二","周三","周四","周五","周六","周日"], axisLabel: { color: "#94a3b8" }, axisLine: { lineStyle: { color: "#334155" } } },
  visualMap: { min: 0, max: 100, show: false, inRange: { color: ["#0c1929", "#0e7490", "#06b6d4", "#67e8f9"] } },
  series: [{ type: "heatmap", data: heatData, emphasis: { itemStyle: { shadowBlur: 10, shadowColor: "rgba(6,182,212,0.5)" } } }],
  backgroundColor: "transparent",
};

const funnelOption = {
  tooltip: { trigger: "item" },
  series: [{
    type: "funnel", left: "10%", top: 20, bottom: 20, width: "80%", sort: "descending",
    label: { show: true, color: "#94a3b8" },
    data: [
      { value: 100, name: "需求生成", itemStyle: { color: "#06b6d4" } },
      { value: 80, name: "订单确认", itemStyle: { color: "#3b82f6" } },
      { value: 60, name: "拣货完成", itemStyle: { color: "#8b5cf6" } },
      { value: 45, name: "出库交付", itemStyle: { color: "#a855f7" } },
      { value: 35, name: "客户签收", itemStyle: { color: "#ec4899" } },
    ],
  }],
  backgroundColor: "transparent",
};

export default function DataAnalysis() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={BarChart3} label="数据报表" value="128" change="本月新增 23" delay={0} />
        <StatCard icon={TrendingUp} label="运营效率" value="92.1%" change="3.4%↑" delay={0.05} />
        <StatCard icon={PieChart} label="成本节约" value="¥24.5万" change="18.2%↑" delay={0.1} />
        <StatCard icon={Activity} label="预测准确" value="94.6%" change="1.8%↑" delay={0.15} />
      </div>

      <GlassCard delay={0.2}>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">季度经营分析</h3>
        <ReactECharts option={multiLineOption} style={{ height: 300 }} />
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={0.25}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">仓库活跃度热力图</h3>
          <ReactECharts option={heatOption} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard delay={0.3}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">订单转化漏斗</h3>
          <ReactECharts option={funnelOption} style={{ height: 280 }} />
        </GlassCard>
      </div>
    </div>
  );
}
