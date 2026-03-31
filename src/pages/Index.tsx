import ReactECharts from "echarts-for-react";
import { Package, TrendingUp, AlertTriangle, CheckCircle, Boxes, Warehouse } from "lucide-react";
import StatCard from "@/components/StatCard";
import GlassCard from "@/components/GlassCard";

const lineOption = {
  tooltip: { trigger: "axis" },
  grid: { top: 30, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: ["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { name: "入库量", type: "line", smooth: true, data: [820,932,901,1234,1290,1330,1520,1430,1650,1820,1950,2100], lineStyle: { color: "#06b6d4", width: 3 }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(6,182,212,0.3)" }, { offset: 1, color: "rgba(6,182,212,0)" }] } }, itemStyle: { color: "#06b6d4" } },
    { name: "出库量", type: "line", smooth: true, data: [620,732,801,1034,1190,1230,1320,1330,1450,1620,1750,1900], lineStyle: { color: "#8b5cf6", width: 3 }, areaStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "rgba(139,92,246,0.3)" }, { offset: 1, color: "rgba(139,92,246,0)" }] } }, itemStyle: { color: "#8b5cf6" } },
  ],
  legend: { textStyle: { color: "#94a3b8" }, top: 0 },
  backgroundColor: "transparent",
};

const pieOption = {
  tooltip: { trigger: "item" },
  legend: { bottom: 0, textStyle: { color: "#94a3b8" } },
  series: [{
    type: "pie", radius: ["40%", "70%"], center: ["50%", "45%"],
    data: [
      { value: 335, name: "A区", itemStyle: { color: "#06b6d4" } },
      { value: 234, name: "B区", itemStyle: { color: "#8b5cf6" } },
      { value: 154, name: "C区", itemStyle: { color: "#f59e0b" } },
      { value: 135, name: "D区", itemStyle: { color: "#10b981" } },
      { value: 98, name: "E区", itemStyle: { color: "#ec4899" } },
    ],
    label: { color: "#94a3b8" },
    emphasis: { itemStyle: { shadowBlur: 20, shadowColor: "rgba(6,182,212,0.5)" } },
  }],
  backgroundColor: "transparent",
};

const barOption = {
  tooltip: { trigger: "axis" },
  grid: { top: 20, right: 20, bottom: 30, left: 50 },
  xAxis: { type: "category", data: ["货架A1","货架A2","货架B1","货架B2","货架C1","货架C2","货架D1"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8", rotate: 30 } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [{
    type: "bar", data: [85, 72, 93, 68, 91, 77, 88],
    itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 0, y2: 1, colorStops: [{ offset: 0, color: "#06b6d4" }, { offset: 1, color: "#0e7490" }] }, borderRadius: [4, 4, 0, 0] },
  }],
  backgroundColor: "transparent",
};

const radarOption = {
  radar: {
    indicator: [
      { name: "空间利用率", max: 100 }, { name: "周转效率", max: 100 },
      { name: "准确率", max: 100 }, { name: "响应时间", max: 100 },
      { name: "满载率", max: 100 }, { name: "异常率", max: 100 },
    ],
    axisName: { color: "#94a3b8" },
    splitArea: { areaStyle: { color: ["rgba(6,182,212,0.02)", "rgba(6,182,212,0.05)"] } },
    splitLine: { lineStyle: { color: "#1e293b" } },
    axisLine: { lineStyle: { color: "#334155" } },
  },
  series: [{
    type: "radar",
    data: [{ value: [92, 85, 97, 78, 88, 95], name: "当前表现", areaStyle: { color: "rgba(6,182,212,0.2)" }, lineStyle: { color: "#06b6d4", width: 2 }, itemStyle: { color: "#06b6d4" } }],
  }],
  backgroundColor: "transparent",
};

const tableData = [
  { id: "SH-001", name: "A1-01号架", zone: "A区", usage: 92, status: "正常", items: 156 },
  { id: "SH-002", name: "A1-02号架", zone: "A区", usage: 87, status: "正常", items: 142 },
  { id: "SH-003", name: "B2-01号架", zone: "B区", usage: 45, status: "低位预警", items: 68 },
  { id: "SH-004", name: "C1-03号架", zone: "C区", usage: 98, status: "满载", items: 200 },
  { id: "SH-005", name: "D1-01号架", zone: "D区", usage: 12, status: "异常", items: 18 },
  { id: "SH-006", name: "B1-02号架", zone: "B区", usage: 76, status: "正常", items: 128 },
];

