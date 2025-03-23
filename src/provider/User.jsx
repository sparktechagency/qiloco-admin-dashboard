import React, { useContext, useEffect, useState } from "react";
import { useProfileQuery } from "../redux/apiSlices/profileSlice";

export const UserContext = React.createContext(null);

export const UserProvider = ({ children }) => {
  const { data: profile } = useProfileQuery();
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (profile?.data) {
      setUser({
        name: profile.data.name || "", // Assuming `name` is full name
        email: profile.data.email || "",
        mobileNumber: profile.data.phoneNumber || "", // Changed from `phone`
        image: profile.data.image || "",
        role: profile.data.role || "",
      });
    }
  }, [profile]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
