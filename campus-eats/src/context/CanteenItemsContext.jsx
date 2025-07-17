// context/CanteenItemsContext.jsx
import { createContext, useContext, useState } from "react";

const CanteenItemsContext = createContext();

export const CanteenItemsProvider = ({ children }) => {
  const [canteenFoods, setCanteenFoods] = useState({}); // { canteenId: [foods] }

  const setFoodsForCanteen = (canteenId, foods) => {
    setCanteenFoods((prev) => ({
      ...prev,
      [canteenId]: foods,
    }));
  };

  return (
    <CanteenItemsContext.Provider value={{ canteenFoods, setFoodsForCanteen }}>
      {children}
    </CanteenItemsContext.Provider>
  );
};

export const useCanteenItems = () => useContext(CanteenItemsContext);
