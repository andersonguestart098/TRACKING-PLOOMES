import { describe, expect, it } from "vitest"
import { inMemoryDatabaseRepository } from "../test/repositories/inMemoryEditRepository"
import { editDataController } from "../services/prisma/editData"

describe("editar dado service", () => {
    it('editar dados na tabela', async () => {
        const inMemory = new inMemoryDatabaseRepository()
        const editDado = new editDataController(inMemory)
    
        await expect(editDado.execute({router: "", metadata: "", value: "editado"}))
            .resolves.not.toThrow()
    
        expect(inMemory.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                value: "editado"
            })
        ]))
    })
})