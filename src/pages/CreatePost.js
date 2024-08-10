import React, { useEffect, useState } from "react"
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
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "../components/ui/select"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "../components/ui/popover"
import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "../components/ui/calendar"
import { cn } from "../lib/utils"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"

import { Progress } from "@nextui-org/react";
import { toast,Toaster } from "react-hot-toast";
import { Toast } from "@radix-ui/react-toast";
import { useAuth } from "../context/AuthContext";





export function CreatePost() {
    
//   const navigate = useNavigate();
//   function onc(data){
//     console.log(data);
//   }


    const [error,setError] = useState("");
    const [loading,setLoading] = useState(0);
    const {isAuthenticated} = useAuth();
    function refreshPage() {
      window.location.reload(true); // Set to true for a complete server refresh
    }
  
  function onSubmit(data){
    // console.log(
    // typeof data.tournament_name ,
    // typeof data.game_type,
    // typeof data.number_of_players ,
    // typeof data.group_type,
    // typeof data.last_date ,
    // typeof data.match_date ,
    // typeof data.img ,
    // typeof data.match_time ,
    // typeof data.link ,
    // typeof data.rule,
    // typeof data.price );
    setLoading(0);
    
    if(!isAuthenticated){
      toast.error("Login First");
      return;
    }
    
    
    // console.log("THIS IS DATA ",data);
    async function crepo(){
        
        
        try{
            const resp = axios.post('https://cgbackend.onrender.com/api/v1/createPost', {
                tournament_name : data.tournament_name,
                game_type : data.game_type,
                number_of_players : data.number_of_players,
                group_type : data.group_type,
                last_date : data.last_date,
                match_date : data.match_date,
                img : data.img,
                match_time : data.match_time,
                link : data.link,
                rule : data.rule,
                price : data.price,
                
              },{withCredentials:true});
            toast.success("SuccessFully created");
            refreshPage();

            // navigate("/tournament");
        }
        catch(e){
            
            toast.error(e.message);
            setError(e.message);
            // console.log(e);
        }
        setLoading(0);

        

    }
    crepo();

  }
  // const passwordSchema = z.string().min(8, { message: "Password must be at least 8 characters long" });
  const formSchema = z.object({

    tournament_name : z.string().min(2, { message: "Name should be more than 2 letter." }),

    game_type: z.enum(["FreeFire", "Pubg"]).refine((val) => val !== "", {
        message: "You must select a game choice",
    }),


    number_of_players: z.enum(["24", "48", "100"]).refine((val) => val !== "", {
        message: "You must select a player count",
    }),

    group_type: z.enum(["Solo", "Duo", "Squad"]).refine((val) => val !== "", {
        message: "You must select a group type",
    }),

    last_date : z.date({
        required_error: "A date of last date is required",
      }),
    match_date : z.date({
        required_error: "A date of Match day is required.",
      }),

    match_time : z.string().min(2,{message:"Time must be more than 2 character"}).max(8,{message:"Not more than 6 character"}),

    link : z.string().min(2,{message:"Link character should me more than 2"}),

    rule : z.string().min(10,{message:"Rule must be more than 10 character"}),

    price : z.number().nonnegative({ message: "User ID must be a non-negative number" }),

    // entryfee : z.string().refine((val) => !isNaN(Number(val)) && Number(val) >= 0, {
    //     message: "Price must be a positive number",
    //   }).default(0),


  })
  .refine((data) => data.last_date <= data.match_date, {
    message: "Last date must be After the match date",
    path: ["match_date"],
  });
  // ...
  const form = useForm({
    resolver: zodResolver(formSchema),
    // defaultValues: { user_id: 0 },
  });

  if(loading){
    return(
        <div className="w-[100%]">
            <Progress 
              size="sm"
              isIndeterminate
              aria-label="Loading..."
              className="max-w-md m-auto"
            />
            <Toaster></Toaster>
        </div>
    )
  }

  if(error){
    return(
        <div>
            <div>error</div>
            <Toaster></Toaster>
        </div>
    )

  }
  return (
    <div className="w-[90%] ml-4 ">
        <h1 className="font-bold text-lg text-center m-2">FILL FORM</h1>
        <div className="m-auto max-w-[800px] ">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        
        {/* Tournament Name*/}
        <FormField
          control={form.control}
          name="tournament_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tournament Name</FormLabel>
              <FormControl>
                <Input placeholder={"Enter Tournament Name"} {...field} className="" />
              </FormControl>
              <FormDescription>
                Enter Tournament Name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Select game type */}
        <FormField
          control={form.control}
          name="game_type"
          render={({ field }) => (
            <FormItem>
                  <FormLabel>Game Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a Game Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="FreeFire">Free Fire</SelectItem>
                      <SelectItem value="Pubg">BGMI</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Group Type Like free fire or BGMI{" "}
                  </FormDescription>
                  <FormMessage />
            </FormItem>
            )}
        />




        {/* select number of players */}
        <FormField
          control={form.control}
          name="number_of_players"
          render={({ field }) => (
            <FormItem>
                  <FormLabel>Number of Players</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Number of Players" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="24">24</SelectItem>
                      <SelectItem value="48">48</SelectItem>
                      <SelectItem value="100">100</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    24 ,49,100 Players{" "}
                  </FormDescription>
                  <FormMessage />
            </FormItem>
            )}
        />


        {/* select group type */}

        <FormField
          control={form.control}
          name="group_type"
          render={({ field }) => (
            <FormItem>
                  <FormLabel>Group Type</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select Group Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Solo">Solo</SelectItem>
                      <SelectItem value="Duo">Duo</SelectItem>
                      <SelectItem value="Squad">Squad</SelectItem>
                    </SelectContent>
                  </Select>

                  <FormDescription>
                    Select From Solo Duo And Squad{" "}
                  </FormDescription>
                  <FormMessage />
            </FormItem>
            )}
        />


        {/* last_date */}

        <FormField
          control={form.control}
          name="last_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Last Date Of Registeration</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() 
                    }
                    // onChange = {()=>{onc(field.value)}}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Fill The last date to register the form
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />


        {/* match_data */}

        <FormField
          control={form.control}
          name="match_date"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Match Date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-[240px] pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value ? (
                        format(field.value, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={field.value}
                    onSelect={field.onChange}
                    disabled={(date) =>
                      date < new Date() 
                    }
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Fill The last date to register the form
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Time */}

        <FormField
          control={form.control}
          name="match_time"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Match Time</FormLabel>
              <FormControl>
                <Input placeholder={"Time"} {...field} className="" />
              </FormControl>
              <FormDescription>
                Format 04:30 PM or 05:10 AM
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* Link */}
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>YT CHANNEL LINK</FormLabel>
              <FormControl>
                <Input placeholder={"Link"} {...field} className="" />
              </FormControl>
              <FormDescription>
                Format 04:30 PM or 05:10 AM
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* rule */}

        <FormField
          control={form.control}
          name="rule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule</FormLabel>
              <FormControl>
              <Textarea
                  placeholder="SPECIFY RULE"
                  className="resize-none"
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Rules like violation ,cheating etc
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* price */}
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number"  placeholder={"Price"} {...field} value={field.value ?? ""}
                onChange={(e) => {
                  const value = e.target.value;
                  field.onChange(value ? Number(value) : undefined);
                }}/>
              </FormControl>
              <FormDescription>
                Enter price which you have to give to winner *(IN RS)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* entryFee */}
        {/* <FormField
          control={form.control}
          name="entryFee"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Entry Fee</FormLabel>
              <FormControl>
                <Input placeholder={"Enter entry fee"} {...field} className="" />
              </FormControl>
              <FormDescription>
                Format 04:30 PM or 05:10 AM
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        /> */}






        <Button type="submit">Submit</Button>
      </form>
      <Toaster></Toaster>
    </Form>

    </div>


    </div>
  )
}
