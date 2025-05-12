"use client";

import { useEffect } from "react";

const MockDataWarning = () => {
  useEffect(() => {
    const showWarning = () => {
      alert("⚠️ This site uses mock data. Nothing here is real!");
    };

    // Only show once per refresh
    showWarning();
  }, []);

  return null; // It's only for the effect
};

export default MockDataWarning;