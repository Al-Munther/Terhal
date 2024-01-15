import React, { createContext, useState } from 'react'

export const citiesContext = createContext();

const CitiesContextProvider = ({children}) => {
    const [cities, setCities] = useState([]);

    const addCity = (city) => setCities([...cities, city]);
    const updateCity = (city) => setCities([...cities, city]);
    const deleteCity = (cityId) =>
      setCities([...cities.filter((City) => City.id !== cityId)]);

    const contextData = {
      cities,
      setCities,
      addCity,
      updateCity,
      deleteCity,
    };

  return (
    <citiesContext.Provider value={contextData}>
      {children}
    </citiesContext.Provider>
  );
}

export default CitiesContextProvider;