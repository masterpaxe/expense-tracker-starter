import { Bar, BarChart, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { formatMoney } from './format.js'

const BAR_COLOR = "#b0306a";
const TEXT_SECONDARY = "#4d5785";
const ROW_HEIGHT = 40;

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
      <h2>Spent on</h2>
      {data.length === 0 ? (
        <p className="chart-empty">No expenses yet.</p>
      ) : (
        <ResponsiveContainer width="100%" height={data.length * ROW_HEIGHT + 20}>
          <BarChart data={data} layout="vertical" margin={{ top: 0, right: 64, bottom: 0, left: 0 }}>
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
              cursor={{ fill: "rgba(30, 43, 111, 0.05)" }}
              formatter={(value) => [formatMoney(value), "Spent"]}
              contentStyle={{ border: "1px solid #c3d2fb", borderRadius: 8, fontFamily: "inherit" }}
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
