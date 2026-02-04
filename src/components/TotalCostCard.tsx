interface TotalCostCardProps {
  total: number;
  currency: string;
}

export function TotalCostCard({ total, currency }: TotalCostCardProps) {
  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-blue-100">Total Cost</p>
          <p className="text-4xl font-bold mt-1">
            ${total.toFixed(2)}
          </p>
          <p className="text-sm text-blue-200 mt-1">{currency} • This Month</p>
        </div>
        <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center">
          <span className="text-3xl">💵</span>
        </div>
      </div>
    </div>
  );
}
