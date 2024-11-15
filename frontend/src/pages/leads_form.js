import React, { useState } from "react";
import { Toast } from "react-bootstrap";
import { useUserContext } from "../context/UserContext";

const CreateLeadForm = () => {
  // State for form data, validation errors, and response handling
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [loading, setLoading] = useState(false);
  
  // Get the context to store the userId
  const { setLeadId } = useUserContext();

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Validate the form fields
  const validateForm = () => {
    let formErrors = {};
    let isValid = true;

    if (!formData.name) {
      formErrors.name = "Name is required.";
      isValid = false;
    }

    if (!formData.email) {
      formErrors.email = "Email is required.";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = "Please enter a valid email address.";
      isValid = false;
    }

    if (!formData.phone) {
      formErrors.phone = "Phone number is required.";
      isValid = false;
    } else if (!/^\+?\d{10,15}$/.test(formData.phone)) {
      formErrors.phone =
        "Please enter a valid phone number (e.g., +1234567890).";
      isValid = false;
    }

    setErrors(formErrors);
    return isValid;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      setLoading(true);
      setShowToast(true);

      try {
        const response = await fetch("http://127.0.0.1:8000/api/leads", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          const data = await response.json();
          setToastMessage("Lead created successfully!");
          setFormData({
            name: "",
            email: "",
            phone: "",
          });

          setLeadId(data.id); 
        } else {
          setToastMessage("Failed to create lead. Please try again.");
        }
      } catch (error) {
        setToastMessage("An error occurred. Please try again.");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="container my-5">
      <h3 className="text-center mb-4">Create New Lead</h3>

      <div className="row justify-content-center">
        <div className="col-md-6">
          {/* Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter lead's full name"
              />
              {errors.name && (
                <small className="text-danger">{errors.name}</small>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter lead's email"
              />
              {errors.email && (
                <small className="text-danger">{errors.email}</small>
              )}
            </div>

            <div className="form-group mt-3">
              <label htmlFor="phone">Phone</label>
              <input
                type="text"
                className="form-control"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter lead's phone number"
              />
              {errors.phone && (
                <small className="text-danger">{errors.phone}</small>
              )}
            </div>

            <div className="form-group mt-4 text-center">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={loading}
              >
                {loading ? "Submitting..." : "Create Lead"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Success or Error Toast */}
      {showToast && (
        <Toast
          className="position-fixed top-0 end-0 m-3"
          bg={toastMessage.includes("successfully") ? "success" : "danger"}
        >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
      )}
    </div>
  );
};

export default CreateLeadForm;
