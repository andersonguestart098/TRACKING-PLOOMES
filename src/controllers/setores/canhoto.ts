import { ModelCanhoto } from '@models/setoresInterface';
import prisma from '@utils/prismaInstance';

export class CanhotoController {

    constructor(
        private data: ModelCanhoto
    ){}

    async execute() {
        await prisma.canhoto.create({
            data: {
                motorista: this.data.motorista,
                notaFiscal: Number(this.data.numeroNotaFiscal),
                responsavelCanhoto: this.data.responsavelCanhoto,
                statusCanhoto: this.data.statusCanhoto
            }
        })
    }
}