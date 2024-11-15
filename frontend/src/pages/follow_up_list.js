import React, { useEffect, useState } from 'react';

const FollowUpList = ({ leadId }) => {
  const [followUps, setFollowUps] = useState([]);

  useEffect(() => {
    const fetchFollowUps = async () => {
      const response = await fetch(`http://127.0.0.1:8000/api/followups?lead_id=${leadId}`);
      const data = await response.json();
      setFollowUps(data);
    };

    fetchFollowUps();
  }, [leadId]);

  return (
    <div>
      <h3>Follow-Ups</h3>
      <ul>
        {followUps.map((followUp) => (
          <li key={followUp.id}>
            <span>{followUp.scheduled_at} - {followUp.status}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FollowUpList;
