import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Papa from "papaparse";

const CompanyWise = () => {
    const {companyName} = useParams();
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
    <div className='min-h-screen bg-black text-white'>
      {companyName}
    </div>
  )
}

export default CompanyWise
