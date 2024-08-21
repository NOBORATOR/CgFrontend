import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Template } from "../pageComponent/Tournamentcard";
import { TournamentSkeleton } from "../pageComponent/TournamentSkeleton";
import { useAuth } from "../context/AuthContext";

export function MyMatches(){
    const {isAuthenticated}=useAuth();
    const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
    // Convert UTC date to IST
    const convertToIST = (date) => {
        const options = {
          timeZone: "Asia/Kolkata",
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        };
        return new Intl.DateTimeFormat('en-US', options).format(new Date(date));
      };

  useEffect(() => {
    async function getTournament() {
      try {
        const response = await axios("https://cgbackend.onrender.com/api/v1/mymatches",{withCredentials:true});
        setData(response.data.data.game_played);
        setLoading(false);
        // console.log(response.data.data.game_played)
      } catch (e) {
        // console.log(e);
        setError(e);
        setLoading(false);
      }
    }
    getTournament();
  }, []);
  if(!isAuthenticated){
    navigate('/login', { replace: true }); 
  }

  if (loading) {
    return (
        <div className=" flex justify-center">
            <div className="flex flex-row flex-wrap gap-12 max-w-[800px] m-10 justify-center">
                {
                    [1,2,3,4,5,6,7,8,9,10,11,12].map((d)=>
                        (
                            <TournamentSkeleton></TournamentSkeleton>
                        )
                    )
                }

            </div>
        </div>
    );
  }
  if (error) {
    return <div className="flex justify-center">Error: {error.message}</div>;
  }

  return (
    <div className="flex justify-center">
      <div className="flex flex-row flex-wrap gap-12 max-w-[800px] m-10 justify-center">
        {data.map((d) => (
          
            <div key={d._id}>
              <Template id = {d._id} date={convertToIST(d.match_date)} name = {d.tournament_name} price={d.price} type={d.game_type} className={`${d.winner?"hidden":""} ${new Date(d.match_date)<=new Date(Date.now()) ? "hidden":""}`}/>
            </div>
          
        ))}
        {/* {
          data.map((d,index)=>{
            // console.log("TRUE OR FALSE",Date.now()<(new Date(d.last_date).getTime()), Date.now(),(new Date(d.last_date).getTime()));
            return(
              // ${d.winner?"hidden":""}
              
              
              <div key={d._id} className={`${d.winner?"hidden":""}`}>
                
              
                  <Template id = {d._id} date={convertToIST(d.match_date)} name = {d.tournament_name} price={d.price} />
              </div>
                
            )
          })
        } */}
      </div>
    </div>
  );
}
