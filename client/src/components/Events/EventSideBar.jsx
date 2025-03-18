import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

const EventSideBar = ({ selectedCategory, setSelectedCategory }) => {
  const [openDropdown, setOpenDropdown] = useState(null);

  const categories = ["TechTrivia", "Genesis", "Hackathon"];

  const toggleDropdown = (category) => {
    setOpenDropdown(openDropdown === category ? null : category);
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col h-screen">
      {/* ACES Logo */}
      <div className="p-6 bg-gray-600 flex flex-col items-center">
        <img src="./Images/logowhite.png" alt="ACES Logo" className="w-30 h-24 mb-4" />
        <h2 className="text-3xl font-bold font-poppins tracking-wider uppercase">ACES</h2>
      </div>

      {/* Navigation Menu */}
      <nav className="flex flex-col p-4 space-y-2">
        {/* Dashboard Button */}
        <button
          onClick={() => setSelectedCategory("EventDashboard")}
          className={`flex items-center px-4 py-2 rounded-md ${
            selectedCategory === "EventDashboard" ? "bg-gray-700 text-white" : "text-gray-300 hover:bg-gray-700"
          }`}
        >
          Dashboard
        </button>

        {/* Category Dropdowns */}
        {categories.map((category) => (
          <div key={category} className="flex flex-col">
            {/* Category Button */}
            <button
              onClick={() => toggleDropdown(category)}
              className="flex items-center justify-between px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 w-full"
            >
              {category}
              {openDropdown === category ? <FaChevronUp /> : <FaChevronDown />}
            </button>

            {/* Dropdown Items */}
            {openDropdown === category && (
              <div className="ml-4 mt-1 flex flex-col space-y-1">
                <button
                  onClick={() => setSelectedCategory(`${category}Dashboard`)}
                  className={`px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 ${
                    selectedCategory === `${category}Dashboard` ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  {category} Dashboard
                </button>
                <button
                  onClick={() => setSelectedCategory(`${category}Participants`)}
                  className={`px-4 py-2 rounded-md text-gray-300 hover:bg-gray-700 ${
                    selectedCategory === `${category}Participants` ? "bg-gray-700 text-white" : ""
                  }`}
                >
                  {category} Participants
                </button>
              </div>
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};

export default EventSideBar;