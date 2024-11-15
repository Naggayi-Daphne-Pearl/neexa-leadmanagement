import React from "react";
import { Button } from "react-bootstrap";
import { toast } from "react-toastify";
import axios from "axios";

const UpdateFollowUpStatus = ({ followUpId, userRole, currentStatus }) => {
  const handleStatusUpdate = async (newStatus) => {
    try {
      // Update status through API (assumes API endpoint exists)
      const response = await axios.put(`/api/follow-ups/${followUpId}`, {
        status: newStatus,
      });

      toast.success("Follow-up status updated successfully!");
    } catch (error) {
      toast.error("Error updating follow-up status.");
    }
  };

  return userRole === "Admin" || userRole === "Sales Manager" ? (
    <div>
      {currentStatus !== "Completed" && (
        <Button
          variant="success"
          onClick={() => handleStatusUpdate("Completed")}
        >
          Mark as Completed
        </Button>
      )}
      {currentStatus !== "Missed" && (
        <Button variant="danger" onClick={() => handleStatusUpdate("Missed")}>
          Mark as Missed
        </Button>
      )}
    </div>
  ) : null;
};

export default UpdateFollowUpStatus;
