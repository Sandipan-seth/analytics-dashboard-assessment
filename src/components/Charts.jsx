import React from "react";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const Charts = ({ data }) => {
  const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];
  const byYear = Object.values(
    data.reduce((acc, curr) => {
      const year = curr["Model Year"];
      acc[year] = acc[year] || { year, count: 0 };
      acc[year].count += 1;
      return acc;
    }, {})
  );

  const byMake = Object.values(
    data.reduce((acc, curr) => {
      const make = curr["Make"];
      acc[make] = acc[make] || { make, count: 0 };
      acc[make].count += 1;
      return acc;
    }, {})
  )
    .sort((a, b) => b.count - a.count)
    .slice(0, 10);

  const byType = Object.values(
    data.reduce((acc, curr) => {
      const type = curr["Electric Vehicle Type"];
      acc[type] = acc[type] || { type, value: 0 };
      acc[type].value += 1;
      return acc;
    }, {})
  );

  return (
    <div className="flex flex-col justify-center items-center gap-4 mt-10 w-full">
      <h1 className="w-full flex items-center justify-center">
        <span className="text-3xl font-bold mb-6 text-center text-white">
          Overall EV Dashboard
        </span>
      </h1>
      <div className="grid md:grid-cols-2 gap-6 mb-6 text-black w-full">
        <div className="border border-gray-400 rounded-2xl shadow p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">EV Growth by Year</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={byYear}>
              <XAxis
                dataKey="year"
                interval={1}
                tick={{
                  angle: -45,
                  textAnchor: "end",
                  fontSize: 12,
                  fill: "white",
                }}
                height={30}
              />
              <YAxis
                tick={{
                  fill: "white",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "8px",
                  border: "none",
                  color: "#fff",
                  fontSize: "14px",
                }}
                labelStyle={{
                  color: "#93c5fd", // light blue label
                  fontWeight: "bold",
                }}
              />
              <Line type="monotone" dataKey="count" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-400 rounded-2xl shadow p-4 text-white">
          <h3 className="text-lg font-semibold mb-2">Top 10 EV Makes</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={byMake}>
              <XAxis
                dataKey="make"
                interval={0}
                tick={{
                  angle: -45,
                  textAnchor: "end",
                  fontSize: 12,
                  fill: "white",
                }}
                height={60}
              />
              <YAxis
                tick={{
                  fill: "white",
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  borderRadius: "8px",
                  border: "none",
                  color: "#fff",
                  fontSize: "14px",
                }}
                labelStyle={{
                  color: "#93c5fd", // light blue label
                  fontWeight: "bold",
                }}
                cursor={{ fill: "rgba(255, 255, 255, 0.5)" }}
              />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="border border-gray-400 text-white rounded-2xl shadow p-4 md:col-span-2">
          <h3 className="text-lg font-semibold mb-2">EV Type Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={byType}
                dataKey="value"
                nameKey="type"
                cx="50%"
                cy="50%"
                outerRadius={100}
              >
                {byType.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  borderRadius: "8px",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "14px",
                }}
                labelStyle={{
                  color: "#93c5fd",
                  fontWeight: "bold",
                }}
              />
              {/* Optional: Add a legend */}
              {/* <Legend verticalAlign="bottom" height={36} /> */}
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Charts;
