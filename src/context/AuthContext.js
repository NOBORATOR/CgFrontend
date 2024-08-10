import React, { createContext, useState, useContext, useEffect } from 'react';
// import Cookies from 'js-cookie';
import axios from 'axios';


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [obj_id , setObj_id] = useState("");
  // const [playerdetails,setPlayerdetails] = useState({matches_played :0,total_win:0,kill:0,kd:0,});
  // const [statistic,setStatistic] = useState({total_matches:0,win:0});
  // const [playerdetails, setPlayerdetails] = useState({
  //   matches_played: "",
  //   total_win: "",
  //   kill: "",
  //   kd: "",
  // });




  useEffect(() => {
    // const token = localStorage.getItem("token") ? JSON.parse(localStorage.getItem("token")) : null
    // const user = localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;
   
    async function fet(){
      try{
        const token = await axios.post('https://cgbackend.onrender.com/api/v1/auth',{},{withCredentials: true});
        setIsAuthenticated(1);
        // console.log(token);
        const id = token?.data?.data?._id;
        setObj_id(id);
        return token;
        
       
      }
      catch(e){
        setIsAuthenticated(false);
        console.log(e);
        return null;
      }
      
    }
    fet();
    // } 
  }, []);

  useEffect(()=>{
    console.log(obj_id);
  },[obj_id])


  const login = (authToken) => {
    // Cookies.set('token', authToken, { expires: 7 });
    setIsAuthenticated(true);
  };

  const logout = () => {
    // Cookies.remove('token');
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout,obj_id }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
