
import { getIconPath, IconId } from '../../constants/routeTitles'

interface StatCardProps {
  title: string
  value: number
  iconId: IconId
}
const StatCard = ({ title, value, iconId }: StatCardProps) => (
  <li className="flex flex-col justify-between h-[98px] bg-background3 border border-accent border-[rgba(29,30,33,0.1)] rounded-lg p-[14px] text-left">
    <div className='flex gap-2'>
      <svg className='w-5 h-5 fill-none stroke-color [stroke-width:1.5]'>
        <use href={getIconPath(iconId)}></use>
      </svg>
      <p>{title}</p>
    </div>
    <p className="text-color leading-[125%] font-semibold mt-2 text-[16px]" style={{ fontFamily: 'var(--font-family)' }}>
      {value.toLocaleString()}
    </p>
  </li>
)

// const STATISTICS_CONFIG = [
//   { 
//     key: 'products' as const,
//     title: 'All products', 
//     iconId: IconId.Money
//   },
//   { 
//     key: 'suppliers' as const,
//     title: 'All suppliers', 
//     iconId: IconId.Settings 
//   },
//   { 
//     key: 'customers' as const,
//     title: 'All customers', 
//     iconId: IconId.Settings 
//   },
// ] as const

interface StatisticsProps {
  statistics: Array<{
    value?: number
  }>
}

const Statistics = ({ statistics }: StatisticsProps) => {
  const stats = [
    { title: 'All products', value: statistics[0]?.value || 0, iconId: IconId.Money },
    { title: 'All suppliers', value: statistics[1]?.value || 0, iconId: IconId.Settings },
    { title: 'All customers', value: statistics[2]?.value || 0, iconId: IconId.Settings },
  ]


  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-5">
      {stats.map((stat) => (
        <StatCard 
          key={stat.title} 
          {...stat} 
        />
      ))}
    </ul>
  )
}
export default Statistics
