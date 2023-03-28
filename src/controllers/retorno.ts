import { ModelRetorno } from '@models/setoresInterface';
import prisma from '@utils/prismaInstance';
import { number } from 'zod';

export class retornoController {

    constructor(
        private data: ModelRetorno
    ){}

    async execute() {
        await prisma.retorno.create({
            data: {
                codigoEntrega: Number(this.data.codigoEntrega),
                placa: this.data.placa,
                hodometro: Number(this.data.hodometro),
                data: this.data.data,
                obs: this.data.obs

            }
        })
    }
}