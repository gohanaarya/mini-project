import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import { useUserAuth } from "./UserAuthContext"; 

const CanteenContext = createContext();

export const CanteenProvider = ({ children }) => {
  const { token } = useUserAuth();
  const [canteens, setCanteens] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCanteens = async () => {
      try {
        if (!token) return; 
        setLoading(true);

        const res = await axios.get("https://mini-project-n8cx.onrender.com/api/auth/canteens", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setCanteens(res.data.canteens || []);
      } catch (err) {
        console.error(
          "Error fetching canteens:",
          err.response?.data || err.message
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCanteens();
  }, [token]); // 🔁 run effect when token becomes available

  return (
    <CanteenContext.Provider value={{ canteens, loading }}>
      {children}
    </CanteenContext.Provider>
  );
};

export const useCanteens = () => useContext(CanteenContext);
