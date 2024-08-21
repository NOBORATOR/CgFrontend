
import { useParams } from "react-router-dom";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Template } from "../pageComponent/Tournamentcard";
import { TournamentSkeleton } from "../pageComponent/TournamentSkeleton";
import { TournamentOne } from "../pageComponent/TournamentOne";

export function OneTournament(){
    const {id} =useParams();
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
          const response = await axios(`https://cgbackend.onrender.com/api/v1/getOne/${id}`);
          setData(response.data);
          setLoading(false);
          // console.log(response.data.data);
        } catch (e) {
          // console.log(e);
          setError(e);
          setLoading(false);
        }
      }
      getTournament();
    }, []);
  
    if (loading) {
      return (
          <div className=" flex justify-center">
          
          </div>
      );
    }
    if (error) {
      return <div className="flex justify-center text-red-600">Error: {error.message}</div>;
    }
  
    return (
      <div className="flex">
            <TournamentOne data={data.data}></TournamentOne>
      </div>
    );
}
