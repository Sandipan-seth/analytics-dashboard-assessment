import React, { useEffect, useState } from "react";
import Papa from "papaparse";
import SummaryCards from "./SummaryCards";
import CompanyList from "./CompanyList";
import Charts from "./Charts";

const Dashboard = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Papa.parse(
      "https://raw.githubusercontent.com/amit-12k/analytics-dashboard-assessment/main/data-to-visualize/Electric_Vehicle_Population_Data.csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data);
          console.log("Parsed data:", results.data);
          setLoading(false);
        },
      }
    );
  }, []);

  return (
    <div className="p-4 md:p-8 bg-black min-h-screen h-full">
      <h1 className="text-4xl md:text-6xl font-bold mb-6 text-center text-white underline">
        EV Dashboard
      </h1>
      {loading ? (
        <div className="flex justify-center items-center text-white py-10 text-3xl">
          <h1>Loading....</h1>
        </div>
      ) : (
        <div>
          <SummaryCards data={data} />
          <Charts data={data} />
          <CompanyList data={data} />
        </div>
      )}
    </div>
  );
};

export default Dashboard;