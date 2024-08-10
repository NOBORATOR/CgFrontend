import React, { createContext, useState, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';
import axios from 'axios';


const PlayerdetailsContext = createContext();

export const AuthProvider = ({ children }) => {
  const [playerdetails, setPlayerdetails] = useState({});


  useEffect(() => {
   
    async function fet(){
      try{
        const response = await axios.post('https://cgbackend.onrender.com/api/v1/auth',{},{withCredentials: true});
        setPlayerdetails(response.data.dataplayerdetails);
        // console.log(playerdetails)
       
      }
      catch(e){
        return null;
      }
      
    }
    fet();
  }, []);

  const login = (authToken) => {
    // Cookies.set('token', authToken, { expires: 7 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return (
    <PlayerdetailsContext.Provider value={{ playerdetails}}>
      {children}
    </PlayerdetailsContext.Provider>
  );
};

export const usePlayerdetails = () => useContext(PlayerdetailsContext);