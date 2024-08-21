import React from "react";
import { useState,useEffect } from "react";
import axios from "axios";
import {toast,Toaster}from "react-hot-toast";
import {Card, CardHeader, CardBody, CardFooter, Avatar, Button} from "@nextui-org/react";
import { UpdatePlayerDetails } from "../modals/UpdatePlayerdetails";
import { useAuth } from "../context/AuthContext";
import { PlayersSkeleton } from "../skeleton/PlayerDetailsSkeleton";
import { PlayerNav } from "../pageComponent/PlayerNav";

// import toast from "react-hot-toast";
export function Players(){
    const [player,setplayer] = useState([]);
    const [loading,setLoading] =useState(1);
    // const [disabledButtons, setDisabledButtons] = useState([]);
    const {isAuthenticated}=useAuth();

    // const [isFollowed, setIsFollowed] = React.useState(false);
    useEffect(()=>{
        // console.log(params.id)
            async function getallPlayer(){
                try{
                  
                    const response = await axios.get(`https://cgbackend.onrender.com/api/v1/getAllPlayer`);
                    // response.data.data.
                    const pl = response?.data?.data;
                    pl.map((data)=>{
                        if(data.user_obj_id){
                            player.push(data);
                        }
                    })
                    setLoading(false);
                    console.log("Player",player)
                    setLoading(0);
                    // console.log(squad?.data?.data?.user_obj_id?._id,"THIS",obj_id );
                }
                catch(e){
                    console.log(e);
                    // console.log(e?.response?.data)
                    if(e?.response?.data?.message){
                        toast.error(e.response.data.message);
                    }
                    else{
                        toast.error(e.message);
                    }
                    
                }
            }
            
            getallPlayer();
    },[])


    // async function sendRequest(id,index){
    //     // console.log(id);
    //     setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, index]);
    //     try{

    //         const res = await axios.post(`https://cgbackend.onrender.com/api/v1/send/${id}`,{},{withCredentials:true});
    //         console.log(res)
            
    //         if(res?.data?.success){
    //             toast.success("Request Sent");
                
    //         }
            
            
    //     }
    //     catch(e){
    //         console.log(e)
    //         setDisabledButtons((prevDisabledButtons) =>
    //             prevDisabledButtons.filter((btnIndex) => btnIndex !== index)
    //         );

    //         // console.log(e);
    //         if(e?.response?.data?.message){
    //             toast.error(e?.response?.data?.message)
    //         }
    //         else{
    //             toast.error(e.message);
    //         }
            
    //     }
    // }

    if(loading){
        return(
            <PlayersSkeleton></PlayersSkeleton>
        )
    }
   
    return (

        <div className="w-[100vw] h-[100vh] mt-4">
            { isAuthenticated &&    
                <UpdatePlayerDetails ></UpdatePlayerDetails>
            }
            <div className="flex flex-row max-w-[800px] justify-center flex-wrap gap-20 m-auto"><PlayerNav player={player}></PlayerNav></div>
        </div>

        

        // <div className="w-[100vw] h-[100vh] mt-4">
            // { isAuthenticated &&
           
            //     <UpdatePlayerDetails ></UpdatePlayerDetails>
            // }
        //     <div className="flex flex-row max-w-[800px] justify-center flex-wrap gap-20 m-auto">
        //     {
        //         player.map((item,index)=>(
        //             (
        //             <Card className="w-[340px]" key={index}>
        //               <CardHeader className="justify-between">
        //                 <div className="flex gap-5">
        //                   <Avatar isBordered radius="full" size="md" src={item?.user_obj_id?.image} />
        //                   <div className="flex flex-col gap-1 items-start justify-center">
        //                     <h4 className="text-small  leading-none text-default-600 font-bold">{item?.user_obj_id?.in_game_name}</h4>
        //                     {/* <Snippet className="text-small  leading-none text-default-600 font-bold" variant="solid" color="primary">npm install @nextui-org/react</Snippet> */}
        //                     <h5 className="text-small tracking-tight text-default-400">UID :- {item?.user_obj_id?.user_id}</h5>
        //                   </div>
        //                 </div>
        //                 <Button
        //                   className={"bg-black text-white" }
        //                   color="primary"
        //                   radius="full"
        //                   size="sm"
        //                   variant={ "bordered" }
        //                   onPress={() => sendRequest(item?.user_obj_id?._id,index)}
        //                   isDisabled = {disabledButtons.includes(index)}
        //                 >
        //                   Send request
        //                 </Button>

        //               </CardHeader>

        //               <CardBody className="px-3 py-0 text-tiny text-black w-[100%]">
        //                 <div className="flex justify-center flex-col">
        //                     <p className="font-semibold m-2">
        //                       PLAYER DETAILS
        //                     </p>
        //                     <hr/>
        //                     <div className="m-2">
        //                         <div>MATCHES :- {item?.matches_played}</div>
        //                         <div>KILL :- {item?.kill}</div>
        //                         <div>KD :- {item?.kd}</div>
        //                         <div>TOTAL WIN :- {item?.win}</div>
        //                     </div>
        //                 </div>

        //               </CardBody>
        //               <CardFooter className="gap-3 ">
        //                 <div className="flex gap-1 text-green-700" >
        //                   <p className="font-semibold  text-small">Tournaments Played :- </p>
        //                   <p className=" text-small">{item?.user_obj_id?.game_played?.length}</p>
        //                 </div>
        //                 {/* <div className="flex gap-1">
        //                   <p className="font-semibold text-default-400 text-small">97.1K</p>
        //                   <p className="text-default-400 text-small">Followers</p>
        //                 </div> */}
        //               </CardFooter>
        //             </Card>
        //             )
        //         ))
        //     }
        //     </div>
        
        // <Toaster></Toaster>
        // </div>
    )
    
}
