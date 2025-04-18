import React from "react";

const SummaryCards = ({ data }) => {
  const totalEVs = data.length -1 ;
  const uniqueCompanies = new Set(data.map((item) => item.Make)).size;
  const uniqueModels = new Set(data.map((item) => item.Model)).size;
  const totalCountries = new Set(data.map((item) => item.County)).size;

  const cards = [
    {
      title: "Total EVs till now",
      value: totalEVs,
      bg: "bg-gradient-to-r from-gray-800 to-blue-600",
    },
    {
      title: "Total Car Companies",
      value: uniqueCompanies,
      bg: "bg-gradient-to-r from-gray-800 to-green-600",
    },
    {
      title: "Total Unique Car Models",
      value: uniqueModels,
      bg: "bg-gradient-to-r from-gray-800 to-purple-600",
    },
    {
      title: "Number of Countries in the Survey",
      value: totalCountries,
      bg: "bg-gradient-to-r from-gray-800 to-yellow-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
      {cards.map((card, index) => (
        <div
          key={index}
          className={`rounded-2xl text-white p-6 flex flex-col items-center text-center shadow-md ${card.bg} 
                      transform transition duration-300 hover:scale-105 hover:shadow-xl`}
        >
          <p className="text-sm">{card.title}</p>
          <h2 className="text-3xl font-semibold mt-2">{card.value}</h2>
        </div>
      ))}
    </div>
  );
};

export default SummaryCards;
