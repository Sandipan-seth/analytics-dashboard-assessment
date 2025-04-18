import React from "react";

const SummaryCards = ({ data }) => {
  const totalEVs = data.length;
  const uniqueMakes = new Set(data.map((item) => item.Make)).size;

  return (
    <div className="flex flex-wrap justify-between gap-4 mb-6">
      <div className="flex-1 min-w-[250px] bg-white rounded-2xl p-6 flex flex-col items-center text-center">
        <p className="text-gray-500 text-sm">Total EVs till now</p>
        <h2 className="text-3xl font-semibold mt-2">{totalEVs}</h2>
      </div>
      <div className="flex-1 min-w-[250px] bg-white rounded-2xl p-6 flex flex-col items-center text-center">
        <p className="text-gray-500 text-sm">Unique Car Companies</p>
        <h2 className="text-3xl font-semibold mt-2">{uniqueMakes}</h2>
      </div>
    </div>
  );
};

export default SummaryCards;
