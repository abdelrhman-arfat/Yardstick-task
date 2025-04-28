"use client";

import { useEffect } from "react";

const SetUserID = () => {
  useEffect(() => {
    const existingUserId = localStorage.getItem("userId");

    if (!existingUserId) {
      const generatedUserId = generateRandomID();
      localStorage.setItem("userId", generatedUserId);
    }
  }, []);

  const generateRandomID = () => {
    // Generate random 8-digit number
    return Math.floor(10000000 + Math.random() * 90000000).toString();
  };

  return null;
};

export default SetUserID;
