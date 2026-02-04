import { ProviderCard } from "@/components/ProviderCard";
import { TotalCostCard } from "@/components/TotalCostCard";
import { BudgetProgress } from "@/components/BudgetProgress";

// Mock data - will be replaced with real API calls
const mockProviders = [
  { name: "OpenAI", displayName: "OpenAI", cost: 127.45, trend: 12.3, enabled: true },
  { name: "Anthropic", displayName: "Anthropic", cost: 89.20, trend: -5.2, enabled: true },
  { name: "Google", displayName: "Google AI", cost: 45.00, trend: 8.7, enabled: true },
  { name: "Azure", displayName: "Azure OpenAI", cost: 0, trend: 0, enabled: false },
  { name: "Mistral", displayName: "Mistral AI", cost: 23.15, trend: 45.0, enabled: true },
];

const totalCost = mockProviders.reduce((sum, p) => sum + p.cost, 0);
const monthlyBudget = 500;

export default function Dashboard() {
  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500 mt-1">
          February 2026 • Last updated: just now
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <TotalCostCard total={totalCost} currency="USD" />
        <BudgetProgress current={totalCost} budget={monthlyBudget} />
        <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Active Providers</p>
              <p className="text-3xl font-bold text-gray-900 mt-1">
                {mockProviders.filter((p) => p.enabled).length}
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-2xl">🔌</span>
            </div>
          </div>
        </div>
      </div>

      {/* Provider Cards */}
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cost by Provider
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {mockProviders.map((provider) => (
            <ProviderCard
              key={provider.name}
              name={provider.displayName}
              cost={provider.cost}
              trend={provider.trend}
              enabled={provider.enabled}
            />
          ))}
        </div>
      </div>

      {/* Chart Placeholder */}
      <div className="bg-white rounded-xl shadow-sm p-6 border border-gray-100">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Cost Trend (Last 30 Days)
        </h2>
        <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200">
          <div className="text-center text-gray-400">
            <span className="text-4xl mb-2 block">📈</span>
            <p>Chart will be implemented in Phase 2</p>
          </div>
        </div>
      </div>
    </div>
  );
}
