import IncomeExpenses from '../../components/IncomeExpenses/IncomeExpenses'
import RecentCustomers from '../../components/RecentCustomers/RecentCustomers'
import Statistics from '../../components/Statistics/Statistics'
import TestTailwind from '../../components/TestTailwind'
import css from './DashboardPage.module.css'

const DashboardPage = () => {
  return (
    <div className="p-6 space-y-8">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/* Статистика */}
      <Statistics />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Последние клиенты */}
        <RecentCustomers />
        <TestTailwind />
        {/* Доходы/Расходы */}
        <IncomeExpenses />
      </div>
    </div>
  )
}

/* "DashboardPage – состоит из компонентов Statistics, Recent Customers, Income/Expenses.

Компонент Statistic предназначен для отображения статистических данных по продуктам, поставщикам и заказчикам.
Компонент отображает информацию о количестве продуктов («All products»), поставщиках («All suppliers») и заказчиках («All customers»).

Компонент Recent Customers (Последние клиенты)
Верстка: Таблица со списком последних клиентов, их именем, электронной почтой, суммой затрат.

Компонент Income/Expenses (Доходы/Расходы)
Верстка: Таблица со списком доходов и расходов, включая название, электронную почту (если это клиент) и сумму.

*/
export default DashboardPage
