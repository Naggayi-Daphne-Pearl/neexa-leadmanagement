import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

import Notfound from "./pages/404";
import LeadsList from "./pages/leads_list";
import CreateLeadForm from "./pages/leads_form";
import FollowUpList from "./pages/follow_up";
import ScheduleFollowUp from "./pages/schedule_follow";
import UpdateFollowUpStatus from "./pages/update_followup";
import AppNavbar from "./components/navbar";
import AppFooter from "./components/footer";

function App() {
  return (
    <Router>
      <div className="App">
        <AppNavbar/>
        <Routes>
          <Route path="/" element={<LeadsList />} />
          <Route path="/leadForm" element={<CreateLeadForm />} />
          <Route path="/followList" element={<FollowUpList />} />
          <Route path="/schedule-follow-up" element={<ScheduleFollowUp />} />
          <Route path="/update-follow-up-status" element={<UpdateFollowUpStatus />} />

          <Route path="*" element={<Notfound />} />
        </Routes>
        <AppFooter/>
      </div>
    </Router>
  );
}

export default App;
