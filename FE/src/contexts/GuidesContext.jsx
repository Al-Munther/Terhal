import React, { createContext, useState } from 'react'


export const guidesContext = createContext();

const GuidesContextProvider = ({children}) => {
   const [guides, setGuides] = useState([]);

   const addGuide = (guide) =>
     setGuides([...guides, guide]);
   const updateGuide = (guide) =>
     setGuides([...guides, guide]);
   const deleteGuide = (guideId) =>
     setGuides([
       ...guides.filter((guide) => guide.id !== guideId),
     ]);

   const contextData = {
     guides,
     setGuides,
     addGuide,
     updateGuide,
     deleteGuide,
   };
  return (
    <guidesContext.Provider value={contextData}>{children}</guidesContext.Provider>
  )
}

export default GuidesContextProvider