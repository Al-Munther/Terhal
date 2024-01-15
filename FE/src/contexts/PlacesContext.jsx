import React, { createContext, useState } from "react";

export const placesContext = createContext();

const PlacesContextProvider = ({ children }) => {
  const [places, setPlaces] = useState([]);

  const addPlace = (place) => setPlaces([...places, place]);
  const updatePlace = (place) => setPlaces([...places, place]);
  const deletePlace = (placeId) =>
    setPlaces([...places.filter((place) => place.id !== placeId)]);

  const contextData = {
    places,
    setPlaces,
    addPlace,
    updatePlace,
    deletePlace,
  };

  return (
    <placesContext.Provider value={contextData}>
      {children}
    </placesContext.Provider>
  );
};

export default PlacesContextProvider;
