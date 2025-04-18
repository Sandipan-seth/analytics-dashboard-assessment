import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

const CompanyList = ({ data }) => {
  const uniqueCompaniesSet = new Set(data.map((item) => item.Make));
  const uniqueCompanies = [...uniqueCompaniesSet];
  const [showAll, setShowAll] = useState(false);

  const displayedCompanies = showAll
    ? uniqueCompanies
    : uniqueCompanies.slice(0, 5);

  return (
    <div className="p-5 flex flex-col items-center w-full">
        <h2 className="text-3xl font-bold mb-6 text-white">
            List of Car Companies
        </h2>
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4 w-full max-w-6xl cursor-pointer">
        {displayedCompanies.map((company, index) => (
          <div
            key={index}
            className="bg-transparent shadow-md rounded-xl p-4 border border-gray-600 hover:bg-white hover:text-black transition-all duration-300 text-center flex items-center justify-around cursor-pointer"
          >
            <p className="text-lg font-medium">{company}</p>
            <ArrowRight />
          </div>
        ))}
      </div>

      {uniqueCompanies.length > 5 && (
        <button
          onClick={() => setShowAll(!showAll)}
          className="mt-6 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          {showAll ? "Show Less" : "Show More"}
        </button>
      )}
    </div>
  );
};

export default CompanyList;
