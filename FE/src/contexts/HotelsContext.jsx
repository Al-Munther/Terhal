import React, { createContext, useState } from "react";

export const hotelsContext = createContext();

const HotelsContextProvider = ({ children }) => {
  const [hotels, setHotels] = useState([]);

  const addHotel = (Hotel) => setHotels([...hotels, Hotel]);
  const updateHotel = (Hotel) => setHotels([...hotels, Hotel]);
  const deleteHotel = (hotelId) =>
    setHotels([...hotels.filter((hotel) => hotel.id !== hotelId)]);

  const contextData = {
    hotels,
    setHotels,
    addHotel,
    updateHotel,
    deleteHotel,
  };

  return (
    <hotelsContext.Provider value={contextData}>
      {children}
    </hotelsContext.Provider>
  );
};

export default HotelsContextProvider;
