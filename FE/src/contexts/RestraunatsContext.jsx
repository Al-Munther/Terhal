import React, { createContext, useState } from "react";

export const restraunatsContext = createContext();

const RestraunatsContextProvider = ({ children }) => {
  const [restraunats, setRestraunats] = useState([]);

  const addRestraunat = (restraunat) => setRestraunats([...restraunats, restraunat]);
  const updateRestraunat = (restraunat) => setRestraunats([...restraunats, restraunat]);
  const deleteRestraunat = (restraunatId) =>
    setRestraunats([...restraunats.filter((Restraunat) => Restraunat.id !== restraunatId)]);

  const contextData = {
    restraunats,
    setRestraunats,
    addRestraunat,
    updateRestraunat,
    deleteRestraunat,
  };

  return (
    <restraunatsContext.Provider value={contextData}>
      {children}
    </restraunatsContext.Provider>
  );
};

export default RestraunatsContextProvider;
