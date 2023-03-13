import { databaseRepositoryImpl } from "@repositories/databaseRepository_impl";

type editData = {
    router: string, 
    metadata: string, 
    value: string | number | boolean
}

export class editDataController {
    constructor(
        private databaseRepository: databaseRepositoryImpl
    ){}
    async execute({router, metadata, value}: editData) {
        this.databaseRepository.edit(
            router,
            metadata,
            value
        )
    }
}