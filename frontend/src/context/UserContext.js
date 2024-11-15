import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context with initial values
const UserContext = createContext({
  lead_id: null,
  setLeadId: () => {},
});

// Create a provider component
export const UserProvider = ({ children }) => {
  const [lead_id, setLeadId] = useState(null);

  return (
    <UserContext.Provider
      value={{
        lead_id,
        setLeadId,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for using the user context
export const useUserContext = () => useContext(UserContext);
