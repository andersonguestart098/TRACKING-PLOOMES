import { databaseRepositoryImpl } from "~/repositories/databaseRepository_impl";

export class inMemoryDatabaseRepository implements databaseRepositoryImpl {
    public items: any = []

    edit(router: string, metadata: string, value: string | number | boolean): void {
        this.items.push({router: router, metadata: metadata, value: value})
    }
    
}