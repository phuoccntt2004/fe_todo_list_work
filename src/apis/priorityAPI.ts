
import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient"

class PriorityAPI {
    HandlePriority = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/priority${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const priorityAPI = new PriorityAPI()

export default priorityAPI;