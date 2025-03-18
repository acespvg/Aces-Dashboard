import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Dashboard = () => {
  const [seCount, setSeCount] = useState(0);
  const [teCount, setTeCount] = useState(0);
  const [beCount, setBeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberCounts = async () => {
      try {
        const seRes = await fetch("http://localhost:8000/api/members/SE");
        const teRes = await fetch("http://localhost:8000/api/members/TE");
        const beRes = await fetch("http://localhost:8000/api/members/BE");

        const seData = await seRes.json();
        const teData = await teRes.json();
        const beData = await beRes.json();

        setSeCount(seData.length);
        setTeCount(teData.length);
        setBeCount(beData.length);
      } catch (error) {
        console.error("Error fetching member counts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMemberCounts();
  }, []);

  const data = [
    { name: "SE Members", value: seCount },
    { name: "TE Members", value: teCount },
    { name: "BE Members", value: beCount },
  ];

  const COLORS = ["#2D6A4F", "#376185", "#D17A22"]; // Dark green, Blue, Orange

  return (
    <div className="p-6 bg-gray-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-white">Welcome back, Dhanesh!</h2>
      <p className="text-white text-lg mt-1">Here's an overview of the student association:</p>

      {loading ? (
        <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-6 mt-6">
          {data.map((item, index) => (
            <div key={index} className="p-5 bg-gray-800 text-center rounded-lg shadow-md">
              <p className="text-3xl font-bold text-white">{item.value}</p>
              <p className="text-gray-300 text-lg font-semibold">{item.name}</p>
            </div>
          ))}
        </div>
      )}

      {!loading && (
        <div className="grid place-items-center min-h-[400px] mt-6">
          <PieChart width={600} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              dataKey="value"
              label={({ name, percent, cx, cy, midAngle }) => {
                const RADIAN = Math.PI / 180;
                const radius = 140; // Slightly outside the pie
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text
                    x={x}
                    y={y}
                    textAnchor={x > cx ? "start" : "end"}
                    alignmentBaseline="middle"
                    fontSize="14px"
                    fontWeight="bold"
                    fill="white"
                  >
                    {`${name} ${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} stroke="#fff" strokeWidth={2} />
              ))}
            </Pie>
            <Tooltip contentStyle={{  color: "white", fontWeight: "bold" }} />
            <Legend
  wrapperStyle={{
    background: "#fff",
    display: "flex",
    justifyContent: "center",  // Centers horizontally
    alignItems: "center",      // Centers vertically
    width: "100%",             // Ensures it takes full width
    height: "50px",            // Sets fixed height
    fontSize: "14px",
    fontWeight: "bold",
    color: "white",
  }}
  align="center"                // Ensures it's centered inside the chart
  verticalAlign="bottom"        // Places legend at the bottom
/>          </PieChart>
        </div>
      )}
    </div>
  );
};

export default Dashboard;