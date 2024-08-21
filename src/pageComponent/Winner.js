import React, { useState } from "react";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Progress } from "@nextui-org/react";


//winner design is remaining

export function Winner(){
    const [winner,setWinner] = useState("");
    const [loading,setLoading] =useState(1);
    const params = useParams();
    useEffect(()=>{
        // console.log(params.id)
            async function getPlayer(){
                try{
                    const id = params.id;
                    const response = await axios.get(`https://cgbackend.onrender.com/api/v1/getOne/${id}`, {},{withCredentials : true});
                  
                    setWinner(response.data?.data?.winner?.in_game_name);
                    setLoading(false);
                    // console.log("WINNER" ,winner)
                    // console.log(squad?.data?.data?.user_obj_id?._id,"THIS",obj_id );
                }
                catch(e){
                    // console.log(e);
                    // console.log(e?.response?.data)
                    if(e?.response?.data?.message){
                        toast.error(e.response.data.message);
                    }
                    else{
                        toast.error(e.message);
                    }
                    
                }
            }
            
            getPlayer();
    },[params.id])


    if(loading){
        return(
          <div className="w-[100%] h-[100%] m-auto">
            <div className=" text-center ">
              <Progress
                size="sm"
                isIndeterminate
                aria-label="Loading..."
                className="max-w-md "
              />LOADING......
            </div>
          </div>
        )
    }

    if(winner && !loading){
        return(
            <div>
                {winner}
            </div>
        )
        
    }
    else{
        return(
        <div>
            Winner is not declared
        </div>
        )
    }
}
