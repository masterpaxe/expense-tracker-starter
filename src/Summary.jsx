import { formatMoney } from './format.js'

function Summary({ transactions }) {
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter(t => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const balance = totalIncome - totalExpenses;
  const overspent = balance < 0;
  const spentShare = totalIncome > 0 ? Math.min(totalExpenses / totalIncome, 1) : (totalExpenses > 0 ? 1 : 0);

  return (
    <section className="cash-flow" aria-label="Cash flow">
      <p className="cash-flow-headline">
        {overspent
          ? `${formatMoney(-balance)} over this month`
          : `${formatMoney(balance)} left this month`}
      </p>

      <div
        className="cash-flow-bar"
        role="img"
        aria-label={`${formatMoney(totalExpenses)} spent of ${formatMoney(totalIncome)} that came in`}
      >
        <div className="cash-flow-spent" style={{ "--share": spentShare }} />
      </div>

      <div className="cash-flow-legend">
        <span><span className="swatch swatch-spend" />{formatMoney(totalExpenses)} spent</span>
        <span><span className="swatch swatch-income" />{formatMoney(Math.max(balance, 0))} left of {formatMoney(totalIncome)} that came in</span>
      </div>
    </section>
  );
}

export default Summary
