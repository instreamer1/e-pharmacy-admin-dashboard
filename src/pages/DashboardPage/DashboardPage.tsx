import { useEffect } from 'react'
import IncomeExpenses from '../../components/IncomeExpenses/IncomeExpenses'
import RecentCustomers from '../../components/RecentCustomers/RecentCustomers'
import Statistics from '../../components/Statistics/Statistics'
import { selectDashboard } from '../../store/dashboardSlice/selectors'
import { useAppDispatch, useAppSelector } from '../../store/hooks'

import { fetchDashboardData } from '../../store/dashboardSlice/operations'

const DashboardPage = () => {
  const dispatch = useAppDispatch()
  const { statistics, recentCustomers, incomeExpenses, loading } = useAppSelector(selectDashboard)

  useEffect(() => {
    dispatch(fetchDashboardData())
  }, [dispatch])

  if (loading) return <p>Loading...</p>
  return (
    <section className="py-5">
      <div className="px-5">
        <h1 className="visually-hidden">Dashboard</h1>

        {/* Статистика */}
        <Statistics />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Последние клиенты */}
          <RecentCustomers />

          {/* Доходы/Расходы */}
          <IncomeExpenses />
        </div>
      </div>
    </section>
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
