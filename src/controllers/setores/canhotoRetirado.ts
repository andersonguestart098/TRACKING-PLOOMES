import { ModelCanhotoRetirado } from '@models/setoresInterface';
import prisma from '@utils/prismaInstance';

export class CanhotoRetiradoController {

    constructor(
        private data: ModelCanhotoRetirado
    ){}

    async execute() {
        await prisma.canhotoRetirado.create({
            data: {
                notaFiscal: Number(this.data.notaFiscal),
                responsavel: this.data.responsavel,
                motivo: this.data.motivo
            }
        })
    }
}