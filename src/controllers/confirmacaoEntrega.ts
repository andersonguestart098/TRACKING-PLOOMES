import { ModelConfirmacaoEntrega} from '@models/setoresInterface';
import prisma from '@utils/prismaInstance';
import { number } from 'zod';

export class confirmacaoEntregaController {

    constructor(
        private data: ModelConfirmacaoEntrega
    ){}

    async execute() {
        await prisma.confirmacaoEntrega.create({
            data: {
                notaFiscal: Number(this.data.notaFiscal),
                motorista: this.data.motorista,
                cidade: this.data.cidade,
                entregaConcluida: this.data.entregaConcluida,
                obs: this.data.obs

            }
        })
    }
}