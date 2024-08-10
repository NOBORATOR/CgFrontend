import React, { useEffect, useState } from "react";
import {Card, CardFooter, Image, Button, Chip,Avatar,CardHeader, CardBody,} from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
// import { Avatar } from "@nextui-org/react";


export function Template({id,date,name,price,type}) {

    const navigate = useNavigate();
    const [img,setImg] = useState("");
    useEffect(()=>{
      if(type=="FreeFire"){
        setImg("https://4.bp.blogspot.com/-oBNm-qVsL0Q/Xap-M-9gerI/AAAAAAAABhE/k6qevOl1c3Uq6sNDw_k-j82R7Gtc_GoMQCK4BGAYYCw/w680/free%2Bfire%2Bmod%2Bapk.jpg")
      }
      else{
        setImg("https://th.bing.com/th/id/OIP.vXq8rCZM-kqiIaZI-mwMLQAAAA?w=340&h=400&rs=1&pid=ImgDetMain");
      }
      
    },[])
    // console.log(name);
  return (
    <div className="w-[200px]">
        {/* <Chip >{name}</Chip> */}
        

        <Card
          isFooterBlurred
          radius="lg"
          className="border-none"
        >
          <Image
            alt="FREE FIRE"
            className="w-[100vw] object-cover h-[300px]"
            // src="https://4.bp.blogspot.com/-oBNm-qVsL0Q/Xap-M-9gerI/AAAAAAAABhE/k6qevOl1c3Uq6sNDw_k-j82R7Gtc_GoMQCK4BGAYYCw/w680/free%2Bfire%2Bmod%2Bapk.jpg"
            // src="https://wallpapercave.com/wp/wp9427705.jpg"
            src={img}
            // classNames={"w-[200px]"}
            
          />
          <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
            <p className="text-tiny text-white/80">{date}</p>
            <Button className="text-tiny text-white  bg-black/20" variant="flat" color="default" radius="lg" size="sm" onClick={()=>{navigate(`/tournament/${id}`)}}>
              View
            </Button>
          </CardFooter>
        </Card>
{/* 
        <div className="flex align-middle jus">
        <Avatar src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`}></Avatar>
        <Chip color="warning" className="m-auto">{price}</Chip>
        </div> */}

        <Card className="w-[200px]" >
            <CardHeader className="justify-between">
              <div className="flex gap-5">
                <Avatar isBordered radius="full" size="md" src={`https://api.dicebear.com/5.x/initials/svg?seed=${name}`} />
                <div className="flex flex-col gap-1 items-start justify-center">
                  <h4 className="text-small  leading-none text-default-600 font-bold">{name}</h4>
                  {/* <Snippet className="text-small  leading-none text-default-600 font-bold" variant="solid" color="primary">npm install @nextui-org/react</Snippet> */}
                  {/* <h5 className="text-small tracking-tight text-default-400">UID :- {item?.user_obj_id?.user_id}</h5> */}
                </div>
              </div>
              
            </CardHeader>
            <CardBody className="px-3 py-0 text-tiny text-black w-[100%]">
              <div className="flex justify-center flex-col">
                  <p className="font-semibold m-2">
                    {`PRICE :- ${price}`}
                  </p>
                  {/* <hr/>
                  <div className="m-2">
                      {}
                  </div> */}
              </div>
            </CardBody>
                    
        </Card>
    </div>
  );
}
