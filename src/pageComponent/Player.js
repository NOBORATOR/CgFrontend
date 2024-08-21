import React from "react";
import {Accordion, AccordionItem, Button} from "@nextui-org/react";
import { useState,useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import { Progress } from "@nextui-org/react";
import { useAuth } from "../context/AuthContext";
import { Toaster } from "react-hot-toast";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableFooter,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "../components/ui/table"


export function Player() {
  const params = useParams();
  const [squads, setSquads] = useState([]);
  const [loading,setLoading] = useState(true);
  const {obj_id} = useAuth();
  const [winbtn , setwinbtn] = useState(0);
  const [winner,setw] = useState("");
 
   useEffect(()=>{
    // console.log(params.id)
        async function getPlayer(){
            try{
                const id = params.id;
                const squad = await axios.get(`https://cgbackend.onrender.com/api/v1/getOne/${id}`, {},{withCredentials : true});
              
                const sq = squad?.data?.data?.registered;
                sq.map(((prev)=>{
                   squads.push(prev);
                }))
                // console.log("SQUADS : ",squad.data.data);
                setLoading(false);
                // console.log(squad?.data?.data?.user_obj_id?._id,"THIS",obj_id );
                
                setw(squad?.data?.data?.winner?.in_game_name);
                if(squad?.data?.data?.user_obj_id?._id == obj_id){
                  // console.log("TREE")
                  // console.log(squad?.data?.data?._id,obj_id);
                  setwinbtn(1);
                }
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
   },[obj_id,params.id])

   async function setWinner(id){
    // console.log(id);
      try{
        const match_id = params.id
        // console.log("Match_id" , match_id)
        const response = await axios.post(`https://cgbackend.onrender.com/api/v1/announceWinner/${match_id}`, {winner_id : id},{withCredentials : true});
        // console.log(response)
        // console.log(response.data.message)

        toast.success(response?.data?.message);
      }
      catch(e){
        // toast.error(e.message);
        if(e?.response?.data?.message){
          toast.error(e?.response?.data?.message);
        }
        else{
          toast.error(e.message);
          
        }
      }
   }

  

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

  if(!loading){
    return(
      <div>
       
        {squads.map((squad, index) => (
          
          (<div key={squad._id} className="m-2">
              <Accordion >
                  <AccordionItem  aria-label="Player 1" title={squad?.in_game_name}>
                  <Table aria-label="" className="">
                  <TableHeader>
                    <TableColumn>Player 1</TableColumn>
                    <TableColumn>Player 2</TableColumn>
                    <TableColumn>Player 3</TableColumn>
                  </TableHeader>

                  <TableBody>
                    <TableRow key="1">
                      <TableCell>{squad?.squad?.player1_name}</TableCell>
                      <TableCell>{squad?.squad?.player2_name}</TableCell>
                      <TableCell>{squad?.squad?.player3_name}</TableCell>
                    </TableRow>
                  
                  
                  { winbtn && !winner &&
                    <TableRow key="2">
                      <TableCell aria-colspan={3} colSpan={3} className="w-[100%] "><Button className="bg-blue-700 w-[100%] text-white" onClick={()=>{setWinner(squad._id)}}>Winner</Button></TableCell>
                      {/* <TableCell>Technical Lead</TableCell>
                      <TableCell>Paused</TableCell> */}
                      <TableCell className="hidden"> </TableCell>
                      <TableCell className="hidden"> </TableCell>
                    </TableRow>
                  }
                  </TableBody>

                  
                  </Table>
                  </AccordionItem>
              </Accordion>
              
              

          </div>)
          
        ))}
        <Toaster />
      </div>
    );
  }

  
}
