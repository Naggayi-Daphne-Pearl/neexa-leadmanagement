import { toast } from "react-toastify";
import axios from "axios";

// Example of making an API request
const createLead = async () => {
  try {
    await axios.post("/api/leads", { name, email, phone });
    toast.success("Lead created successfully!");
  } catch (error) {
    toast.error("Error creating lead.");
  }
};
