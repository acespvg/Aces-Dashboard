import React, { useEffect, useState } from "react";
import {
  PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer
} from "recharts";

const EventDashboard = () => {
  const [liveEvents, setLiveEvents] = useState([]);
  const [pastEvents, setPastEvents] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const liveResponse = await fetch("/live_events.json");
        const liveData = await liveResponse.json();

        const pastResponse = await fetch("/past_event.json");
        const pastData = await pastResponse.json();

        setLiveEvents(liveData);
        setPastEvents(pastData);
      } catch (error) {
        console.error("Error fetching event data:", error);
      }
    };

    fetchData();
  }, []);

  const allEvents = [...liveEvents, ...pastEvents];

  // Prepare data for Pie Chart - Total Participants
  const pieData = [
    { name: "Live Events", value: liveEvents.reduce((acc, event) => acc + event.participants, 0) },
    { name: "Past Events", value: pastEvents.reduce((acc, event) => acc + event.participants, 0) }
  ];

  // Prepare data for Bar Chart - Participants per Event
  const barData = allEvents.map((event) => ({
    name: event.name,
    participants: event.participants
  }));

  const COLORS = ["#0088FE", "#FFBB28"];

  return (
    <div className="p-6 bg-gray-600 min-h-screen">
      <h1 className="text-4xl font-bold text-center text-white mb-6">Event Dashboard</h1>

      {/* Event Lists */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Live Events */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-green-300 mb-4">Live Events</h2>
          <ul className="space-y-3">
            {liveEvents.map((event, index) => (
              <li key={index} className="border p-3 rounded-lg shadow-sm bg-gray-800">
                <h3 className="text-lg font-bold text-white">{event.name}</h3>
                <p className="text-400 text-gray-300">{event.description}</p>
                {/* <a
                  href={event.reg_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-500 hover:underline"
                >
                  Register Here
                </a> */}
                <p className="text-gray-300">Participants: {event.participants}</p>
              </li>
            ))}
          </ul>
        </div>

        {/* Past Events */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-blue-300 mb-4">Past Events</h2>
          <ul className="space-y-3">
            {pastEvents.map((event, index) => (
              <li key={index} className="border p-3 rounded-lg shadow-sm bg-gray-800">
                <h3 className="text-lg font-bold text-white">{event.name}</h3>
                <p className="text-gray-300">{event.description}</p>
                <p className="text-gray-300">Participants: {event.participants}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
        {/* Pie Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-white">Event Participation Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Bar Chart */}
        <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-center mb-4 text-white">Participants per Event</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="participants" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default EventDashboard;