
import { appInfo } from "./appInfo";
import axiosClient from "./axiosClient"

class WorkAPI {
    HandleWork = async (
        url: string,
        data?: any,
        method?: 'get' | 'post' | 'put' | 'delete',
    ) => {
        return await axiosClient(`${appInfo.BASE_URL}/work${url}`,{
            method: method ?? 'get',
            data,
        });
    }
}

const workAPI = new WorkAPI()

export default workAPI;