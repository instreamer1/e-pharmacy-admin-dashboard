const RecentCustomers = () => {
  // заглушка данных
  const customers = [
    { id: 1, name: "John Doe", email: "john@example.com", spent: 250 },
    { id: 2, name: "Jane Smith", email: "jane@example.com", spent: 120 },
    { id: 3, name: "Mike Johnson", email: "mike@example.com", spent: 400 },
  ];

  return (
    <div className="bg-white shadow rounded-2xl p-6">
      <h2 className="text-lg font-bold mb-4">Recent Customers</h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-sm text-gray-500 border-b">
            <th className="pb-2">Name</th>
            <th className="pb-2">Email</th>
            <th className="pb-2 text-right">Spent ($)</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
            <tr key={c.id} className="border-b last:border-none">
              <td className="py-2">{c.name}</td>
              <td className="py-2 text-gray-500">{c.email}</td>
              <td className="py-2 text-right font-medium">${c.spent}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentCustomers;
