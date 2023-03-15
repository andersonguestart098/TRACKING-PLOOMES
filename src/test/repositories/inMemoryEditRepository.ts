import { ModelFinanceiro } from "~/models/financeiro/financeiroSchema";
import { databaseRepositoryImpl } from "~/repositories/databaseRepository_impl";

interface typeItems {
    router: string
    metadata: string
    value: string | number | boolean
}

export class inMemoryDatabaseRepository implements databaseRepositoryImpl {
    public items: typeItems[] = [{router: "default", metadata: "default", value: "default"}]

    create(router: string, data: ModelFinanceiro, setor: string): void {
        throw new Error("Method not implemented.");
    }
    delete(router: string, id: number): void {
        this.items.pop()
    }

    edit(router: string, metadata: string, value: string | number | boolean): void {
        this.items[0] = {router: router, metadata: metadata, value: value}
    }
    
}