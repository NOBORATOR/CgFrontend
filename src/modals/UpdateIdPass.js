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



export function UpdateIdPass({id}){
    const {isAuthenticated} = useAuth();
    const [error,setError] = useState("");
    const [formValues, setFormValues] = useState({
        id: "",
        pass: "",
    });
    console.log(id);

    async function updateDataIdPass(){
        try {
            console.log("FORM VALUES " , formValues)
            const response = await axios.post(`https://cgbackend.onrender.com/api/v1/createIdPass/${id}`, formValues,{withCredentials : true});
            toast.success("SuccessFull Updated");
        } catch (error) {
            console.error('Error submitting form:', error);
            console.log(error.response.data.message)

            if(error?.response?.data?.mesage){
                setError(error.response.data.mesage);
                toast.error(error.response.data.mesage);
                // return;
            }
            else{
                setError(error);
                toast.error(error.message);
            }

        }
    }

    // useEffect(()=>{
    //     async function callIdPass(){
    //         try {
    //             // console.log(formValues);
    //             const response = await axios.post(`https://cgbackend.onrender.com/api/v1/createIdPass/${id}`,{},{withCredentials: true});
    
    //             setFormValues(prevFormValues => ({
    //               ...prevFormValues,
    //                 id: response.data.data.id,
    //                 pass: response.data.data.pass,
                 
    //             }));
                
    //             // console.log("FORM VALUES " ,formValues);
    //         } catch (error) {
    //             console.error('Error submitting form:', error);
    //             setError(error);
    //         }
    //     }
    //     callIdPass();
    // },[])

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        // console.log(name,value)
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };

    return(
        <>
      { isAuthenticated && <Dialog defaultOpen={false}>
        <DialogTrigger className="w-[100%]">
          <Button variant="outline" className="w-[100%]">Upload Custom Id Pass</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">

          <DialogHeader>
            <DialogTitle>Edit ID PASS</DialogTitle>
            <DialogDescription>
              Enter Id Pass of Custom room
            </DialogDescription>
          </DialogHeader>
          {
              error &&
              <div className="text-center">{error?.response?.data?.message}</div>
          }
          {!error && <div>  
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="id" className="text-right">
                    CUSTOM ID
                  </Label>
                  <Input
                    
                    id="id"
                    name="id"
                    defaultValue= {formValues.id}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>

          



              <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="pass" className="text-right">
                    CUSTOM PASS
                  </Label>
                  <Input
                    id="pass"
                    name="pass"

                    value={formValues.pass}
                    className="col-span-3"
                    onChange = {handleInputChange}
                  />
              </div>


            


          </div>
          
          <DialogFooter>
            <Button type="submit" onClick={updateDataIdPass} >Save changes</Button>
          </DialogFooter>
      </div>}
        </DialogContent>
          
      </Dialog> }
    <Toaster />
    </>
    )
}