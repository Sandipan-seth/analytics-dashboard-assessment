import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Papa from "papaparse";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { ArrowLeft } from "lucide-react";

const CompanyWise = () => {
  const { companyName } = useParams();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    Papa.parse(
      "https://raw.githubusercontent.com/amit-12k/analytics-dashboard-assessment/main/data-to-visualize/Electric_Vehicle_Population_Data.csv",
      {
        download: true,
        header: true,
        complete: (results) => {
          setData(results.data);
          setLoading(false);
        },
      }
    );
  }, [companyName]);

  const filteredData = data.filter(
    (item) => item["Make"] === companyName.toUpperCase()
  );

  const groupedData = filteredData.reduce((acc, item) => {
    const year = item["Model Year"];
    const model = item["Model"];
    if (!acc[year]) acc[year] = {};
    if (!acc[year][model]) acc[year][model] = 0;
    acc[year][model]++;
    return acc;
  }, {});

  const chartData = Object.entries(groupedData).map(([year, models]) => ({
    year,
    ...models,
  }));

  const lineChartData = Object.entries(groupedData).map(([year, models]) => ({
    year,
    totalCount: Object.values(models).reduce((sum, val) => sum + val, 0),
  }));

  const allModels = [...new Set(filteredData.map((item) => item["Model"]))];

  const countyData = data.reduce((acc, item) => {
    const year = item["Model Year"];
    const county = item["County"];
    if (!year || !county) return acc;

    if (!acc[year]) acc[year] = {};
    if (!acc[year][county]) acc[year][county] = 0;
    acc[year][county]++;
    return acc;
  }, {});

  const countyChartData = Object.entries(countyData).map(
    ([year, counties]) => ({
      year,
      ...counties,
    })
  );

  const allCounties = [...new Set(data.map((item) => item["County"]))];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen text-3xl text-white">
        Loading...
      </div>
    );
  }

  return (
    <>
      <div
        className="fixed p-2 top-5 left-5 rounded-full z-10 border cursor-pointer "
        onClick={() => navigate("/")}
      >
        <ArrowLeft className="text-white" size={30} onClick={()=>{navigate('/')}}/>
      </div>
      <div className="min-h-screen bg-black text-white p-6 md:p-10">
        <h1 className="text-4xl md:text-6xl font-bold text-center underline mb-10">
          {companyName} EV Dashboard
        </h1>

        {/* Total EVs per Year */}
        <Section title="Total EVs by Year (Line Graph)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineChartData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip itemStyle={{ color: "black" }} />
              <Legend />
              <Line
                type="monotone"
                dataKey="totalCount"
                stroke="#00BFFF"
                strokeWidth={3}
                dot={{ r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Section>

        {/* Bar Chart by Model */}
        <Section title="Model Distribution by Year">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip itemStyle={{ color: "black" }} />
              <Legend />
              {allModels.map((model, index) => (
                <Bar
                  key={model}
                  dataKey={model}
                  stackId="a"
                  fill={`hsl(${(index * 60) % 360}, 70%, 50%)`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Section>

        {/* Line Chart by Model */}
        <Section title="Model-wise EV Trend by Year (Line Graph)">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip itemStyle={{ color: "black" }} />
              <Legend />
              {allModels.map((model, index) => (
                <Line
                  key={model}
                  type="monotone"
                  dataKey={model}
                  stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
                  strokeWidth={2}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </Section>

        {/* Bar Chart by County */}
        <Section title="County-wise EV Distribution by Year (Bar Chart)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={countyChartData}>
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip itemStyle={{ color: "black" }} />
              <Legend />
              {allCounties.map((county, index) => (
                <Bar
                  key={county}
                  dataKey={county}
                  stackId="a"
                  fill={`hsl(${(index * 40) % 360}, 60%, 50%)`}
                />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </Section>
      </div>
    </>
  );
};

const Section = ({ title, children }) => (
  <div className="mb-16">
    <h2 className="text-3xl font-bold mb-6 text-center">{title}</h2>
    <div className="w-full h-[400px]">{children}</div>
  </div>
);

export default CompanyWise;
