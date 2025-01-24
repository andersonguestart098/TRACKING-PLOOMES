import { ModelAssinatura } from "@models/setoresInterface";
import prisma from "@utils/prismaInstance";

export class assinaturaController {
    constructor(
        private data: ModelAssinatura
    ){}

    async execute() {
        await prisma.assinatura.create({
            data: {
                assinatura_img: this.data.assinatura_img,
                notaFiscal: Number(this.data.notaFiscal),
                responsavel: this.data.responsavel
            }
        })
    }
}