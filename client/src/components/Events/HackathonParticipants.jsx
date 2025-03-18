import React, { useState, useEffect } from 'react';

function HackathonParticipants() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    fetch('http://localhost:8000/api/hackathon')
      .then(async (res) => {
        console.log('Response status:', res.status);
        if (!res.ok) {
          const errorText = await res.text();
          console.error('Error response text:', errorText);
          throw new Error(`Network response was not ok, status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setTeams(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredTeams = teams.filter(team => {
    const teamName = team.teamName || `${team.leader.firstName} ${team.leader.lastName}'s Team`;
    return teamName.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleDetailsClick = (team) => {
    setSelectedTeam(selectedTeam?._id === team._id ? null : team);
  };

  if (loading) return <div className="flex items-center justify-center h-screen text-xl font-semibold">Loading registrations...</div>;
  if (error) return <div className="flex items-center justify-center h-screen text-xl font-semibold text-red-600">Error: {error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">All Registered Teams</h1>
      <div className="mb-6">
        <input
          type="text"
          placeholder="Search by team name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTeams.length > 0 ? (
          filteredTeams.map((team) => (
            <TeamCard 
              key={team._id} 
              team={team} 
              onDetailsClick={() => handleDetailsClick(team)}
              isSelected={selectedTeam?._id === team._id}
            />
          ))
        ) : (
          <div className="col-span-3 text-center text-lg font-medium text-gray-500">No registrations found.</div>
        )}
      </div>
      {selectedTeam && <DetailsOverlay team={selectedTeam} onClose={() => setSelectedTeam(null)} />}
    </div>
  );
}

function TeamCard({ team, onDetailsClick, isSelected }) {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200 hover:shadow-lg transition-shadow duration-300">
      <div className="bg-gray-900 text-white p-4">
        <h2 className="text-xl font-semibold truncate">
          {team.teamName || `${team.leader.firstName} ${team.leader.lastName}'s Team`}
        </h2>
      </div>
      <div className="p-4">
        <p className="mb-2"><span className="font-semibold">Team Leader:</span> {team.leader.firstName} {team.leader.lastName}</p>
        <p className="mb-2"><span className="font-semibold">Team Size:</span> {team.teamSize}</p>
        <p className="mb-4"><span className="font-semibold">Leader Email:</span> {team.leader.email}</p>
        <button 
          className={`w-full py-2 px-4 rounded-md font-medium transition-colors duration-300 ${
            isSelected 
              ? 'bg-gray-100 text-gray-800 border border-gray-300' 
              : 'bg-gray-800 text-white hover:bg-gray-900'
          }`}
          onClick={onDetailsClick}
        >
          {isSelected ? 'Hide Details' : 'All Details'}
        </button>
      </div>
    </div>
  );
}

