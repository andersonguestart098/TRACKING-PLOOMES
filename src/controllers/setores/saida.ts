import { ModelSaida } from "@models/setoresInterface";
import prisma from "@utils/prismaInstance";

export class SaidaController {
  constructor(private data: ModelSaida) {}

  async execute() {
    await prisma.saida.create({
      data: {
        codigoEntrega: Number(this.data.codigoEntrega),
        notaFiscal: Number(this.data.notaFiscal),
        nomeConferente: this.data.nomeConferente,
        placa: this.data.placa,
        motorista: this.data.motorista,
        cidadeDestino: this.data.cidadeDestino,
        hodometro: Number(this.data.hodometro),
        images: this.data.images,
        obs: this.data.obs,
      },
    });
  }
}
