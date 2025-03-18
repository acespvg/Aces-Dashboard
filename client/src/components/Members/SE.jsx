import React, { useEffect, useState } from "react";

const SE = () => {
  const [members, setMembers] = useState([]);
  const [filteredMembers, setFilteredMembers] = useState([]); // For search filtering
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Search input state

  useEffect(() => {
    const fetchMembers = async () => {
      setLoading(true);
      try {
        const response = await fetch(process.env.REACT_APP_BACKEND_URL + "/api/members/SE");
        const data = await response.json();
        setMembers(data);
        setFilteredMembers(data); // Initialize filtered list
      } catch (error) {
        console.error("Error fetching SE members:", error);
      }
      setLoading(false);
    };

    fetchMembers();
  }, []);

  // Handle search input change
  const handleSearch = (event) => {
    const value = event.target.value.toLowerCase();
    setSearchTerm(value);

    // Filter members based on search term (Name, Email, or Phone)
    const filtered = members.filter(
      (member) =>
        member.MemberName.toLowerCase().includes(value) ||
        member.MemberEmail.toLowerCase().includes(value) ||
        member.MemberPhone.includes(value)
    );

    setFilteredMembers(filtered);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-2">SE Members</h2>

      {/* Search Input */}
      <input
        type="text"
        placeholder="Search by Name, Email, or Phone..."
        value={searchTerm}
        onChange={handleSearch}
        className="w-full p-2 mb-4 border rounded-md"
      />

      {loading ? (
        <p>Loading...</p>
      ) : filteredMembers.length === 0 ? (
        <p>No members found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">Name</th>
                <th className="border border-gray-300 px-4 py-2">Email</th>
                <th className="border border-gray-300 px-4 py-2">Phone</th>
                <th className="border border-gray-300 px-4 py-2">Payment Type</th>
                <th className="border border-gray-300 px-4 py-2">Date of Payment</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map((member, index) => (
                <tr key={index} className="hover:bg-gray-100">
                  <td className="border border-gray-300 px-4 py-2">{member.MemberName}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.MemberEmail}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.MemberPhone}</td>
                  <td className="border border-gray-300 px-4 py-2">{member.MemberPaymentType}</td>
                  <td className="border border-gray-300 px-4 py-2">
                    {new Date(member.MemberDateOfPayment).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SE;