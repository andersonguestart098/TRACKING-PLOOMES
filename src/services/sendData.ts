import { customAlert } from "~/utils/alert";
import requestApi from "./requestApi";

export async function sendThisToDatabase(router: string, data: any, timeAlert?:number) {
    try {
        const response = await requestApi.post(router, data)     
        console.log(response)
        if(response.status != 200 && response.status != 201) {
            return customAlert(response.data.result, "error")
        }
        return customAlert(response.data.result, "success", {
            timer: timeAlert
        })
    } catch (error) {
        console.log(error)
        return customAlert(""+error, "error")
    }
}