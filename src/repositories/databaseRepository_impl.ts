import { ModelFinanceiro } from "@models/setoresInterface"

export interface databaseRepositoryImpl {
    edit(router: string, metadata: string, value: string | number | boolean): void
    create(router: string, data: ModelFinanceiro, setor: string): void
    delete(router: string, id: number): void
}