const getStatusClass = (s: string) => {
  switch (s) {
    case "正常": return "text-cyber-green";
    case "低位预警": return "text-cyber-orange";
    case "满载": return "text-cyber-purple";
    case "异常": return "text-cyber-red";
    default: return "text-muted-foreground";
  }
};

export default function Index() {
  return (
    <div className="space-y-6">
      {/* Stats Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <StatCard icon={Warehouse} label="货架总数" value="1,284" change="12% 较上月" delay={0} />
        <StatCard icon={Package} label="在库商品" value="45,832" change="8.3%" delay={0.05} />
        <StatCard icon={TrendingUp} label="周转率" value="94.7%" change="2.1%" delay={0.1} />
        <StatCard icon={CheckCircle} label="货架利用率" value="87.3%" change="5.4%" delay={0.15} />
        <StatCard icon={AlertTriangle} label="待处理告警" value="23" change="3 较昨日" positive={false} delay={0.2} color="text-cyber-orange" />
        <StatCard icon={Boxes} label="今日出入库" value="3,426" change="15.2%" delay={0.25} />
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard className="lg:col-span-2" delay={0.3}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">出入库趋势</h3>
          <ReactECharts option={lineOption} style={{ height: 280 }} />
        </GlassCard>
        <GlassCard delay={0.35}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">区域分布</h3>
          <ReactECharts option={pieOption} style={{ height: 280 }} />
        </GlassCard>
      </div>

      {/* Charts Row 2 + Table */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <GlassCard delay={0.4}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">综合评分</h3>
          <ReactECharts option={radarOption} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard delay={0.45}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">货架利用率</h3>
          <ReactECharts option={barOption} style={{ height: 260 }} />
        </GlassCard>
        <GlassCard delay={0.5}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">实时状态</h3>
          <div className="space-y-3 mt-2">
            {[
              { label: "A区在线", pct: 98, color: "bg-cyber-green" },
              { label: "B区在线", pct: 85, color: "bg-cyber-blue" },
              { label: "C区在线", pct: 72, color: "bg-cyber-orange" },
              { label: "D区在线", pct: 91, color: "bg-cyber-purple" },
              { label: "E区在线", pct: 45, color: "bg-cyber-red" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-xs text-muted-foreground mb-1">
                  <span>{s.label}</span><span>{s.pct}%</span>
                </div>
                <div className="h-2 rounded-full bg-secondary overflow-hidden">
                  <div className={`h-full rounded-full ${s.color} transition-all duration-1000`} style={{ width: `${s.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Table */}
      <GlassCard delay={0.55}>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">货架明细</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="pb-3 text-left font-body font-semibold">编号</th>
                <th className="pb-3 text-left font-body font-semibold">名称</th>
                <th className="pb-3 text-left font-body font-semibold">区域</th>
                <th className="pb-3 text-left font-body font-semibold">利用率</th>
                <th className="pb-3 text-left font-body font-semibold">状态</th>
                <th className="pb-3 text-left font-body font-semibold">商品数</th>
              </tr>
            </thead>
            <tbody>
              {tableData.map((row) => (
                <tr key={row.id} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-3 font-body text-primary">{row.id}</td>
                  <td className="py-3 font-body">{row.name}</td>
                  <td className="py-3 font-body">{row.zone}</td>
                  <td className="py-3 font-body">
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-1.5 rounded-full bg-secondary overflow-hidden">
                        <div className="h-full rounded-full bg-primary" style={{ width: `${row.usage}%` }} />
                      </div>
                      <span>{row.usage}%</span>
                    </div>
                  </td>
                  <td className="py-3 font-body">
                    <span className={`flex items-center gap-1.5 ${getStatusClass(row.status)}`}>
                      <span className="status-dot" style={{ backgroundColor: "currentColor" }} />
                      {row.status}
                    </span>
                  </td>
                  <td className="py-3 font-body">{row.items}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
