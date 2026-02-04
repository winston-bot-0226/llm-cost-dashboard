interface ProviderCardProps {
  name: string;
  cost: number;
  trend: number;
  enabled: boolean;
}

export function ProviderCard({ name, cost, trend, enabled }: ProviderCardProps) {
  const trendColor = trend > 0 ? "text-red-500" : trend < 0 ? "text-green-500" : "text-gray-400";
  const trendIcon = trend > 0 ? "↑" : trend < 0 ? "↓" : "→";

  if (!enabled) {
    return (
      <div className="bg-gray-100 rounded-xl p-5 border border-gray-200 opacity-60">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-500">{name}</h3>
          <span className="text-xs bg-gray-200 text-gray-500 px-2 py-1 rounded-full">
            Disabled
          </span>
        </div>
        <p className="text-2xl font-bold text-gray-400 mt-2">—</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-gray-700">{name}</h3>
        <span className={`text-sm font-medium ${trendColor}`}>
          {trendIcon} {Math.abs(trend).toFixed(1)}%
        </span>
      </div>
      <p className="text-2xl font-bold text-gray-900 mt-2">
        ${cost.toFixed(2)}
      </p>
      <p className="text-xs text-gray-400 mt-1">This month</p>
    </div>
  );
}
