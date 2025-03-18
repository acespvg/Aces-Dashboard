import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const TechTriviaDashboard = () => {
  const [participants, setParticipants] = useState({
    FE: 0,
    SE: 0,
    TE: 0,
    BE: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchParticipants = async () => {
      try {
        const years = ["FE", "SE", "TE", "BE"];
        const counts = {};

        await Promise.all(
          years.map(async (year) => {
            const res = await fetch(process.env.REACT_APP_BACKEND_URL + `/api/techTrivia/${year}`);
            const data = await res.json();
            counts[year] = data.length;
          })
        );

        setParticipants(counts);
      } catch (error) {
        console.error("Error fetching participant data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipants();
  }, []);

  const data = Object.keys(participants).map((year) => ({
    name: `${year} Members`,
    value: participants[year],
  }));

  const COLORS = ["#2D6A4F", "#376185", "#D17A22", "#A93226"]; // Colors for different years

  return (
    <div className="p-6 bg-gray-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-white">TechTrivia Dashboard</h2>
      <p className="text-white text-lg mt-1">Participant overview by year:</p>

      {loading ? (
        <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-6">
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
                const radius = 140;
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
            <Tooltip contentStyle={{ color: "white", fontWeight: "bold" }} />
            <Legend
              wrapperStyle={{
                background: "#fff",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "50px",
                fontSize: "14px",
                fontWeight: "bold",
                color: "white",
              }}
              align="center"
              verticalAlign="bottom"
            />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default TechTriviaDashboard;