import { useState } from 'react'

// Today's date as YYYY-MM-DD in the user's own time zone (toISOString would give the UTC date).
const todayLocal = () => {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  return `${now.getFullYear()}-${month}-${day}`;
};

function TransactionForm({ categories, onAdd }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("expense");
  const [category, setCategory] = useState("food");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!description || !amount) return;

    onAdd({
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      type,
      category,
      date: todayLocal(),
    });

    setDescription("");
    setAmount("");
    setType("expense");
    setCategory("food");
  };

  return (
    <section className="add-transaction">
      <h2>Add a transaction</h2>
      <form onSubmit={handleSubmit}>
        <label className="field field-wide">
          <span>Description</span>
          <input
            type="text"
            placeholder="e.g. Groceries"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Amount</span>
          <input
            type="number"
            inputMode="decimal"
            min="0"
            step="0.01"
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </label>
        <label className="field">
          <span>Type</span>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
          </select>
        </label>
        <label className="field">
          <span>Category</span>
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </label>
        <button type="submit">Add transaction</button>
      </form>
    </section>
  );
}

export default TransactionForm
