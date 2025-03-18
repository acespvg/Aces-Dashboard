import React, { useState } from "react";
import EventSideBar from "../components/Events/EventSideBar";
import EventDashboard from "../components/Events/EventDashboard";
import TechTriviaDashboard from "../components/Events/TechTriviaDashboard";
import TechTriviaParticipants from "../components/Events/TechTriviaParticipants";
import GenesisDashboard from "../components/Events/GenesisDashboard";
import GenesisParticipants from "../components/Events/GenesisParticipants";
import HackathonDashboard from "../components/Events/HackathonDashboard";
import HackathonParticipants from "../components/Events/HackathonParticipants";

const EventsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("EventDashboard");

  return (
    <div className="flex h-full">
      <EventSideBar selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

      <div
        className="flex-grow p-6 h-screen overflow-y-auto bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('./Images/meetings-bg.jpg')" }}
      >
        {/* Conditional Rendering Based on Selected Category */}
        {selectedCategory === "EventDashboard" && <EventDashboard />}

        {/* TechTrivia Section */}
        {selectedCategory === "TechTriviaDashboard" && <TechTriviaDashboard />}
        {selectedCategory === "TechTriviaParticipants" && <TechTriviaParticipants />}

        {/* Genesis Section */}
        {selectedCategory === "GenesisDashboard" && <GenesisDashboard />}
        {selectedCategory === "GenesisParticipants" && <GenesisParticipants />}

        {/* Hackathon Section */}
        {selectedCategory === "HackathonDashboard" && <HackathonDashboard />}
        {selectedCategory === "HackathonParticipants" && <HackathonParticipants />}
      </div>
    </div>
  );
};

export default EventsPage;