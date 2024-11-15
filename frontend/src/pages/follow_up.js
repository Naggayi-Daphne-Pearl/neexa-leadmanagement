import React, { useState } from "react";

const ScheduleFollowUp = ({ leadId, onSchedule }) => {
  const [scheduledAt, setScheduledAt] = useState("");
  const [status, setStatus] = useState("Pending");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSchedule(scheduledAt, status);
    setScheduledAt(""); // Clear the input
    setStatus("Pending"); // Reset status
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Schedule Follow-Up for Lead ID: {leadId}</h3>
      <div>
        <label htmlFor="scheduledAt">Scheduled At:</label>
        <input
          type="datetime-local"
          id="scheduledAt"
          value={scheduledAt}
          onChange={(e) => setScheduledAt(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="status">Status:</label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="Cancelled">Cancelled</option>
        </select>
      </div>
      <button type="submit">Schedule Follow-Up</button>
    </form>
  );
};

export default ScheduleFollowUp;
