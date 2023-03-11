import { sendThisToDatabase } from "~/services/sendData"

export class mutateData {
    constructor(
        private router: string,
        private metadata: string,
        private value: string | number | boolean
    ){}

    execute() {
        const metaData: any = this.metadata.split("_")
        sendThisToDatabase(this.router, {
            id: metaData[0],
            dado: {
                index: metaData[1],
                value: this.value
            }
      })
    }
}