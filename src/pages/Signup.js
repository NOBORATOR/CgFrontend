import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "../components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import { Input } from "../components/ui/input";
import axios from "axios";
import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { Otp } from "./Otp";
import { Progress } from "../components/ui/progress"
import { Toaster } from "react-hot-toast";
import { Link } from "@nextui-org/react";
import { Load } from "../components/Load";
import {toast}from "react-hot-toast";
const formSchema = z.object({
  // username: z.string().min(2, {
  //   message: "Enter valid email",
  // }),
  emails: z
    .string()
    .min(1, { message: "This field has to be filled." })
    .email("This is not a valid email.")

});


export function Signup() {
  const nav = useNavigate()
  const form = useForm({
    resolver: zodResolver(formSchema),
  });

  const [st, sthandler] = useState(1);
  const [em, stem] = useState("");
  const [lo, stlo] = useState(0);
  const [ot, stot] = useState(false);

  function onSubmit(data) {
    stlo(1);
    sthandler(0);

    axios.post('https://cgbackend.onrender.com/api/v1/sendOtpRouter', {
      email: data.emails
    })
      .then(function (response) {
        if (response.status == 200) {
          console.log(response);
          stem(data.emails);
          // sthandler(false);
        }
        stlo(0);
        stot(1);


      })
      .catch(function (error) {
        stlo(0);
        sthandler(1);
        console.log(error);
        // toast.error(error.message);
        toast.error(error?.response?.data?.message);
        
      });
    stlo(0);
  }

  if(lo===1){
    return(
      <div>Load</div>
    )
  }

  return (
    <div className="w-[100vw]">
      {

        ot === 1 &&
        (
          <div className="w-[100vw]">
            <div className="m-auto">
              <Otp email={em}></Otp>
            </div>
          </div>
        )

      }
      {st === 1 &&

        (
          <div className="w-[100vw]">
            <div className="max-w-[800px] m-auto">

              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <FormField
                    control={form.control}
                    name="emails"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input placeholder="email" {...field} />
                        </FormControl>
                        <FormDescription>
                          This mail will recieve an otp
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  
                  <Button type="submit">Submit</Button>
                </form>
              </Form>
              <div className="text-blue-300 text-tiny m-2">
                <button onClick={()=>{nav("/login")}}>Already Signup? Click Here to Login</button>
            </div>
            </div>
            

          </div>
        )
      }
      <Toaster></Toaster>


    </div>
  );
}