function DetailsOverlay({ team, onClose }) {
  const [enlargedImage, setEnlargedImage] = useState(null);

  const handleImageClick = (imageUrl, altText) => {
    setEnlargedImage({ url: imageUrl, alt: altText });
  };

  const closeEnlargedImage = () => {
    setEnlargedImage(null);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
        <div className="sticky top-0 bg-white p-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold">Team Details</h2>
          <button 
            className="text-3xl text-gray-600 hover:text-gray-900" 
            onClick={onClose}
          >
            &times;
          </button>
        </div>
        
        <div className="p-6">
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Payment Details</h3>
            {team.paymentQR && (
              <div className="mb-4">
                <img 
                  src={team.paymentQR} 
                  alt="Payment QR Code" 
                  className="max-w-xs h-32 object-contain cursor-pointer border border-gray-200 p-1 rounded" 
                  onClick={() => handleImageClick(team.paymentQR, "Payment QR Code")}
                />
              </div>
            )}
            {team.paymentScreenshot && (
              <div>
                <p className="font-semibold mb-2">Payment Screenshot:</p>
                <img 
                  src={team.paymentScreenshot} 
                  alt="Payment Screenshot" 
                  className="h-40 object-cover cursor-pointer border border-gray-200 rounded" 
                  onClick={() => handleImageClick(team.paymentScreenshot, "Payment Screenshot")}
                />
              </div>
            )}
          </div>

          {/* Team Description and Details */}
          <div className="mb-8">
          <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Project Description</h3>
            <p><span className="font-semibold">{team.projectDescription}</span></p>
          </div>
          
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Team Leader Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <p><span className="font-semibold">Name:</span> {team.leader.firstName} {team.leader.lastName}</p>
              <p><span className="font-semibold">Email:</span> {team.leader.email}</p>
              <p><span className="font-semibold">Mobile:</span> {team.leader.mobile}</p>
              <p><span className="font-semibold">Gender:</span> {team.leader.gender}</p>
              <p><span className="font-semibold">Institute Name:</span> {team.leader.instituteName}</p>
              <p><span className="font-semibold">Participant Type:</span> {team.leader.type}</p>
              <p><span className="font-semibold">Course:</span> {team.leader.course}</p>
              <p><span className="font-semibold">Course Specialization:</span> {team.leader.courseSpecialization}</p>
              <p><span className="font-semibold">Graduation Year:</span> {team.leader.graduationYear}</p>
              <p><span className="font-semibold">ACES Member:</span> {team.leader.isAcesMember ? 'Yes' : 'No'}</p>
            </div>
            
            {team.leader.isAcesMember && team.leader.receipt && (
              <div className="mt-4">
                <p className="font-semibold mb-2">Receipt:</p>
                <img 
                  src={team.leader.receipt} 
                  alt="Leader Receipt" 
                  className="h-40 object-cover cursor-pointer border border-gray-200 rounded" 
                  onClick={() => handleImageClick(team.leader.receipt, "Leader Receipt")}
                />
              </div>
            )}
          </div>
          
          {team.teamMembers && team.teamMembers.length > 0 && (
            <div>
              <h3 className="text-xl font-semibold mb-4 pb-2 border-b border-gray-200">Team Members Details</h3>
              {team.teamMembers.map((member, idx) => (
                <div key={idx} className="mb-8 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-semibold text-lg mb-3">Member {idx + 1}</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <p><span className="font-semibold">Name:</span> {member.firstName} {member.lastName}</p>
                    <p><span className="font-semibold">Email:</span> {member.email}</p>
                    <p><span className="font-semibold">Mobile:</span> {member.mobile}</p>
                    <p><span className="font-semibold">Gender:</span> {member.gender}</p>
                    <p><span className="font-semibold">Institute Name:</span> {member.instituteName}</p>
                    <p><span className="font-semibold">Participant Type:</span> {member.type}</p>
                    <p><span className="font-semibold">Course:</span> {member.course}</p>
                    <p><span className="font-semibold">Course Specialization:</span> {member.courseSpecialization}</p>
                    <p><span className="font-semibold">Graduation Year:</span> {member.graduationYear}</p>
                    <p><span className="font-semibold">ACES Member:</span> {member.isAcesMember ? 'Yes' : 'No'}</p>
                  </div>
                  
                  {member.isAcesMember && member.receipt && (
                    <div className="mt-4">
                      <p className="font-semibold mb-2">Receipt:</p>
                      <img 
                        src={member.receipt} 
                        alt={`Member ${idx + 1} Receipt`} 
                        className="h-40 object-cover cursor-pointer border border-gray-200 rounded" 
                        onClick={() => handleImageClick(member.receipt, `Member ${idx + 1} Receipt`)}
                      />
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Full-size image modal */}
      {enlargedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center cursor-pointer"
          onClick={closeEnlargedImage}
        >
          <div className="relative max-w-4xl max-h-screen p-4">
            <button 
              className="absolute top-2 right-2 text-3xl text-white hover:text-gray-300" 
              onClick={closeEnlargedImage}
            >
              &times;
            </button>
            <img 
              src={enlargedImage.url} 
              alt={enlargedImage.alt} 
              className="max-w-full max-h-screen object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default HackathonParticipants;