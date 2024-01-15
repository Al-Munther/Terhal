import React, { createContext, useState } from "react";

export const opointmentsContext = createContext();

const OpointmentsContextProvider = ({ children }) => {
  const [opointments, setOpointments] = useState([]);

  const addOpointment = (opointment) => setOpointments([...opointments, opointment]);
  const updateOpointment = (opointment) => setOpointments([...opointments, opointment]);
  const deleteOpointment = (opointmentId) =>
    setOpointments([...opointments.filter((Opointment) => Opointment.id !== opointmentId)]);

  const contextData = {
    opointments,
    setOpointments,
    addOpointment,
    updateOpointment,
    deleteOpointment,
  };

  return (
    <opointmentsContext.Provider value={contextData}>
      {children}
    </opointmentsContext.Provider>
  );
};

export default OpointmentsContextProvider;
