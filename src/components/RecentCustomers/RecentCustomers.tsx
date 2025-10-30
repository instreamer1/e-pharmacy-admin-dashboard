interface recentCustomersProps {
  recentCustomers: Array<{
    id?: number
    name?: string
    email?: string
    spent: number
  }>
}
const RecentCustomers = ({ recentCustomers }: recentCustomersProps) => {


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
          <tr className="text-sm text-color1   font-medium">
            <th className="py-[14px] border-b border-r border-[rgba(29,30,33,0.1)]    text-[12px]  font-medium ">
              Name
            </th>
            <th className="pl-[10px] py-[14px] border-b border-r border-[rgba(29,30,33,0.1)]    text-[12px]  font-medium ">
              Email
            </th>
            <th className="pl-[10px] py-[14px] border-b border-[rgba(29,30,33,0.1)]    text-[12px]  font-medium ">
              Spent ($)
            </th>
          </tr>
        </thead>
        <tbody >
          {recentCustomers && recentCustomers.map((c) => (
            <tr key={c.id} className="pl-[10px]">
              <td className=" border-b border-r border-[rgba(29,30,33,0.1)]  text-[12px] text-color font-medium text-left ">
                {c.name}
              </td>
              <td className="pl-[10px] py-2 border-b border-r border-[rgba(29,30,33,0.1)] text-[12px] text-color font-medium ">
                {c.email}
              </td>
              <td className="py-2 border-b border-[rgba(29,30,33,0.1)] text-right font-medium pr-[14px]">
                ${c.spent}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default RecentCustomers
