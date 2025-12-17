import { Monitor } from "lucide-react";

export default function SystemStatusCard() {
  return (
    <div className="bg-primary rounded-xl p-8 shadow-sm hover:shadow-md transition-shadow row-span-2 flex flex-col items-center justify-center text-white">
      <div className="w-20 h-20 mb-6 flex items-center justify-center">
        <Monitor className="w-16 h-16" strokeWidth={1.5} />
      </div>
      <div className="text-4xl font-bold mb-3">ONLINE</div>
      <div className="text-lg font-medium opacity-95">System Status</div>
    </div>
  );
}