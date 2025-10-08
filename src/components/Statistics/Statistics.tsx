import iconSprite from '../../assets/icons/sprite.svg'

interface StatCardProps {
  title: string
  value: number
}

const StatCard = ({ title, value }: StatCardProps) => (
  <li
    className="flex flex-col justify-between  h-[98px] bg-background3 border
   border-accent  border-[rgba(29,30,33,0.1)] rounded-lg   p-[14px] text-left"
  >
    <div className='flex gap-2'>
      <svg  className='w-5 h-5 fill-none stroke-color [stroke-width:1.5]'>
        <use href={`${iconSprite}#icon-streamline_money-cash`}></use>
      </svg>
      <p className="  ">{title}</p>
    </div>
    <p
      className="text-color leading-[125%]  font-semibold mt-2  text-[16px]  "
      style={{ fontFamily: 'var(--font-family)' }}
    >
      {value}
    </p>
  </li>
)

const Statistics = () => {
  // данные с API
  const stats = [
    { title: 'All products', value: 128 },
    { title: 'All suppliers', value: 45 },
    { title: 'All customers', value: 320 },
  ]

  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 gap-5 mb-5 ">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </ul>
  )
}

export default Statistics
