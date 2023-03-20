import { customAlert } from "~/utils/alert";
import requestApi from "./requestApi";

export async function sendThisToDatabase(router: string, data: any) {
    try {
        const response = await requestApi.post(router, data)     
        console.log(response)
        if(response.status != 200 && response.status != 201) {
            throw response.data.result
        }
        return customAlert(response.data.result, "success")
    } catch (error) {
        console.log(error)
        return customAlert(""+error, "error")
    }
}