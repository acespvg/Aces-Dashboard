import React, { useEffect, useState } from "react";

const GenesisParticipants = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:8000/api/genesis");
        const data = await response.json();
        setMembers(data);
        setFilteredMembers(data);
      } catch (error) {
        console.error("Error fetching Genesis members:", error);
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    const filtered = members.filter(
      (member) =>
        member.Name.toLowerCase().includes(value) ||
        member.Email.toLowerCase().includes(value) ||
        member.Phone.includes(value) ||
        member.Year.toLowerCase().includes(value) ||
        member.Branch.toLowerCase().includes(value) ||
        member.Sessions.toLowerCase().includes(value)
    );

    setFilteredMembers(filtered);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">Genesis Participants</h2>

      <input
        type="text"
        placeholder="Search by Name, Email, Phone, Year or Branch..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border border-gray-300 rounded-md"
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredMembers.length === 0 ? (
        <p>No participants found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Year</th>
                <th className="border border-gray-300 px-4 py-2">Branch</th>
                {/* <th className="border border-gray-300 px-4 py-2">Sessions</th> */}
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{member.Name}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.Email}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.Phone}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.Year}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.Branch}</td>
                  {/* <td className="border border-gray-300 px-4 py-2">{member.Sessions}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default GenesisParticipants;