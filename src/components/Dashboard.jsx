import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import SummaryCards from "./SummaryCards";

const Dashboard = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    Papa.parse("/data-to-visualize/Electric_Vehicle_Population_Data.csv", {
      download: true,
      header: true,
      complete: (results) => {
        setData(results.data);
        // console.log("Parsed data:", results.data);
      },
    });
  }, []);

  return (
    <div className="p-4 md:p-8 bg-gray-100 min-h-screen bg-black ">
      <h1 className="text-3xl font-bold mb-6 text-center text-white">EV Dashboard</h1>
      <SummaryCards data={data} />
    </div>
  );
};

export default Dashboard;