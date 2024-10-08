import { useEffect, useState } from "react"
import priorityAPI from "../apis/priorityAPI"


export const useGetPriority=()=>{
    const [getPriority,setPriority]= useState<any>([])
    useEffect(()=>{
        const getPriorityAPI = async()=>{
            try {
                const response = await priorityAPI.HandlePriority('/get-priority')
                setPriority(response.data)
            } catch (error) {
                console.log(error);
                
            }
        }
        getPriorityAPI()
    },[])
    return {getPriority}
}