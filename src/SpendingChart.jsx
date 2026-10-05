import { Bar, BarChart, CartesianGrid, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const BAR_COLOR = "#2a78d6";
const TEXT_SECONDARY = "#52514e";
const GRID_COLOR = "#e8e8e6";
const ROW_HEIGHT = 40;

const formatMoney = (value) => `$${value.toLocaleString()}`;

function SpendingChart({ transactions }) {
  const totals = {};
  transactions
    .filter(t => t.type === "expense")
    .forEach(t => {
      totals[t.category] = (totals[t.category] || 0) + t.amount;
    });

  const data = Object.entries(totals)
    .map(([category, amount]) => ({ category, amount }))
    .sort((a, b) => b.amount - a.amount);

  return (
    <div className="spending-chart">
      <h2>Spending by Category</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + 20}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 64, bottom: 0, left: 0 }}>
            <CartesianGrid horizontal={false} stroke={GRID_COLOR} />
            <XAxis type="number" hide />
            <YAxis
              type="category"
              dataKey="category"
              width={110}
              axisLine={false}
              tickLine={false}
              tick={{ fill: TEXT_SECONDARY, fontSize: 13 }}
            />
            <Tooltip
              cursor={{ fill: "rgba(0, 0, 0, 0.04)" }}
              formatter={(value) => [formatMoney(value), "Spent"]}
            />
            <Bar dataKey="amount" fill={BAR_COLOR} barSize={20} radius={[0, 4, 4, 0]} isAnimationActive={false}>
              <LabelList dataKey="amount" position="right" formatter={formatMoney} fill={TEXT_SECONDARY} fontSize={13} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      )}
    </div>
  );
}

export default SpendingChart
