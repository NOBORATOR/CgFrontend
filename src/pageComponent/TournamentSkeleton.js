import React from "react";
import { Skeleton,CardFooter,Card } from "@nextui-org/react";

export function TournamentSkeleton(){
    return (
        
          <div className="w-[200px] ">
              <Card isFooterBlurred radius="lg" className="border-none">
                <Skeleton className="object-cover" height={200} width={200}>
                  <div className="h-48 w-full bg-default-300"></div>
                </Skeleton>
                <CardFooter className="justify-between before:bg-white/10 border-white/20 border-1 overflow-hidden py-1 absolute before:rounded-xl rounded-large bottom-1 w-[calc(100%_-_8px)] shadow-small ml-1 z-10">
                  <Skeleton className="w-3/5 rounded-lg">
                    <div className="h-3 w-3/5 bg-default-200"></div>
                  </Skeleton>
                  <Skeleton className="w-2/5 rounded-lg">
                    <div className="h-3 w-2/5 bg-default-200"></div>
                  </Skeleton>
                </CardFooter>
              </Card>
            </div>
        
    );
}