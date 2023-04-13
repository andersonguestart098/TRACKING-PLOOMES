import { databaseRepositoryImpl } from "@repositories/databaseRepository_impl";
import { ModelFinanceiro } from "@models/setoresInterface";

export class createDataController {
    constructor(
        private databaseRepository: databaseRepositoryImpl
    ){}
    async execute(router: string, data: ModelFinanceiro, setor: string) {
        this.databaseRepository.create(router, data, setor)
    }
}