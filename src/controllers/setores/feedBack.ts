import { Ocorrencia } from './../../../node_modules/.prisma/client/index.d';
import { ModelFeedBack } from '@models/setoresInterface';
import prisma from '@utils/prismaInstance';

export class FeedBackController {

    constructor(
        private data: ModelFeedBack
    ){}

    async execute() {
        await prisma.feedBack.create({
            data: {
                nome: this.data.nome,
                avalie: this.data.avalie,
                nota: this.data.nota,
                pontos: this.data.pontos,
                gostaria: this.data.gostaria,
                obs: this.data.obs,

            }
        })
    }
}