import {
  Users,
  RefreshCw,
  Building2,
  Activity,
  XCircle,
  AlertTriangle,
  Monitor,
} from "lucide-react";

export default function SystemStatusDashboard() {
  const stats = [
    {
      value: "4,287",
      label: "Users Registered",
      icon: Users,
      color: "text-gray-700",
    },
    {
      value: "12,564",
      label: "Logs Synced",
      icon: RefreshCw,
      color: "text-cyan-500",
    },
    {
      value: "57",
      label: "Organizations Registered",
      icon: Building2,
      color: "text-purple-600",
    },
    {
      value: "312",
      label: "Active Sessions",
      icon: Activity,
      color: "text-green-500",
    },
    {
      value: "25",
      label: "Terminated Sessions",
      icon: XCircle,
      color: "text-red-500",
    },
    {
      value: "2",
      label: "Downtimes (Past 7 days)",
      icon: AlertTriangle,
      color: "text-yellow-500",
    },
  ];

  return (
    <div className="py-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {/* System Status Card */}
          <div className="bg-linear-to-br from-green-500 to-green-600 rounded-2xl p-8 text-white shadow-lg">
            <div className="flex flex-col items-center justify-center h-full">
              <Monitor className="w-16 h-16 mb-4" />
              <h1 className="text-4xl font-bold mb-2">ONLINE</h1>
              <p className="text-lg text-green-100">System Status</p>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div
                  key={index}
                  className="bg-foreground rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow duration-200"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="text-3xl font-bold text-gray-900 dark:text-header mb-1">
                        {stat.value}
                      </h2>
                      <p className="text-sm font-medium text-gray-600 dark:text-sub-text">
                        {stat.label}
                      </p>
                    </div>
                    <div className={`${stat.color} p-3 rounded-xl bg-gray-50`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
