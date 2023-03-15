import { describe, expect, it } from "vitest"
import { inMemoryDatabaseRepository } from "../test/repositories/inMemoryEditRepository"
import { editDataController } from "../services/prisma/editData"

describe("testes no banco de dados UPDATE", () => {
        const inMemory = new inMemoryDatabaseRepository()
        const methodsDb = new editDataController(inMemory)
    
    it('editar dados na tabela', async () => {
        await expect(methodsDb.execute({router: "", metadata: "", value: "editado"}))
            .resolves.not.toThrow()
        expect(inMemory.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                value: "editado"
            })
        ]))
    })

    it("valores variados no value",async () => {
        await expect(methodsDb.execute({router: "", metadata: "", value: true}))
        .resolves.not.toThrow()
        expect(inMemory.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                value: true
            })
        ]))
        await expect(methodsDb.execute({router: "", metadata: "", value: true}))
        .resolves.not.toThrow()
        expect(inMemory.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                value: true
            })
        ]))
        await expect(methodsDb.execute({router: "", metadata: "", value: 123}))
        .resolves.not.toThrow()
        expect(inMemory.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                value: 123
            })
        ]))
    })
})

describe("testes no banco de dados CREATE", () => {
    const inMemory = new inMemoryDatabaseRepository()
    const methodsDb = new editDataController(inMemory)

    it('criar dado', async () => {
        await expect(methodsDb.execute({router: "", metadata: "", value: "criado"}))
            .resolves.not.toThrow()
        expect(inMemory.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                value: "criado"
            })
        ]))
    })
})

describe("testes no banco de dados DELETE", () => {
    const inMemory = new inMemoryDatabaseRepository()
    const methodsDb = new editDataController(inMemory)

    it('deletar dado', async () => {
        await expect(methodsDb.execute({router: "", metadata: "", value: "criado"}))
            .resolves.not.toThrow()
        expect(inMemory.items).toEqual(expect.arrayContaining([
            expect.objectContaining({
                value: "criado"
            })
        ]))
    })
})