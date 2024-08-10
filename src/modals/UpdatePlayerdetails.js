import React from "react";
import { Button } from "../components/ui/button"
import toast, { Toaster } from 'react-hot-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { useState,useEffect } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";
import { useParams } from "react-router-dom";
// import { autocomplete } from "@nextui-org/theme";
// import { toast } from "../components/ui/use-toast";


export function UpdatePlayerDetails() {
    const {isAuthenticated} = useAuth();
    const params = useParams();
    
    const [formValues, setFormValues] = useState({
        matches_played: 0,
        total_win: 0,
        kill: 0,
        kd:0
    });
    const [error,setError] = useState("");
    async function callDetails(){
        try {
            // console.log(formValues);
            const response = await axios.put(`https://cgbackend.onrender.com/api/v1/playerdetailupdate`,{},{withCredentials: true});
            
            // console.log("Response" , response);
            // setname(name.data.data.in_game_name);
            // console.log(name)

            setFormValues(prevFormValues => ({
              ...prevFormValues,
              matches_played: response?.data?.data?.matches_played,
              total_win: response?.data?.data?.total_win,
              kill : response?.data?.data?.kill,
              kd: response?.data?.data.kd
            }));
            
            
            // console.log("FORM VALUES " ,formValues);
        } catch (error) {
            // console.error('Error submitting form:', error);
            setError(error);
        }
    }
    async function setDetails(){
        try {
            const response = await axios.put(`https://cgbackend.onrender.com/api/v1/playerdetailupdate`, formValues,{withCredentials : true});
            
            toast.success("SuccessFull Updated");
        } catch (error) {
            console.log('Error submitting form:', error);
            if(error?.response?.data?.message){
              setError(error?.response?.data?.message);
              // toast.error(error.message);
            }
            else{
              setError(error);
            }
            
        }
    }

    useEffect(()=>{
        callDetails();
    },[params])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // console.log(name,value)
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };
    // const handleSubmit = () => {
        
    // };
  return (
    <>
      { isAuthenticated && <Dialog defaultOpen={false}>
        <DialogTrigger className="w-[100%] m-2" >
          <Button variant="outline" className="m-auto">Edit your details</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">

          <DialogHeader>
            <DialogTitle>EDIT YOUR DETAILS</DialogTitle>
            <DialogDescription>
              FILL IT CAREFULLY
            </DialogDescription>
          </DialogHeader>
          {
              error &&
              <div className="text-center">{error.message}</div>
          }
          {!error && <div>  
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="matches_played" className="text-right">
                    Matches Played
                  </Label>
                  <Input
                    id="matches_played"
                    name="matches_played"
                    defaultValue= {formValues.matches_played}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>

          



              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="total_win" className="text-right">
                    Win
                  </Label>
                  <Input
                    id="total_win"
                    name="total_win"

                    value={formValues.total_win}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kill" className="text-right">
                    Kill
                  </Label>
                  <Input
                    id="kill"
                    name="kill"
                    value={formValues.kill}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="kd" className="text-right">
                    Kd
                  </Label>
                  <Input
                    id="kd"
                    name="kd"
                    value={formValues.kd}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>


          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={setDetails} >Save changes</Button>
          </DialogFooter>
      </div>}
        </DialogContent>
          
      </Dialog> }
    <Toaster />
    </>
  )
}
