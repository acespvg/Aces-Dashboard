import React, { useState, useEffect } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import Input from "./ui/input";
import Button from "./ui/button";
import { Link } from "react-router-dom";
import { FaUsers, FaCalendarAlt } from "react-icons/fa";

const Home = () => {
  const [loginDetails, setLoginDetails] = useState({ username: "", password: "" });
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:8000/api/login", loginDetails);
      localStorage.setItem("token", response.data.token);
      setIsAuthenticated(true);
    } catch (error) {
      alert("Login failed: " + error.response?.data?.message || "Unknown error");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white px-4">
      {/* Login Modal */}
      {!isAuthenticated ? (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg text-center w-96">
            <h2 className="text-xl font-bold mb-4">Login</h2>
            <Input
              type="text"
              placeholder="Enter Usernmae"
              className="mb-3 p-2 w-full bg-gray-700 border border-gray-600 rounded text-white"
              value={loginDetails.username}
              onChange={(e) => setLoginDetails({ ...loginDetails, username: e.target.value })}
            />
            <Input
              type="password"
              placeholder="Enter Password"
              className="mb-3 p-2 w-full bg-gray-700 border border-gray-600 rounded text-white"
              value={loginDetails.password}
              onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })}
            />
            <Button className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded" onClick={handleLogin}>
              Login
            </Button>
          </div>
        </motion.div>
      ) : (
        <>
          {/* Logo */}
          <div className="mb-6">
            <img src="/Images/logowhite.png" alt="Logo" className="w-24 h-24" />
          </div>

          {/* Heading */}
          <motion.h1 className="text-4xl font-bold" animate={{ scale: 1.1 }}>
            ACES
          </motion.h1>
          <motion.h1 className="text-2xl font-semibold mt-2" animate={{ scale: 1.1 }}>
            Welcome To Dashboard
          </motion.h1>

          {/* Cards Container */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-8">
            {/* Members Card */}
            <Link to="/members">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-64 cursor-pointer hover:bg-gray-700"
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaUsers /> Members
                </h2>
              </motion.div>
            </Link>

            {/* Events Card */}
            <Link to="/events">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="bg-gray-800 p-6 rounded-lg shadow-md flex flex-col items-center justify-center w-64 cursor-pointer hover:bg-gray-700"
              >
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <FaCalendarAlt /> Events
                </h2>
              </motion.div>
            </Link>
          </div>

          {/* Event Details Popup */}
          {selectedEvent && (
            <motion.div
              className="bg-gray-800 p-6 rounded-lg shadow-lg mt-6 w-80 text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              <h2 className="text-lg font-bold">{selectedEvent.name} Participants</h2>
              <Input
                className="mt-3 p-2 w-full bg-gray-700 border border-gray-600 rounded text-white"
                placeholder="Search participant"
                onChange={(e) => setSearch(e.target.value)}
              />
              <ul className="mt-3 space-y-2">
                {selectedEvent.participants
                  .filter((p) => p.toLowerCase().includes(search.toLowerCase()))
                  .map((p, i) => (
                    <li key={i} className="bg-gray-700 p-2 rounded">
                      {p}
                    </li>
                  ))}
              </ul>
              <Button
                className="mt-4 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                onClick={() => setSelectedEvent(null)}
              >
                Close
              </Button>
            </motion.div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;