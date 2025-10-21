const IncomeExpenses = ({incomeExpenses}) => {
  // заглушка данных
  const records = [
    { id: 1, type: "Income", name: "Order #1234", email: "client1@example.com", amount: 500 },
    { id: 2, type: "Expense", name: "Supplier payment", email: "", amount: -300 },
    { id: 3, type: "Income", name: "Order #1235", email: "client2@example.com", amount: 700 },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Income / Expenses</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-gray-500 border-b">
            <th className="pb-2">Name</th>
            <th className="pb-2">Email</th>
            <th className="pb-2 text-right">Amount ($)</th>
          </tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.id} className="border-b last:border-none">
              <td className="py-2">{r.name}</td>
              <td className="py-2 text-gray-500">{r.email || "-"}</td>
              <td
                className={`py-2 text-right font-medium ${
                  r.amount > 0 ? "text-green-600" : "text-red-600"
                }`}
              >
                {r.amount > 0 ? `+${r.amount}` : r.amount}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default IncomeExpenses;
