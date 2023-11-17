"use client";

import { createContext, useState } from "react";

export const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [showJohannesburg, setShowJohannesburg] = useState(true);
  const [showPretoria, setShowPretoria] = useState(true);
  const [showMosselBay, setShowMosselBay] = useState(true);
  const [showGeorge, setShowGeorge] = useState(true);
  const [showClearFilter, setShowClearFilter] = useState(false);

  return (
    <LocationsContext.Provider
      value={{
        showJohannesburg,
        setShowJohannesburg,
        showPretoria,
        setShowPretoria,
        showGeorge,
        setShowGeorge,
        showMosselBay,
        setShowMosselBay,
        showClearFilter,
        setShowClearFilter,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
