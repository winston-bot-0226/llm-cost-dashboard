interface BudgetProgressProps {
  current: number;
  budget: number;
}

export function BudgetProgress({ current, budget }: BudgetProgressProps) {
  const percentage = Math.min((current / budget) * 100, 100);
  const remaining = budget - current;
  
  let statusColor = "bg-green-500";
  let statusText = "On Track";
  
  if (percentage >= 100) {
    statusColor = "bg-red-500";
    statusText = "Over Budget!";
  } else if (percentage >= 80) {
    statusColor = "bg-yellow-500";
    statusText = "Warning";
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-sm font-medium text-gray-500">Monthly Budget</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">
            ${budget.toFixed(0)}
          </p>
        </div>
        <span
          className={`text-xs font-medium text-white px-3 py-1 rounded-full ${statusColor}`}
        >
          {statusText}
        </span>
      </div>
      
      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-3 mb-2">
        <div
          className={`h-3 rounded-full ${statusColor} transition-all duration-500`}
          style={{ width: `${percentage}%` }}
        />
      </div>
      
      <div className="flex justify-between text-sm">
        <span className="text-gray-500">{percentage.toFixed(1)}% used</span>
        <span className={remaining >= 0 ? "text-green-600" : "text-red-600"}>
          ${Math.abs(remaining).toFixed(2)} {remaining >= 0 ? "remaining" : "over"}
        </span>
      </div>
    </div>
  );
}
