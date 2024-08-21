import React from "react"
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { Button } from "../components/ui/button"
import { useNavigate } from "react-router-dom";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import { Input } from "../components/ui/input"
import {useAuth} from "../context/AuthContext"
import { useState } from "react";
import { Progress } from "../components/ui/progress";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { Load } from "../components/Load";


export function Login(){
    const [loading,setLoading] = useState(false);
    const [error, seterror] = useState("");
    const navigate = useNavigate();
    axios.defaults.withCredentials =true;
    const {login} = useAuth();
    
    function onSubmit(data){
    
      setLoading(1);
      // console.log(data.email,data.password);
      axios.post('https://cgbackend.onrender.com/api/v1/login', {
        email : data.email,
        password : data.password,
      },{
        withCredentials: true, // Include cookies
      })
      .then(function (response) {
        
        if(response.status==200){
          login(1);
          toast.success("Logged in successfully")
          navigate('/',{replace : true});
        }
        else{
            // console.log(response.response.data)
        }
        
      })
      .catch(function (error) {
        setLoading(0);
        seterror(error);
      });
      // console.log("Error" , error);
      // console.log("loading" ,loading);
      setLoading(0);
    }

    const formSchema = z.object({
  
      email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email."),
  
      password: z.string().min(8, { message: "Password must be at least 8 characters long" }),
  
    })
      

    // 
    const form = useForm({
      resolver: zodResolver(formSchema),
    });

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


  if(error){
    return(
      <div>{error.message}</div>
    )
  }
  


    return (
      <div className="w-[100vw] h-[90vh] m-4">
        <div className="max-w-[600px] m-auto ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">

            {/* default mail which was sent by otp */}
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="email" {...field}/>
                  </FormControl>
                  <FormDescription>
                    Your mail
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Password */}
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Password" {...field} />
                  </FormControl>
                  <FormDescription>
                    Enter Password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            
            
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>

            {/* <Toaster></Toaster> */}
        </div>
      )
  
}



export default Login;
