import { customAlert } from "~/utils/alert";
import requestApi from "./requestApi";

export async function sendThisToDatabase(router: string, data: any) {
    try {
        requestApi.post(router, data)
        return customAlert("criado com sucesso !", "success")
    } catch (error) {
        console.log(error)
        return customAlert("erro ao mandar dados !", "error")
    }
}