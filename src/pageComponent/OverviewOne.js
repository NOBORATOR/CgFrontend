import { Image } from "@nextui-org/react";
import React, { useEffect, useState } from "react";
import { Chip } from "@nextui-org/react";
import { Divider,Link } from "@nextui-org/react";
import { Button } from "../components/ui/button";
import { Squad } from "../modals/Squad";
import axios from "axios";
import { useParams } from "react-router-dom";
import toast ,{Toaster}from "react-hot-toast";
import { UpdateIdPass } from "../modals/UpdateIdPass";
import { useAuth } from "../context/AuthContext";
import {Snippet} from "@nextui-org/react";
import { Load } from "../components/Load";
export function Overview({data}){
    useEffect(()=>{
        // setExists(data.resgistered.some(allplayer => allplayer._id ===obj_id));
        const e = data.registered.filter(function(item) {
            return item["_id"] == obj_id;
       });
       // console.log("EXIST" ,e.length);

       setExists(e.length==true?true:false);
    },[])
    // console.log("REGISTERED :- ",data.registered);
    const params = useParams();
    const {obj_id} = useAuth();
    const [loading,setLoading] = useState();
    const [exists,setExists] = useState(false);
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

    
    // if(e)
    // console.log(data.img);
    async function Register(){
        setLoading(1);
        // console.log("REGISTER");
        try{
            const id = params.id;
            const reg =await axios.post(`https://cgbackend.onrender.com/api/v1/registerMatch/${id}`, {},{withCredentials : true});
            toast.success("REGISTER");
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
        finally{
            setLoading(0);
        }
    }
    if(loading){
        // console.log("LOADING");
        return(
          <div className="w-[100vw] h-[400px] flex m-auto">
          <div className="max-w-[600px] m-auto ">
            <Load></Load>
          </div>
          </div>
        )
    }
    return(
        <div className="max-w-[800px]">
            <Image 
                // isBlurred
                alt={data.game_type}
                className="object-cover"
                // height={200}
                src={data.img}
                width={600}
            />
            { data.id && data.pass && exists && 
                <div className="flex flex-col">
                    <span>Id :-</span>
                    <Snippet variant="solid" color="secondary">{data.id}</Snippet>
                    <span>Pass :-</span>
                    <Snippet variant="solid" color="secondary">{data.pass}</Snippet>
                </div>
            }
            <h1 className="font-bold m-2">{data.tournament_name}</h1>
            <div className="flex flex-wrap flex-row gap-2">
            {/* <div> */}
                <Chip variant="shadow" classNames={{base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30",content:"drop-shadow shadow-black text-white",}} className="p-1">{`Last Date to Register ${convertToIST(data.last_date)}`}</Chip>
            {/* </div> */}
            {/* <div> */}
                <Chip color="danger">{`Live from ${convertToIST(data.match_date)}`}</Chip>
            </div>

            
            <div className="my-4">
                <Divider className="my-4 " />
                <div className="flex h-5 items-center space-x-4 text-small">
                  <div><Chip color="warning" variant="shadow">{data.group_type}</Chip></div>
                  <Divider orientation="vertical" />
                  <div><Chip color="warning" variant="shadow">{data.number_of_players}</Chip></div>
                  <Divider orientation="vertical" />
                  <div><Chip color="warning" variant="shadow">{data.game_type}</Chip></div>
                  <Divider orientation="vertical" />
                  <Link isExternal href={data.link} showAnchorIcon className="text-blue-700 mt-1" color="primary">Youtube</Link>
                </div>
                <Divider className="my-4" />
                
            </div>
            
        <div className="flex gap-2 justify-evenly"> 
            <Chip color="danger">Time :- {data.match_time}</Chip>
            <Chip color="danger">REWARD :- RS {data.price}</Chip>
        </div>

        

        <div className="bg-gray-50 rounded">
            <div className="m-2 mt-3 font-bold text-black text-lg">{`Rule :-`}</div>
            <div className="m-2 ">{data.rule.split('\n').map((line, index) => (
                    <React.Fragment key={index}>
                        {line}
                        <br />
                    </React.Fragment>
                ))}</div>
        </div>

        { obj_id==data.user_obj_id._id && 

            <div className="w-[100%]"><UpdateIdPass id={params.id}></UpdateIdPass></div>

        }

        <div className="w-[100%]"><Squad></Squad></div>
    
        <Button className={`bg-blue-700 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-[100%] mt-2`} onClick={()=>{Register()}} >Register</Button>
        

            <Toaster />
           
        </div>
        
    )
}
