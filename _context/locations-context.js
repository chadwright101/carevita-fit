"use client";

import { createContext, useState } from "react";

export const LocationsContext = createContext();

export const LocationsProvider = ({ children }) => {
  const [showJohannesburg, setShowJohannesburg] = useState(true);
  const [showPretoria, setShowPretoria] = useState(true);
  const [showMosselBay, setShowMosselBay] = useState(true);
  const [showGeorge, setShowGeorge] = useState(true);
  const [showClearFilter, setShowClearFilter] = useState(false);
  const [enquireNowLocation, setEnquireNowLocation] = useState("");

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
        enquireNowLocation,
        setEnquireNowLocation,
      }}
    >
      {children}
    </LocationsContext.Provider>
  );
};
