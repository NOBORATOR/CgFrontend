import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast, Toaster } from "react-hot-toast";
import { Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";
import { UpdatePlayerDetails } from "../modals/UpdatePlayerdetails";
import { useAuth } from "../context/AuthContext";
import { PlayersSkeleton } from "../skeleton/PlayerDetailsSkeleton";
import { PlayerNav } from "../pageComponent/PlayerNav";
import { useNavigate } from "react-router-dom";

// import toast from "react-hot-toast";
export function Request() {
    const [player, setplayer] = useState([]);
    const [loading, setLoading] = useState(1);
    const [disabledButtons, setDisabledButtons] = useState([]);
    const { isAuthenticated } = useAuth();
    const [empty, setEmpty] = useState(0);
    const navigate = useNavigate();

    // const [isFollowed, setIsFollowed] = React.useState(false);
    useEffect(() => {
        // console.log(params.id)
        async function getallPlayer() {
            try {

                const response = await axios.post(`https://cgbackend.onrender.com/api/v1/totalRequest`, {}, { withCredentials: true });
                // response.data.data.
                const pl = response?.data?.data?.user_details[0].request;
                // console.log("THIS IS DATA",pl)
                pl.map((data) => {
                    // console.log(data);
                    const d = data.sender_id;
                    d.status = data.status;
                    player.push(d);
                    // console.log(d);
                })
                setLoading(false);
                // console.log("TOTAL",player.length)
                setLoading(0);
                // console.log(squad?.data?.data?.user_obj_id?._id,"THIS",obj_id );
            }
            catch (e) {
                // console.log(e);
                // console.log(e?.response?.data)
                if (e?.response?.data?.message) {
                    toast.error(e.response.data.message);
                }
                else {
                    toast.error(e.message);
                }

            }
        }
        setLoading(false);

        getallPlayer();
        // console.log("DATA :-", player)
    }, [])


    async function rejectRequest(id, index) {
        // console.log(id);
        setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, index]);
        try {

            const res = await axios.post(`https://cgbackend.onrender.com/api/v1/reject/${id}`, {}, { withCredentials: true });
            // console.log("ACCEPT" , res);

            if (res?.data?.success) {
                toast.success("Rejected SuccessFully");
            }


        }
        catch (e) {
            // console.log(e)
            setDisabledButtons((prevDisabledButtons) =>
                prevDisabledButtons.filter((btnIndex) => btnIndex !== index)
            );

            // console.log(e);
            if (e?.response?.data?.message) {
                toast.error(e?.response?.data?.message)
            }
            else {
                toast.error(e.message);
            }

        }
    }
    async function acceptRequest(id, index) {

        // console.log("ID" ,id);
        setDisabledButtons((prevDisabledButtons) => [...prevDisabledButtons, index]);
        try {

            const res = await axios.post(`https://cgbackend.onrender.com/api/v1/accept/${id}`, {}, { withCredentials: true });
            // console.log("ACCEPT" , res);

            if (res?.data?.success) {
                toast.success("Accepted SuccessFully");
            }


        }
        catch (e) {
            // console.log(e);
            setLoading(false)
            setDisabledButtons((prevDisabledButtons) =>
                prevDisabledButtons.filter((btnIndex) => btnIndex !== index)
            );

            // console.log(e);
            if (e?.response?.data?.message) {
                toast.error(e?.response?.data?.message)
            }
            else {
                toast.error(e.message);
            }

        }
    }

    if (!isAuthenticated) {
        navigate('/login', { replace: true });
    }



    if (loading) {
        return (

            <PlayersSkeleton></PlayersSkeleton>
        )
    }

    if (empty === 0) {
        return (
            <div className="w-[100vw] h-[100vh] mt-4 flex flex-col">
                {isAuthenticated &&

                    <UpdatePlayerDetails ></UpdatePlayerDetails>
                }
                <div className="mx-auto font-extrabold text-[30px]">No request</div>
            </div>
        )
    }




    return (



        <div className="w-[100vw] h-[100vh] mt-4">
            {isAuthenticated &&

                <UpdatePlayerDetails ></UpdatePlayerDetails>
            }
            {
                player.length === 0 &&
                <div>No Request</div>
            }
            <div className="flex flex-row max-w-[800px] justify-center flex-wrap gap-20 m-auto">
                {
                    player.map((item, index) => (

                        // (
                        (item.status == "Pending" &&
                            <Card className="w-[340px]" key={index}>
                                <CardHeader className="justify-between">
                                    <div className="flex gap-5">
                                        <Avatar isBordered radius="full" size="md" src={item?.image} />
                                        <div className="flex flex-col gap-1 items-start justify-center">
                                            <h4 className="text-small  leading-none text-default-600 font-bold">{item?.in_game_name}</h4>
                                            {/* <Snippet className="text-small  leading-none text-default-600 font-bold" variant="solid" color="primary">npm install @nextui-org/react</Snippet> */}
                                            <h5 className="text-small tracking-tight text-default-400">UID :- {item?.user_id}</h5>
                                        </div>
                                    </div>
                                    <Button
                                        className={` text-white ${item.status === "Pending"} ? bg-yellow-500 text-black:"" ${item.status == "Rejected"}: bg-red-500 text-black`}
                                        //   color="primary"
                                        radius="full"
                                        size="sm"
                                        variant={"bordered"}
                                        //   onPress={() => sendRequest(item?._id,index)}
                                        isDisabled={true}
                                    >
                                        {item?.status}
                                        {setEmpty(1)}

                                    </Button>

                                </CardHeader>

                                <CardBody className="px-3 py-0 text-tiny text-black w-[100%]">
                                    <div className="flex justify-center flex-col">
                                        <p className="font-semibold m-2">
                                            PLAYER DETAILS
                                        </p>
                                        <hr />
                                        <div className="m-2">
                                            <div>MATCHES :- {item?.playerdetail?.matches_played}</div>
                                            <div>KILL :- {item?.playerdetail?.kill}</div>
                                            <div>KD :- {item?.playerdetail?.kd}</div>
                                            <div>TOTAL WIN :- {item?.playerdetail?.total_win}</div>
                                        </div>
                                    </div>

                                </CardBody>
                                <CardFooter className="gap-3 ">
                                    <div className="flex gap-2 justify-center text-green-700" >

                                        <Button className="bg-green-600 text-white" onClick={() => { acceptRequest(item?._id, index) }}>Accept</Button>

                                        <Button className="bg-red-600 text-white" onClick={() => { rejectRequest(item?._id, index) }}>Reject</Button>

                                    </div>

                                </CardFooter>
                            </Card>


                        )

                    ))
                }
            </div>

            <Toaster></Toaster>
        </div>
    )

}
