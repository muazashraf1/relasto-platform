import { FaDollarSign, FaUserTie, FaFire, FaSmile } from "react-icons/fa";

export default function StatsSection() {
  const stats = [
    {
      icon: <FaDollarSign />,
      value: "$15.4M",
      label: "Owned from Properties transactions",
    },
    {
      icon: <FaUserTie />,
      value: "25K+",
      label: "Properties for Buy & sell Successfully",
    },
    {
      icon: <FaFire />,
      value: "500",
      label: "Daily completed transactions",
    },
    {
      icon: <FaSmile />,
      value: "600+",
      label: "Regular Clients",
    },
  ];

  return (
    <section className="bg-[#f3f1ee] py-12">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        {stats.map((item, index) => (
          <div key={index} className="flex flex-col items-center space-y-3">
            
            {/* Icon Circle */}
            <div className="w-14 h-14 flex items-center justify-center rounded-full bg-white shadow-md text-orange-500 text-xl">
              {item.icon}
            </div>

            {/* Number */}
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800">
              {item.value}
            </h2>

            {/* Label */}
            <p className="text-gray-500 text-sm max-w-[180px]">
              {item.label}
            </p>

          </div>
        ))}
      </div>
    </section>
  );
}