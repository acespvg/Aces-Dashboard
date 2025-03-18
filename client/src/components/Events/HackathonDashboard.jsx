import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";

const HackathonDashboard = () => {
  const [teamCount, setTeamCount] = useState(0);
  const [teams, setTeams] = useState({ 2: 0, 3: 0, 4: 0 });
  const [genders, setGenders] = useState({ male: 0, female: 0, other: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const categories = [
          { key: 2, route: "two-members" },
          { key: 3, route: "three-members" },
          { key: 4, route: "four-members" },
        ];

        const counts = {};
        await Promise.all(
          categories.map(async ({ key, route }) => {
            const res = await fetch(`http://localhost:8000/api/hackathon/${route}`);
            const data = await res.json();
            counts[key] = data.length;
          })
        );
        setTeams(counts);
      } catch (error) {
        console.error("Error fetching team data:", error);
      }
    };

    const fetchGenderCounts = async () => {
      try {
        const [maleRes, femaleRes, otherRes] = await Promise.all([
          fetch("http://localhost:8000/api/hackathon/male-count"),
          fetch("http://localhost:8000/api/hackathon/female-count"),
          fetch("http://localhost:8000/api/hackathon/other-count"),
        ]);

        const maleData = await maleRes.json();
        const femaleData = await femaleRes.json();
        const otherData = await otherRes.json();

        setGenders({
          male: maleData.maleCount || 0,
          female: femaleData.femaleCount || 0,
          other: otherData.otherCount || 0,
        });
      } catch (error) {
        console.error("Error fetching gender data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchTeamsCount = async () => {
      try { 
        const teamCount = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/hackathon/total-teams");
        const data = await teamCount.json();
        console.log(data);
        setTeamCount(data.totalTeams); // Ensure you only store the number
      } catch (error) {
        console.error("Error fetching team count:", error);
      }
    };
    

    fetchTeams();
    fetchGenderCounts();
    fetchTeamsCount();
  }, []);

  const teamData = Object.keys(teams).map((key) => ({
    name: `${key} Members`,
    value: teams[key],
  }));

  const genderData = [
    { name: "Male", value: genders.male },
    { name: "Female", value: genders.female },
    { name: "Other", value: genders.other },
  ];

  const COLORS = ["#FF5733", "#36A2EB", "#D17A22"];
  const GENDER_COLORS = ["#1E90FF", "#FF69B4", "#A9A9A9"];

  return (
    <div className="p-6 bg-gray-600 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-white">Hackathon Dashboard</h2>

      {loading ? (
        <p className="text-white mt-4 text-lg font-semibold">Loading...</p>
      ) : (
        <>
          <br />
          <p className="text-white text-lg mt-1 p-5 bg-gray-800 text-center rounded-lg shadow-md">Total Teams: {teamCount}</p>
          {/* Team Distribution */}
          <br />
          <p className="text-white text-lg mt-1">Team size distribution:</p>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {teamData.map((item, index) => (
              <div key={index} className="p-5 bg-gray-800 text-center rounded-lg shadow-md">
                <p className="text-3xl font-bold text-white">{item.value}</p>
                <p className="text-gray-300 text-lg font-semibold">{item.name}</p>
              </div>
            ))}
          </div>

          

          {/* Pie Charts */}
          {/* <div className="grid grid-cols-2 gap-10 mt-10"> */}
            <div className="flex flex-col items-center mt-8">
              <h3 className="text-xl font-bold text-white mb-3">Team Size Distribution</h3>
              <PieChart width={500} height={300}>
                <Pie
                  data={teamData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {teamData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>

            {/* Gender Distribution */}
          <p className="text-white text-lg mt-8">Gender distribution:</p>
          <div className="grid grid-cols-3 gap-6 mt-6">
            {genderData.map((item, index) => (
              <div key={index} className="p-5 bg-gray-800 text-center rounded-lg shadow-md">
                <p className="text-3xl font-bold text-white">{item.value}</p>
                <p className="text-gray-300 text-lg font-semibold">{item.name}</p>
              </div>
            ))}
          </div>

            <div className="flex flex-col items-center mt-8">
              <h3 className="text-xl font-bold text-white mb-3">Gender Distribution</h3>
              <PieChart width={500} height={300}>
                <Pie
                  data={genderData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={false}
                >
                  {genderData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={GENDER_COLORS[index]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </div>
          {/* </div> */}
        </>
      )}
    </div>
  );
};

export default HackathonDashboard;