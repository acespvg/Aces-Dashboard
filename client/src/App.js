import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './components/Home';
// import Login from './components/Login';
// import Register from './components/Register';
// import Dashboard from './components/Dashboard';
import MembersPage from './pages/MembersPage';
// import Dashboard from "./components/Dashboard";
// import SE from "./components/SE";
// import TE from "./components/TE";
// import BE from "./components/BE";
// import Members from "./components/Members";
import EventsPage from './pages/EventPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route path="/login" element={<Login />} /> */}
        {/* <Route path="/register" element={<Register />} /> */}
        {/* <Route path="/dashboard" element={<Dashboard />} /> */}
        {/* Add Navigate for redirection */}
        {/* <Route path="/old-route" element={<Navigate to="/new-route" />} /> */}
        <Route path="/members" element={<MembersPage />} />
        {/* <Route path="/" element={<Dashboard />}>
          <Route index element={<Members />} />
          <Route path="se-members" element={<SE />} />
          <Route path="te-members" element={<TE />} />
          <Route path="be-members" element={<BE />} />
        </Route> */}
        <Route path="/events" element={<EventsPage />} />
      </Routes>
    </Router>
  );
}

export default App;