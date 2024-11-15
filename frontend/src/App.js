import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainPage from "./pages/main_page";

const App = () => {
  return (
    <div className="app">
      <Router> {/* Wrap Routes inside Router */}
        <Routes>
          <Route path="/" element={<MainPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
