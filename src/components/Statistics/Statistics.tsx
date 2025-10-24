import { getIconPath, IconId } from '../../constants/routeTitles'

interface StatCardProps {
  title: string
  value: number
  iconId: IconId
}
const StatCard = ({ title, value, iconId }: StatCardProps) => (
  <li className="flex flex-col justify-between h-[98px] bg-background3 border border-accent border-[rgba(29,30,33,0.1)] rounded-lg p-[14px] text-left">
    <div className="flex gap-2">
      <svg className="w-5 h-5 fill-none stroke-color [stroke-width:1.5]">
        <use href={getIconPath(iconId)}></use>
      </svg>
      <p>{title}</p>
    </div>
    <p
      className="text-color leading-[125%] font-semibold mt-2 text-[16px]"
      style={{ fontFamily: 'var(--font-family)' }}
    >
      {value.toLocaleString()}
    </p>
  </li>
)

interface StatisticsProps {
  statistics: Array<{
    title: string
    value: number
    iconId: IconId
  }>
}

const Statistics = ({ statistics }: StatisticsProps) => {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-5">
      {statistics.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </ul>
  )
}
export default Statistics
