import React, { useState } from "react"
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
import toast,{Toaster} from "react-hot-toast";



// function onSubmit(data){
//   // <Navigate to="/login" />
//   navigate('/login',{replace : true});
//   console.log(data)
//   // axios.post('https://cgbackend.onrender.com/api/v1/register', {
//   //   email : data.email,
//   //   password : data.password,
//   //   confirmPassword : data.confirmPassword,
//   //   user_id : data.user_id,
//   //   game_id : data.game_id,
//   //   ingame_name : data.ingame_name,
//   //   // otp : 145
//   // })
//   // .then(function (response) {
//   //   if(response.status==200){
//   //     console.log(response);
      
//   //   }
//   //   // else{

//   //   // }
    
//   // })
//   // .catch(function (error) {
//   //   console.log(error);
//   // });
// }

export function Register({email}) {
  const navigate = useNavigate();
  const [loading,setLoading] = useState(0);

  async function onSubmit(data){
    // <Navigate to="/login" />
    setLoading(1);
    try{
      const response = await axios.post('https://cgbackend.onrender.com/api/v1/register', {
        email : data.email,
        password : data.password,
        confirmPassword : data.confirmPassword,
        user_id : data.user_id,
        game_id : data.game_id,
        ingame_name : data.ingame_name,
        // otp : 145
      });
      toast.success("REGISTERED SUCCESSFULLY")
      navigate('/login',{replace : true});


    }
    catch(e){
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
    
    // console.log(data)
    // axios.post('https://cgbackend.onrender.com/api/v1/register', {
    //   email : data.email,
    //   password : data.password,
    //   confirmPassword : data.confirmPassword,
    //   user_id : data.user_id,
    //   game_id : data.game_id,
    //   ingame_name : data.ingame_name,
    //   // otp : 145
    // })
    // .then(function (response) {
    //   if(response.status==200){
    //     console.log(response);
    //     toast.success("REGISTERED SUCCESSFULLY")
    //     navigate('/login',{replace : true});
    //   }
    //   // else{
  
    //   // }
      
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  }
  // const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters long" });
  const formSchema = z.object({

    email: z.string().min(1, { message: "This field has to be filled." }).email("This is not a valid email.").default(email),

    password: z.string().min(8, { message: "Password must be at least 8 characters long" }),

    confirmPassword: z.string(),

    user_id: z.number().nonnegative({ message: "User ID must be a non-negative number" }),

    game_id: z.number().nonnegative({ message: "User ID must be a non-negative number" }),

    ingame_name : z.string().min(2,{message:"User name must be more than 2 character"})

  }).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        path: ['confirmPassword'],
        message: "Passwords don't match",
      });
    }
    
  
  })
  // ...
  const form = useForm({
    resolver: zodResolver(formSchema),
    // defaultValues: { user_id: 0 },
  });

  if(loading){
    return(
      <div>
        Loading
      </div>
    )
  }
  return (

    <div className="w-[100vw]">
      <div className="m-auto max-w-[600px]">
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
                    <Input disabled defaultValue={email} placeholder={email} {...field} className="placeholder:text-black font-bold " />
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

            {/* confirmPassword */}
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Confirm Password" {...field}  />
                  </FormControl>
                  <FormDescription>
                    Enter Confirm Password
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* user_id
            In this case we have used onchange field which converts string to number */}
            <FormField
              control={form.control}
              name="user_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UNIQUE NUMBER</FormLabel>
                  <FormControl>
                    <Input type = "number" min = {100}placeholder="User ID" {...field} value={field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? Number(value) : undefined);
                    }} />
                    {/* For converting string to number */}
                  </FormControl>
                  <FormDescription>
                    Enter any number
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            
          {/* gamie_id */}
          <FormField
              control={form.control}
              name="game_id"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>InGame UID</FormLabel>
                  <FormControl>
                    <Input placeholder="Game Id" {...field} value = {field.value ?? ""}
                    onChange={(e) => {
                      const value = e.target.value;
                      field.onChange(value ? Number(value) : undefined);
                    }} />
                  </FormControl>
                  <FormDescription>
                    Your Game UID (eg. 446262751)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

          {/* ingame_name */}
          <FormField
              control={form.control}
              name="ingame_name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ingame Name</FormLabel>
                  <FormControl>
                    <Input  placeholder="Ingame_name" {...field} />
                  </FormControl>
                  <FormDescription>
                    Your Ingame Name (eg. NOBORATOR)
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            
            <Button type="submit">Submit</Button>
          </form>
        </Form>
      </div>
      <Toaster></Toaster>
    </div>
  )
}
