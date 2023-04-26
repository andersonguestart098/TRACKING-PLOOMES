import { ModelRetorno } from '@models/setoresInterface';
import prisma from '@utils/prismaInstance';


export class retornoController {

    constructor(
        private data: ModelRetorno
    ){}

    async execute() {
        await prisma.retorno.create({
            data: {
                notaFiscal: Number(this.data.notaFiscal),
                placa: this.data.placa,
                hodometro: Number(this.data.hodometro),
                data: this.data.data,
                obs: this.data.obs

            }
        })
    }
}