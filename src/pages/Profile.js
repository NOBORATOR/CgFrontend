import React, { useEffect, useState } from "react";
import { Avatar } from "@nextui-org/react";
import axios from "axios";
import { Squad } from "../modals/Squad";
import { UpdateIdPass } from "../modals/UpdateIdPass";
import { UpdatePlayerDetails } from "../modals/UpdatePlayerdetails";
import {Card, CardHeader, CardBody, CardFooter, Button, Snippet, Link} from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";


export function Profile(){
    const [name,setName] = useState("");
    const [data,setData] = useState({});
    const [error,setError] = useState("");
    const [loading,setLoading] =useState(1);
    const nav = useNavigate();
    const {isAuthenticated}=useAuth();
    
    

    useEffect(() => {
       
        async function fet(){
          
          try{

            const token = await axios.post('https://cgbackend.onrender.com/api/v1/auth',{},{withCredentials: true});
            setData(token.data);
            // console.log("DATA" , data);
         
           
          }
          catch(e){
            setError(e?.response?.data?.message);
          }
          
        }
        fet();
        // } 
      }, []);

      if(!isAuthenticated){
        nav('/login',{ replace: true });
      }
    
    return(
        <div className="w-[100%] flex flex-col mt-6" >
          <div className="m-auto flex flex-col gap-6 ">
            <Card className="w-[340px]" >
                      <CardHeader className="justify-between">
                        <div className="flex gap-5">
                          <Avatar isBordered radius="full" size="md" src={data?.data?.image} />
                          <div className="flex flex-col gap-1 items-start justify-center">
                            <h4 className="text-small  leading-none text-default-600 font-bold">{data?.data?.in_game_name}</h4>
                            {/* <Snippet className="text-small  leading-none text-default-600 font-bold" variant="solid" color="primary">npm install @nextui-org/react</Snippet> */}
                            <h5 className="text-small tracking-tight text-default-400">UID :- {data?.data?.user_id}</h5>
                          </div>
                        </div>
                        

                      </CardHeader>

                      <CardBody className="px-3 py-0 text-tiny text-black w-[100%]">
                        <div className="flex justify-center flex-col">
                            <p className="font-semibold m-2">
                              PLAYER DETAILS
                            </p>
                            <hr/>
                            <div className="m-2">
                                <div>MATCHES :- {data?.data?.playerdetail?.matches_played}</div>
                                <div>KILL :- {data?.data?.playerdetail?.kill}</div>
                                <div>KD :- {data?.data?.playerdetail?.kd}</div>
                                <div>TOTAL WIN :- {data?.data?.playerdetail?.total_win}</div>
                            </div>
                        </div>

                      </CardBody>
                      <CardFooter className="gap-3 ">
                        <div className="flex gap-2 justify-center text-green-700" >
                  
                            <Snippet hideSymbol={true} size="sm">{data?.data?.user_id}</Snippet>
                        </div>
                        
                      </CardFooter>
            </Card>

            {/* <Avatar src={data?.data?.image}/> */}

        
            <Squad className="bg-blue-500"></Squad>
            <UpdatePlayerDetails className="bg-black"></UpdatePlayerDetails>
            </div>
        </div>
    )
}
