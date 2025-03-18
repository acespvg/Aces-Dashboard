import React, { useState } from "react";
import Sidebar from "../components/Members/Sidebar";
import Dashboard from "../components/Members/Dashboard";
import SE from "../components/Members/SE";
import TE from "../components/Members/TE";
import BE from "../components/Members/BE";

const Members = () => {
  const [selectedCategory, setSelectedCategory] = useState("Dashboard");

  return (
    <div className="flex h-full">
      <Sidebar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      
      <div className="flex-grow p-6 h-screen overflow-y-auto bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('./Images/meetings-bg.jpg')" }}>

        {/* Conditional Rendering */}
        {selectedCategory === "Dashboard" && <Dashboard />}
        {selectedCategory === "SE" && <SE />}
        {selectedCategory === "TE" && <TE />}
        {selectedCategory === "BE" && <BE />}
      </div>
    </div>
  );
};

export default Members;