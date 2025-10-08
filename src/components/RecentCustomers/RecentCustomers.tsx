const RecentCustomers = () => {
  // data
  const customers = [
    { id: 1, name: 'John Doe', email: 'john@example.com', spent: 250 },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', spent: 120 },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', spent: 400 },
  ]

  return (
    <div
      className="border rounded-lg
   border-[rgba(29,30,33,0.1)]"
    >
      <div className="h-12 pt-3 pl-[14px] bg-background">
        <h2 className="text-lg font-bold mb-4">Recent Customers</h2>
      </div>

      <table className="w-full text-left border-separate border-spacing-0 bg-background3 px-[14px] ">
        <thead>
          <tr className="text-sm text-gray-500 ">
            <th className="pb-2 border-b border-r border-[rgba(29,30,33,0.1)] pl-[14px] font-medium">
              Name
            </th>
            <th className="pb-2 border-b border-r border-[rgba(29,30,33,0.1)] font-medium">
              Email
            </th>
            <th className="pb-2 border-b border-[rgba(29,30,33,0.1)] text-right font-medium pr-[14px]">
              Spent ($)
            </th>
          </tr>
        </thead>
        <tbody>
          {customers.map((c) => (
      <tr key={c.id}>
        <td className="py-2 border-b border-r border-[rgba(29,30,33,0.1)] pl-[14px]">{c.name}</td>
        <td className="py-2 border-b border-r border-[rgba(29,30,33,0.1)] text-gray-500">{c.email}</td>
        <td className="py-2 border-b border-[rgba(29,30,33,0.1)] text-right font-medium pr-[14px]">${c.spent}</td>
      </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentCustomers
