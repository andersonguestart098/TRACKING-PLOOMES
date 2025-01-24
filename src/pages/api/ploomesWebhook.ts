import axios from "axios";
import prisma from "@utils/prismaInstance";
import { truncateLog } from "@utils/logHelper";

// URL base da API do Ploomes
const PLOOMES_API_URL = "https://api2.ploomes.com";

// Definição de tipos para campos personalizados
interface CustomFields {
  [key: string]: string | number | boolean | undefined;
}

// Local mapping to avoid repetitive requests
const optionsMapping: { [optionsTableId: number]: { [id: number]: string } } = {
  4316006: {
    410849977: "Para Futura Entrega",
    410849978: "Remessa de Materiais",
    410849979: "Bonificado",
    410849980: "Devolução",
    410849981: "Normal",
  },
  4316007: {
    410850021: "À vista",
    410850022: "Faturado",
    410850023: "Cartão Crédito",
    410850024: "Sem Pagamento",
    410850025: "Depósito Programado",
    410850026: "Cheque Programado",
    410850027: "Pago com Crédito",
  },
  4316262: {
    410850073: "Cartão Débito",
    410850074: "Dinheiro",
    410850075: "Pix",
    410850076: "Depósito",
  },
  4316263: {
    410852835: "Bndes",
    410852837: "Amex",
    410852838: "Elo",
    410852839: "Banri",
    410852840: "Master",
    410852841: "Visa",
  },
  4316264: {
    410853551: "11x",
    410853552: "12x",
    410853553: "10x",
    410853554: "9x",
    410853555: "8x",
    410853556: "7x",
    410853557: "6x",
    410853558: "5x",
    410853559: "4x",
    410853560: "3x",
    410853561: "2x",
    410853562: "1x",
  },
  4316518: {
    410853831: "Cobrar na entrega",
    410853832: "Pago na sala de vendas",
    410853836: "Cobrar no financeiro",
    410853837: "Depósito já efetuado",
    410853839: "Aguardar depósito",
  },
  4316520: {
    410857051: "Entrega Imediata",
    410857052: "Entrega Agendada",
    410857053: "Entrega(Aguardar Vendedor)",
    410857054: "Retira",
    410857055: "Transportadora",
  },
  4316535: {
    410857258: "Diluído",
    410857259: "Destacado",
  },
  4316536: {
    410857280: "Cliente",
    410857281: "Cemear",
  },
};

// Função para resolver valores de campos personalizados
async function resolveCustomFieldValues(
  otherProperties: any
): Promise<CustomFields> {
  const resolvedFields: CustomFields = {};

  for (const property of otherProperties || []) {
    const fieldKey = property?.FieldKey || "";
        let value =
          property?.StringValue ??
          property?.BigStringValue ??
          property?.IntegerValue ??
          property?.DecimalValue ??
          property?.BoolValue ??
          property?.ObjectValueName ??
          property?.DateTimeValue ??
          "Not Specified";


    // Verifique se o valor é um ID de opção pré-cadastrada e converta usando o mapping
    if (property?.ObjectValueId && optionsMapping[property?.OptionsTableId]) {
      value =
        optionsMapping[property.OptionsTableId]?.[property.ObjectValueId] ??
        value;
    }

    // Garantir que fieldKey não seja uma string vazia
    if (fieldKey) {
      resolvedFields[fieldKey] = value;
    }
  }

  return resolvedFields;
}

// Função para buscar dados do Ploomes
async function fetchDealDataFromPloomes(dealId: number) {
  try {
    console.log(`Fetching data for dealId: ${dealId}`);
    const response = await axios.get(
      `${PLOOMES_API_URL}/Deals?$filter=Id eq ${dealId}&$expand=OtherProperties`,
      {
        headers: {
          "User-Key": process.env.PLOOMES_API_KEY!,
        },
      }
    );
    if (
      response.data &&
      response.data.value &&
      response.data.value.length > 0
    ) {
      console.log(`Data fetched for dealId: ${dealId}`);
      return response.data.value[0];
    }
    console.warn(`No deal data found for ID: ${dealId}`);
    return null;
  } catch (error: any) {
    console.error("Erro ao obter dados do Ploomes:", error.message);
    throw error;
  }
}

// Função para salvar dados no financeiro
export async function saveDealToFinance(deal: any) {
  console.log("Acessando saveDealToFinance");
  console.log(
    "Dados do negócio recebidos para salvar:",
    JSON.stringify(deal, null, 2)
  );

  const customFields = await resolveCustomFieldValues(deal.OtherProperties);

  const clienteFaturamento =
    customFields["deal_583AEEB4-909B-429B-B019-603A5AB4BAA1"]?.toString() ||
    deal.ContactName ||
    deal.Customer?.Name ||
    "Cliente desconhecido";

  console.log(`Cliente Faturamento extraído: ${clienteFaturamento}`);

  const vendedor =
    customFields["deal_6C550ED7-B0CE-4836-8A98-74166AEC8D81"]?.toString() ||
    "Desconhecido";

  const tipoFaturamento =
    customFields["deal_81DC0C6D-8DED-4111-8C72-E42C79EC594A"]?.toString() ?? "Normal";
  const formaPagamento =
    customFields["deal_89906A82-06DF-4448-98C6-073FF9FFEC79"]?.toString() ?? "Faturado";

  console.log("Debug Orçamento Key:", customFields);
  const orcamentoValue = customFields["deal_0D0530E4-571B-4E05-A80B-ED75DA11D038"];
  console.log("Orçamento Resgatado:", orcamentoValue);

  // Extrair e dividir orçamentos
  const orcamentos = typeof orcamentoValue === "string"
    ? orcamentoValue.split(",").map((num) => num.trim()).filter(Boolean)
    : [];

  console.log("Orçamentos Separados:", orcamentos);

  if (orcamentos.length === 0) {
    console.warn("Nenhum orçamento válido encontrado.");
    return;
  }

  const parcelas =
    customFields["deal_AE5BCE52-230A-41DC-A9A3-6B71E6CE4563"]?.toString() ?? "1";
  const vendaFrete =
    customFields["deal_041002DF-FDED-4C04-8758-7AFCADFC3B49"] === true;
  const bandeiraCartao =
    customFields["deal_59AAA879-5B0C-460B-B39C-C8703BA013CB"]?.toString() ?? "Não especificada";
  const retiraEntrega =
    customFields["deal_B8E4844F-0A9B-44E4-B09B-37D706EE3F8A"]?.toString() ?? "Não especificado";
  const freteConta =
    customFields["deal_E2E2CF1D-C407-4244-8E4C-A98334C2192B"]?.toString() ?? "Desconhecido";
  const localCobranca =
    customFields["deal_B5FEEE33-4350-48E7-B6ED-37C4B3DF2FA0"]?.toString() ?? "Desconhecido";
  const observacao =
    customFields["deal_DCA7219F-DE67-4E74-BF32-B91203AF7543"]?.toString() ?? "Sem observações";
  const entregaCadastro =
    customFields["deal_65B56CA4-C988-4650-A3E7-38C20DC0CAA8"] === true;
  const observacaoFinanceiro =
    customFields["deal_DCA7219F-DE67-4E74-BF32-B91203AF7543"]?.toString() ?? "Nenhuma";
  const operadorNotaFiscal =
    customFields["deal_C2D46ECE-C8FD-4935-932A-EBCC55DAFC89"]?.toString() ?? "Não definido";
  const responsavelNotaFiscal =
    customFields["deal_C2D46ECE-C8FD-4935-932A-EBCC55DAFC89"]?.toString() ?? "Não definido";
  const statusNotaFiscal =
    customFields["deal_1463F487-CAB0-475D-8CA5-08B4EE90AF8E"]?.toString() ?? "Pendente";
  const tipoFrete =
    customFields["deal_FE31CCE4-69C9-490C-BF91-8CE060518981"]?.toString() ?? "Não especificado";
  const valorFrete =
    customFields["deal_D2FCCD9B-F8F6-4705-BD3C-16971FAF1E78"]?.toString() ?? "0";
  const dataEntrega = new Date(
    customFields["deal_4CA5294A-926E-4594-B8F5-AAD8E55CA136"] as string
  ).toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const precisaEncomendar =
    customFields["deal_0E008FFE-2FB3-4C48-92AA-8B6CCBCAF30B"]?.toString() ?? "não";
  const precisaRecuperar =
    customFields["deal_DA2328FE-440B-47C0-ACA8-C38AB2184668"]?.toString() ?? "não";
  const descreva =
    customFields["deal_5372FD9F-1E53-4F92-90A7-7BAE846F9562"]?.toString() ?? "Sem descrição";

  for (const orcamento of orcamentos) {
    try {
      await prisma.financeiro.create({
        data: {
          orcamento,
          vendedor,
          tipoFaturamento,
          valor: customFields["deal_61BE29AC-CE96-421A-86A5-97022E6834C0"]?.toString() ?? "0",
          formaPagamento,
          parcelas,
          vendaFrete,
          bandeiraCartao,
          retiraEntrega,
          freteConta,
          localCobranca,
          dataEntrega,
          entregaCadastro,
          observacao,
          observacaoFinanceiro,
          operadorNotaFiscal,
          responsavelNotaFiscal,
          statusNotaFiscal,
          tipoFrete,
          valorFrete,
          precisaEncomendar,
          precisaRecuperar,
          descreva,
          author: {
            create: {
              expedicao: "não definido",
              cliente: clienteFaturamento,
            },
          },
        },
      });
      console.log(`Dados salvos para orçamento ${orcamento}.`);
    } catch (error) {
      console.error(`Erro ao salvar dados para orçamento ${orcamento}:`, error);
    }
  }
}


// Handler principal do webhook
export default async function handler(req: any, res: any) {
  console.log("Received request at /api/syncFinanceiro");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const dealId = req.body?.New?.Id || req.body?.Old?.Id;
  const stageId = req.body?.New?.StageId || req.body?.Old?.StageId;
  const pipelineId = req.body?.New?.PipelineId || req.body?.Old?.PipelineId; // Adicione esta linha para capturar o ID do funil

  console.log(
    `Captured Values: dealId = ${dealId}, stageId = ${stageId}, pipelineId = ${pipelineId}`
  );

  // Verificar se o PipelineId corresponde ao ID do funil correto
  const allowedPipelineId = 40053753; // Substitua pelo ID do seu funil
  if (pipelineId !== allowedPipelineId) {
    console.log(
      `Funil não corresponde ao permitido. Ignorando evento para PipelineId: ${pipelineId}`
    );
    return res
      .status(200)
      .json({ message: "Event ignored due to PipelineId mismatch." });
  }

  if (!dealId || !stageId) {
    console.error("Missing dealId or stageId.");
    return res
      .status(400)
      .json({ message: "dealId and stageId are required." });
  }

  try {
    console.log(`Fetching data for dealId: ${dealId}`);
    const dealData = await fetchDealDataFromPloomes(dealId);

    if (!dealData) {
      console.error(`No deal data found for ID: ${dealId}`);
      return res.status(404).json({ message: "Deal data not found." });
    }

    // Certificar que a propriedade responsável (vendedor) está presente
    const responsible = dealData?.Responsible?.Name || "Desconhecido";
    console.log(`Responsável extraído: ${responsible}`);

    // Adicionar o responsável no dealData antes de passar para saveDealToFinance
    dealData.Seller = { Name: responsible };

    console.log(`Saving finance data for dealId: ${dealId}`);
    await saveDealToFinance(dealData);
    res.status(200).json({ message: "Synchronization successful!" });
  } catch (error: any) {
    console.error("Error during synchronization process:", error.message);
    res.status(500).json({ message: "Synchronization failed." });
  }
}


export const config = {
  api: {
    bodyParser: {
      sizeLimit: "5mb",
    },
  },
};
