import React from "react";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      <div className="p-6 bg-gray-600 flex flex-col items-center">
        <img src="./Images/logowhite.png" alt="ACES Logo" className="w-30 h-24 mb-4" />
        <h2 className="text-3xl font-bold font-poppins tracking-wider uppercase">ACES</h2>
      </div>

      <nav className="flex flex-col p-4 space-y-4">
        {/* Dashboard Button */}
        <button
          onClick={() => setSelectedCategory("Dashboard")}
          className={`flex items-center px-4 py-2 rounded-md ${
            selectedCategory === "Dashboard" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Dashboard
        </button>

        {/* SE, TE, BE Buttons */}
        {["SE", "TE", "BE"].map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`flex items-center px-4 py-2 rounded-md ${
              selectedCategory === category ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
            }`}
          >
            {category} Members
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Sidebar;