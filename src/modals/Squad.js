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
import { Load } from "../components/Load";
// import { toast } from "../components/ui/use-toast";


export function Squad() {
    const {isAuthenticated} = useAuth();
    const [name, setname] = useState();
    const [loading,setLoading] = useState();
    const [formValues, setFormValues] = useState({
        player1_name: '',
        player2_name: '',
        player3_name: '',
    });
    const [error,setError] = useState("");
    async function callSquad(){
        try {
            // console.log(formValues);
            const response = await axios.put(`https://cgbackend.onrender.com/api/v1/updateSquad`,{},{withCredentials: true});
            const name = await axios.post(`https://cgbackend.onrender.com/api/v1/auth`,{},{withCredentials: true})
            // console.log("Response" , response);
            setname(name.data.data.in_game_name);
            // console.log(name)

            setFormValues(prevFormValues => ({
              ...prevFormValues,
              player1_name: response.data.data.player1_name,
              player2_name: response.data.data.player2_name,
              player3_name: response.data.data.player3_name
            }));
            
            // console.log("FORM VALUES " ,formValues);
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error);
        }
    }
    async function callSquad1(){
      setLoading(1);
        try {
            const response = await axios.put(`https://cgbackend.onrender.com/api/v1/updateSquad`, formValues,{withCredentials : true});
            toast.success("SuccessFull Updated");
        } catch (error) {
            console.error('Error submitting form:', error);
            setError(error);
            toast.error(error.message);
        }
        finally{
          setLoading(0);
        }
      
    }

    useEffect(()=>{
        callSquad();
    },[])
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

    if(loading){
      console.log("LOADING");
      return(
        <div className="w-[100vw] h-[400px] flex m-auto">
        <div className="max-w-[600px] m-auto ">
          <Load></Load>
        </div>
        </div>
      )
  }
  return (
    <>
      { isAuthenticated && <Dialog defaultOpen={false}>
        <DialogTrigger className="w-[100%]">
          <Button variant="outline" className="w-[100%]">Edit Team</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">

          <DialogHeader>
            <DialogTitle>Edit Team</DialogTitle>
            <DialogDescription>
              For Squad You have to fill all team player name
            </DialogDescription>
          </DialogHeader>
          
          {
              error &&
              <div className="text-center">{error.message}</div>
          }
          {!error && <div>  
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="player0_name" className="text-right">
                    Player 1
                  </Label>
                  <Input
                    disabled
                    id="player0_name"
                    name="player0_name"
                    defaultValue= {name}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>

          



              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="player1_name" className="text-right">
                    Player 2
                  </Label>
                  <Input
                    id="player1_name"
                    name="player1_name"

                    value={formValues.player1_name}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="player2_name" className="text-right">
                    Player 3
                  </Label>
                  <Input
                    id="player2_name"
                    name="player2_name"
                    value={formValues.player2_name}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="player3_name" className="text-right">
                    Player 4
                  </Label>
                  <Input
                    id="player3_name"
                    name="player3_name"
                    value={formValues.player3_name}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>


          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={callSquad1} >Save changes</Button>
          </DialogFooter>
      </div>}
        </DialogContent>
          
      </Dialog> }
    <Toaster />
    </>
  )
}
