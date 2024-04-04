import React, { createContext, useContext, useState } from 'react';

const TravelsDataContext = createContext();

export const TravelsDataProvider = ({ children }) => {
  const [travelsData, setTravelsData] = useState([]);

  useEffect(() => {
    async function fetchTravelNotes() {
      try {
        const travelNotes = await getAllTravelNote();
        setTravelsData(travelNotes);
      } catch (error) {
        console.error('获取游记数据时发生错误：', error);
      }
    }

    fetchTravelNotes();
  }, []);

  return (
    <TravelsDataContext.Provider value={{ travelsData, setTravelsData }}>
      {children}
    </TravelsDataContext.Provider>
  );
};

export const useTravelsData = () => {
  const context = useContext(TravelsDataContext);
  if (!context) throw new Error('useTravelsData must be used within a TravelsDataProvider');
  return context;
};