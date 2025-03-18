import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const Members = () => {
  const [seCount, setSeCount] = useState(0);
  const [teCount, setTeCount] = useState(0);
  const [beCount, setBeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMemberCounts = async () => {
      try {
        const seRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/members/SE");
        const teRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/members/TE");
        const beRes = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/members/BE");

        const seData = await seRes.json();
        const teData = await teRes.json();
        const beData = await beRes.json();

        setSeCount(seData.length);
        setTeCount(teData.length);
        setBeCount(beData.length);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching member counts:", error);
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

  const COLORS = ["#FF5733", "#33A1FF", "#28A745"];

  return (
    <div className="p-6 bg-gray-600 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-white">Welcome back, Dhanesh!</h2>
      <p className="text-white">Here's an overview of the student association:</p>

      {loading ? (
        <p className="text-white mt-4">Loading...</p>
      ) : (
        <div className="grid grid-cols-3 gap-4 mt-4">
          <div className="p-4 bg-gray-100 text-center rounded-md">
            <p className="text-lg font-bold">{seCount}</p>
            <p className="text-gray-600 font-semibold">SE Members</p>
          </div>
          <div className="p-4 bg-gray-100 text-center rounded-md">
            <p className="text-lg font-bold">{teCount}</p>
            <p className="text-gray-600 font-semibold">TE Members</p>
          </div>
          <div className="p-4 bg-gray-100 text-center rounded-md">
            <p className="text-lg font-bold">{beCount}</p>
            <p className="text-gray-600 font-semibold">BE Members</p>
          </div>
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
              fill="#8884d8"
              dataKey="value"
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>
      )}
    </div>
  );
};

export default Members;