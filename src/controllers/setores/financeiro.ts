import prisma from "@utils/prismaInstance";
import nodemailer from "nodemailer";
import { google } from "googleapis";
import { ModelFinanceiro } from "~/models/setoresInterface";

const OAuth2 = google.auth.OAuth2;

const createTransporter = async (user: string, refreshToken: string) => {
  const oauth2Client = new OAuth2(
    process.env.GMAIL_CLIENT_ID!,
    process.env.GMAIL_CLIENT_SECRET!,
    "https://developers.google.com/oauthplayground"
  );

  oauth2Client.setCredentials({
    refresh_token: refreshToken,
  });

  const accessToken = await oauth2Client.getAccessToken();

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user,
      clientId: process.env.GMAIL_CLIENT_ID!,
      clientSecret: process.env.GMAIL_CLIENT_SECRET!,
      refreshToken,
      accessToken: accessToken.token as string, // Certifique-se de converter para string
    },
  });

  return transporter;
};

export class FinanceiroController {
  constructor(private data: ModelFinanceiro) {}

  async execute() {
    await prisma.financeiro.create({
      data: {
        dataEntrega: this.data.dataEntrega,
        entregaCadastro: this.data.entregaCadastro,
        formaPagamento: this.data.formaPagamento,
        freteConta: this.data.freteConta,
        localCobranca: this.data.localCobranca,
        observacao: this.data.observacao,
        observacaoFinanceiro: this.data.observacaoFinanceiro,
        operadorNotaFiscal: this.data.operadorNotaFiscal,
        orcamento: this.data.orcamento,
        parcelas: this.data.parcelas,
        responsavelNotaFiscal: this.data.responsavelNotaFiscal,
        retiraEntrega: this.data.retiraEntrega,
        statusNotaFiscal: this.data.statusNotaFiscal,
        tipoFaturamento: this.data.tipoFaturamento,
        tipoFrete: this.data.tipoFrete,
        valor: this.data.valor,
        valorFrete: this.data.valorFrete,
        vendaFrete: this.data.vendaFrete,
        vendedor: this.data.vendedor,
        bandeiraCartao: this.data.bandeiraCartao,
        precisaEncomendar: this.data.precisaEncomendar,
        precisaRecuperar: this.data.precisaRecuperar,
        descreva: this.data.descreva,
        author: {
          create: {
            expedicao: "ainda não definido",
            cliente: this.data.cliente ?? "",
          },
        },
      },
    });

    if (this.data.precisaEncomendar === "sim" && this.data.descreva) {
      const user = this.data.email;
      const refreshToken = this.data.refreshToken;

      const transporter = await createTransporter(user, refreshToken);

      const mailOptions = {
        from: user,
        to: "destinatario@example.com",
        subject: "Necessidade de Encomenda de Material",
        text: `Descrição do material a ser encomendado: ${this.data.descreva}`,
      };

      await transporter.sendMail(mailOptions);
    }
  }
}
