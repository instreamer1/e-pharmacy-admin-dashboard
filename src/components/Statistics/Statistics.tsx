interface StatCardProps {
  title: string;
  value: number;
}

const StatCard = ({ title, value }: StatCardProps) => (
  <div className="bg-white shadow rounded-2xl p-6 text-center">
    <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
    <p className="text-2xl font-bold mt-2">{value}</p>
  </div>
);

const Statistics = () => {
  // потом можно подгружать данные с API
  const stats = [
    { title: "All products", value: 128 },
    { title: "All suppliers", value: 45 },
    { title: "All customers", value: 320 },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {stats.map((stat) => (
        <StatCard key={stat.title} title={stat.title} value={stat.value} />
      ))}
    </div>
  );
};

export default Statistics;
