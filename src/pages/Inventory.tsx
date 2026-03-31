import ReactECharts from "echarts-for-react";
import { Package, Search, ArrowDownUp, AlertTriangle } from "lucide-react";
import GlassCard from "@/components/GlassCard";
import StatCard from "@/components/StatCard";

const categoryOption = {
  tooltip: { trigger: "axis" },
  grid: { top: 20, right: 20, bottom: 40, left: 60 },
  xAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "category", data: ["食品","饮料","日用品","电子产品","服装","文具","医药","其他"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { type: "bar", data: [8200,6500,5400,4200,3800,2900,2100,1800], itemStyle: { color: { type: "linear", x: 0, y: 0, x2: 1, y2: 0, colorStops: [{ offset: 0, color: "#0e7490" }, { offset: 1, color: "#06b6d4" }] }, borderRadius: [0, 4, 4, 0] } },
  ],
  backgroundColor: "transparent",
};

const trendOption = {
  tooltip: { trigger: "axis" },
  grid: { top: 30, right: 20, bottom: 30, left: 50 },
  legend: { textStyle: { color: "#94a3b8" }, top: 0 },
  xAxis: { type: "category", data: ["周一","周二","周三","周四","周五","周六","周日"], axisLine: { lineStyle: { color: "#334155" } }, axisLabel: { color: "#94a3b8" } },
  yAxis: { type: "value", splitLine: { lineStyle: { color: "#1e293b" } }, axisLabel: { color: "#94a3b8" } },
  series: [
    { name: "入库", type: "bar", data: [320,332,301,334,390,330,320], itemStyle: { color: "#06b6d4" } },
    { name: "出库", type: "bar", data: [220,182,291,234,290,230,220], itemStyle: { color: "#8b5cf6" } },
  ],
  backgroundColor: "transparent",
};

const items = [
  { sku: "SKU-10234", name: "可口可乐330ml", category: "饮料", stock: 2400, min: 500, shelf: "A1-01", status: "充足" },
  { sku: "SKU-10235", name: "农夫山泉550ml", category: "饮料", stock: 180, min: 500, shelf: "A1-02", status: "低位" },
  { sku: "SKU-10236", name: "维达纸巾10包装", category: "日用品", stock: 890, min: 200, shelf: "B2-01", status: "充足" },
  { sku: "SKU-10237", name: "雀巢咖啡200g", category: "食品", stock: 45, min: 100, shelf: "C1-01", status: "告急" },
  { sku: "SKU-10238", name: "蓝月亮洗衣液2L", category: "日用品", stock: 320, min: 150, shelf: "B1-02", status: "充足" },
  { sku: "SKU-10239", name: "iPhone充电线", category: "电子产品", stock: 67, min: 80, shelf: "D1-02", status: "低位" },
];

const statusStyle: Record<string, string> = { "充足": "text-cyber-green", "低位": "text-cyber-orange", "告急": "text-cyber-red" };

export default function Inventory() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <StatCard icon={Package} label="SKU总数" value="12,456" change="3.2%" delay={0} />
        <StatCard icon={Search} label="在库商品" value="45,832" change="8.3%" delay={0.05} />
        <StatCard icon={ArrowDownUp} label="今日流转" value="3,426" change="15.2%" delay={0.1} />
        <StatCard icon={AlertTriangle} label="低位预警" value="47" change="5 较昨日" positive={false} delay={0.15} color="text-cyber-orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <GlassCard delay={0.2}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">品类库存分布</h3>
          <ReactECharts option={categoryOption} style={{ height: 300 }} />
        </GlassCard>
        <GlassCard delay={0.25}>
          <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-3">本周出入库对比</h3>
          <ReactECharts option={trendOption} style={{ height: 300 }} />
        </GlassCard>
      </div>

      <GlassCard delay={0.3}>
        <h3 className="font-display text-sm font-semibold tracking-wider text-foreground mb-4">库存明细</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                {["SKU","商品名称","品类","库存量","安全库存","货架","状态"].map((h) => (
                  <th key={h} className="pb-3 text-left font-body font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((r) => (
                <tr key={r.sku} className="border-b border-border/50 hover:bg-primary/5 transition-colors">
                  <td className="py-3 font-body text-primary">{r.sku}</td>
                  <td className="py-3 font-body">{r.name}</td>
                  <td className="py-3 font-body">{r.category}</td>
                  <td className="py-3 font-body font-semibold">{r.stock.toLocaleString()}</td>
                  <td className="py-3 font-body text-muted-foreground">{r.min}</td>
                  <td className="py-3 font-body">{r.shelf}</td>
                  <td className={`py-3 font-body font-semibold ${statusStyle[r.status]}`}>{r.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
