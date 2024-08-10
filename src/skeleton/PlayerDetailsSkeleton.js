import React from "react";
import { Skeleton, Card, CardHeader, CardBody, CardFooter, Avatar, Button } from "@nextui-org/react";

export function PlayersSkeleton() {
    return (
        <div className="w-[100vw] h-[100vh] mt-4">
            <div className="flex flex-row max-w-[800px] justify-center flex-wrap gap-20 m-auto">
                {Array.from({ length: 6 }).map((_, index) => (
                    <Card className="w-[340px]" key={index}>
                        <CardHeader className="justify-between">
                            <div className="flex gap-5">
                                <Skeleton variant="circle" width={48} height={48}>
                                    <Avatar isBordered radius="full" size="md" />
                                </Skeleton>
                                <div className="flex flex-col gap-1 items-start justify-center">
                                    <Skeleton width={100} height={20}>
                                        <div className="h-4 w-24 bg-default-300"></div>
                                    </Skeleton>
                                    <Skeleton width={80} height={15}>
                                        <div className="h-3 w-20 bg-default-300"></div>
                                    </Skeleton>
                                </div>
                            </div>
                            <Skeleton width={100} height={30}>
                                <Button className="bg-black text-white" disabled>
                                    Send request
                                </Button>
                            </Skeleton>
                        </CardHeader>
                        <CardBody className="px-3 py-0 text-tiny text-black w-[100%]">
                            <div className="flex justify-center flex-col">
                                <Skeleton width={150} height={20}>
                                    <p className="font-semibold m-2">PLAYER DETAILS</p>
                                </Skeleton>
                                <hr />
                                <div className="m-2">
                                    <Skeleton width={100} height={20}>
                                        <div>MATCHES :-</div>
                                    </Skeleton>
                                    <Skeleton width={100} height={20}>
                                        <div>KILL :-</div>
                                    </Skeleton>
                                    <Skeleton width={100} height={20}>
                                        <div>KD :-</div>
                                    </Skeleton>
                                    <Skeleton width={100} height={20}>
                                        <div>TOTAL WIN :-</div>
                                    </Skeleton>
                                </div>
                            </div>
                        </CardBody>
                        <CardFooter className="gap-3">
                            <Skeleton width={150} height={20}>
                                <div className="flex gap-1 text-green-700">
                                    <p className="font-semibold text-small">Tournaments Played :- </p>
                                </div>
                            </Skeleton>
                        </CardFooter>
                    </Card>
                ))}
            </div>
        </div>
    );
}
