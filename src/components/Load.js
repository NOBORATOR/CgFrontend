import React from "react";
import { Spinner} from "@nextui-org/react";

export function Load(){
    return(
        <div className="max-w-[500px]">
            <Spinner color="success" textColor="success"  size="xl">Loading....</Spinner>
            
        </div>
    )
}