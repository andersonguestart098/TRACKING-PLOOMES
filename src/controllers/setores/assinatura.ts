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
                cliente: this.data.cliente,
                responsavel: this.data.responsavel
            }
        })
    }
}