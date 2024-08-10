import React from "react";
import { Card,CardBody,Tab,Tabs } from "@nextui-org/react";
import { Overview } from "./OverviewOne";
import { Player } from "./Player";
import { Winner } from "./Winner";


export function TournamentOne({data}){
    
    return(
        <div  className="flex w-full justify-center h-[100vh]">
              <div className="">
                <Tabs aria-label="Options" className="flex justify-center"> 
                  <Tab key="Overview" title="Overview">
                    <Card className="">
                      <CardBody  >
                            <Overview data={data}></Overview>
                      </CardBody>
                    </Card>  
                  </Tab>
                  <Tab key="Player" title="Player">
                    <Card className="max-w-[800px] min-w-[340px]">
                      <CardBody>
                        <Player></Player>
                      </CardBody>
                    </Card>  
                  </Tab>
                  <Tab key="Winner" title="Winner">
                    <Card>
                      <CardBody>
                        <Winner></Winner>
                      </CardBody>
                    </Card>  
                  </Tab>
                </Tabs>
            </div>
        </div>
    )
}