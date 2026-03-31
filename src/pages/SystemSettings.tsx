import { Settings as SettingsIcon, User, Database, Shield, Bell as BellIcon, Palette, Globe, HardDrive } from "lucide-react";
import GlassCard from "@/components/GlassCard";

const settingSections = [
  {
    icon: User, title: "用户管理", desc: "管理系统用户、角色权限分配",
    items: ["当前用户数: 48", "管理员: 5", "操作员: 28", "观察者: 15"],
  },
  {
    icon: Database, title: "数据配置", desc: "数据库连接、备份策略、数据清理",
    items: ["数据库: PostgreSQL 15", "自动备份: 每日 02:00", "数据保留: 365天", "存储用量: 128GB / 500GB"],
  },
  {
    icon: Shield, title: "安全设置", desc: "访问控制、审计日志、安全策略",
    items: ["双因素认证: 已启用", "密码策略: 强", "会话超时: 30分钟", "IP白名单: 12个"],
  },
  {
    icon: BellIcon, title: "通知配置", desc: "告警通知渠道、推送规则设置",
    items: ["邮件通知: 已启用", "短信通知: 已启用", "企业微信: 已连接", "静默时段: 23:00-07:00"],
  },
  {
    icon: Palette, title: "界面设置", desc: "主题颜色、语言、显示偏好",
    items: ["主题: 科技蓝", "语言: 简体中文", "数据刷新: 5秒", "动画效果: 开启"],
  },
  {
    icon: Globe, title: "集成服务", desc: "第三方API、设备接入、协议配置",
    items: ["MQTT: 已连接", "REST API: v2.1", "OPC-UA: 活跃", "接入设备: 4,782"],
  },
  {
    icon: HardDrive, title: "系统信息", desc: "版本信息、许可证、运行状态",
    items: ["版本: v3.2.1", "许可证: 企业版", "运行时间: 128天", "CPU: 23% / 内存: 67%"],
  },
  {
    icon: SettingsIcon, title: "高级设置", desc: "系统参数调优、开发者选项",
    items: ["调试模式: 关闭", "API限流: 1000/min", "缓存策略: LRU", "日志级别: INFO"],
  },
];

export default function SystemSettings() {
  return (
    <div className="space-y-6">
      <GlassCard delay={0}>
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-lg bg-primary/10 text-primary"><SettingsIcon className="w-6 h-6" /></div>
          <div>
            <h2 className="font-display text-lg font-bold tracking-wider text-foreground">系统设置</h2>
            <p className="text-sm text-muted-foreground font-body">管理平台配置、安全策略与集成服务</p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {settingSections.map((s, i) => (
          <GlassCard key={s.title} delay={0.05 + i * 0.05}>
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-lg bg-primary/10 text-primary mt-0.5">
                <s.icon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h3 className="font-display text-sm font-semibold text-foreground">{s.title}</h3>
                <p className="text-xs text-muted-foreground font-body mt-0.5">{s.desc}</p>
                <div className="mt-3 grid grid-cols-2 gap-2">
                  {s.items.map((item) => (
                    <div key={item} className="text-xs font-body text-muted-foreground bg-secondary/50 rounded-md px-2.5 py-1.5">
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
