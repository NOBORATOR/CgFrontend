import React from "react"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import { Button } from "../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "../components/ui/input-otp"
import axios from "axios"
import { Register } from "./Register"
import toast from "react-hot-toast"
import { Toaster } from "react-hot-toast"
import { Load } from "../components/Load"




const FormSchema = z.object({
  pin: z.string().min(6, {
    message: "Your one-time password must be 6 characters.",
  }),
})

export function Otp({email}) {
  // const { toast } = useToast()
  const [ot,stot] = useState(1);
  const [loading,setLoading] = useState(0);
  const [error , setError] = useState("");
  const form = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      pin: "",
    }
  })

  async function onSubmit(data) {
    setLoading(1);
    console.log(email,data.pin);

    try{ 
      
      const response = await axios.post('https://cgbackend.onrender.com/api/v1/verifyOtp', {
        email : email,
        otp : data.pin
      })
      console.log("RESPONSE" ,response);
      toast.success("SUCCESSFULLY MATCHED");
      stot(0);
      setLoading(0);
    }
    catch(e){
      console.log(e.response.data.message);
      if(e?.response?.data?.message){
        toast.error(e?.response?.data?.message)
      }
      else{
        toast.error(e.message);
      }
      // console.log(e);

    }
      setLoading(0);
  }

  if(loading){
    return(
      <div className="w-[100vw] h-[400px] flex m-auto">
        <div className="max-w-[600px] m-auto ">
          <Load></Load>
        </div>
        </div>
    )
  }



  return (
    <div className="w-[100vw] flex m-6">
    
      { ot===1 &&
        (
        <div className="m-auto">
        <Form {...form} >
          <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
            <FormField
              control={form.control}
              name="pin"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>One-Time Password</FormLabel>
                  <FormControl>
                    <InputOTP maxLength={6} {...field}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </FormControl>
                  <FormDescription>
                    Please enter the one-time password sent to your phone.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            
            <Button type="submit">Submit</Button>
          </form>
        </Form>
        </div>
        )

      }
      {
        ot===0 && 
        (
          <Register email = {email}></Register>
        )

      }

      <Toaster></Toaster>
    </div>
  )
}
