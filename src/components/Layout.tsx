import { useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard, Monitor, Package, RefreshCw,
  Thermometer, BarChart3, Bell, Settings
} from "lucide-react";
import techBg from "@/assets/tech-bg.jpg";

const leftMenus = [
  { icon: LayoutDashboard, label: "数据总览", path: "/" },
  { icon: Monitor, label: "货架监控", path: "/shelf-monitor" },
  { icon: Package, label: "库存管理", path: "/inventory" },
  { icon: RefreshCw, label: "智能补货", path: "/replenish" },
];

const rightMenus = [
  { icon: Thermometer, label: "环境监测", path: "/environment" },
  { icon: BarChart3, label: "数据分析", path: "/analysis" },
  { icon: Bell, label: "告警中心", path: "/alerts" },
  { icon: Settings, label: "系统设置", path: "/settings" },
];

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const navigate = useNavigate();

  const NavItem = ({ icon: Icon, label, path }: { icon: any; label: string; path: string }) => (
    <button
      onClick={() => navigate(path)}
      className={`nav-icon-btn ${location.pathname === path ? "active" : ""}`}
    >
      <Icon className="w-5 h-5" />
      <span className="text-xs font-body font-semibold tracking-wide">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0">
        <img src={techBg} alt="" className="w-full h-full object-cover opacity-30" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/60 to-background/90" />
      </div>

      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            {leftMenus.map((m) => <NavItem key={m.path} {...m} />)}
          </div>
          <h1 className="font-display text-lg font-bold tracking-widest text-foreground glow-text select-none">
            智能货架管理平台
          </h1>
          <div className="flex items-center gap-1">
            {rightMenus.map((m) => <NavItem key={m.path} {...m} />)}
          </div>
        </div>
      </nav>

      {/* Content */}
      <main className="relative z-10 pt-20 pb-8 px-6 max-w-[1600px] mx-auto">
        {children}
      </main>
    </div>
  );
}
