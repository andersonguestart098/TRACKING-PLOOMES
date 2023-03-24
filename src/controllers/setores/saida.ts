import { ModelSaida } from '@models/setoresInterface';
import prisma from '@utils/prismaInstance';
import { number } from 'zod';

export class SaidaController {

    constructor(
        private data: ModelSaida
    ){}

    async execute() {
        await prisma.saida.create({
            data: {
                codigoEntrega: Number(this.data.codigoEntrega),
                notaFiscal: Number(this.data.numeroNotaFiscal),
                nomeConferente: this.data.nomeConferente,
                placa: this.data.placa,
                motorista: this.data.motorista,
                cidadeDestino: this.data.cidadesDestino,
                hodometro: Number(this.data.hodometro),
                dataHoraSaida: this.data.dataHoraSaida,
                obs: this.data.obs

            }
        })
    }
}