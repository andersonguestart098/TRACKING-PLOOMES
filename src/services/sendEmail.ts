import { customAlert } from "~/utils/alert";
import requestApi from "./requestApi";

export async function sendEmail(
  router: string,
  data: any,
  successMessage: string,
  timeAlert?: number
) {
  try {
    const response = await requestApi.post(router, data);
    console.log(response);
    if (response.status !== 200 && response.status !== 201) {
      return customAlert(response.data.result, "error");
    }
    return customAlert(successMessage, "success", {
      timer: timeAlert,
    });
  } catch (error) {
    console.log(error);
    return customAlert("" + error, "error");
  }
}
