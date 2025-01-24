import axios from "axios";
import prisma from "@utils/prismaInstance";

// URL base da API do Ploomes
const PLOOMES_API_URL = "https://api2.ploomes.com";

// Define types for custom fields
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

// Function to resolve custom field values directly from the ObjectValueName
async function resolveCustomFieldValues(
  otherProperties: any
): Promise<CustomFields> {
  const resolvedFields: CustomFields = {};

  for (const property of otherProperties) {
    const fieldKey = property.FieldKey;
    let value =
      property.StringValue ||
      property.BigStringValue ||
      property.IntegerValue ||
      property.DecimalValue ||
      property.BoolValue ||
      property.ObjectValueName || // Use ObjectValueName directly
      "Not Specified";

    resolvedFields[fieldKey] = value;
  }

  return resolvedFields;
}

// Função para salvar dados no financeiro
export async function saveDealToFinance(deal: any) {
  console.log("Acessando saveDealToFinance");
  console.log(
    "Dados do negócio recebidos para salvar:",
    JSON.stringify(deal, null, 2)
  );

  const customFields = await resolveCustomFieldValues(deal.OtherProperties);

  // Use o campo `deal_owner` para definir o vendedor (responsável)
  const vendedor = customFields["deal_owner"]?.toString() ?? "Desconhecido";

  const tipoFaturamento =
    customFields["deal_81DC0C6D-8DED-4111-8C72-E42C79EC594A"]?.toString() ||
    "Normal";
  const formaPagamento =
    customFields["deal_89906A82-06DF-4448-98C6-073FF9FFEC79"]?.toString() ||
    "Faturado";

    const orcamentoValue = customFields["deal_74716689-3530-4D1B-A6B8-221807A5BE5B"];

    const orcamento =
    typeof orcamentoValue === "string"
      ? orcamentoValue
          .replace(/[^0-9,]/g, "") // Remove caracteres inválidos
          .split(",")
          .map((num) => num.trim())
          .filter((num) => !isNaN(Number(num)))
          .join(", ")
      : String(orcamentoValue || "");
  
    
    console.log("Orçamento Formatado:", orcamento);
    

  console.log(
    "Campos personalizados resolvidos antes de salvar:",
    customFields
  );
  console.log(
    `Valores a serem salvos: Tipo de Faturamento = ${tipoFaturamento}, Forma de Pagamento = ${formaPagamento}, Orcamento = ${orcamento}`
  );

  try {
    await prisma.financeiro.create({
      data: {
        orcamento,
        vendedor, // Atribuído ao campo `deal_owner` (responsável)
        tipoFaturamento,
        valor:
          customFields[
            "deal_61BE29AC-CE96-421A-86A5-97022E6834C0"
          ]?.toString() || "0",
        formaPagamento,
        parcelas:
          customFields[
            "deal_AE5BCE52-230A-41DC-A9A3-6B71E6CE4563"
          ]?.toString() || "1",
        vendaFrete:
          customFields["deal_041002DF-FDED-4C04-8758-7AFCADFC3B49"] === true,
        bandeiraCartao:
          customFields[
            "deal_59AAA879-5B0C-460B-B39C-C8703BA013CB"
          ]?.toString() ?? "Não especificada",
        retiraEntrega:
          customFields[
            "deal_B8E4844F-0A9B-44E4-B09B-37D706EE3F8A"
          ]?.toString() ?? "Não especificado",
        freteConta:
          customFields[
            "deal_E2E2CF1D-C407-4244-8E4C-A98334C2192B"
          ]?.toString() ?? "Desconhecido",
        localCobranca:
          customFields[
            "deal_B5FEEE33-4350-48E7-B6ED-37C4B3DF2FA0"
          ]?.toString() ?? "Desconhecido",
        dataEntrega:
          customFields[
            "deal_4CA5294A-926E-4594-B8F5-AAD8E55CA136"
          ]?.toString() ?? new Date().toISOString(),
        entregaCadastro:
          customFields["deal_65B56CA4-C988-4650-A3E7-38C20DC0CAA8"] === true,
        observacao: deal.Observation ?? "Sem observações",
        observacaoFinanceiro:
          customFields[
            "deal_DCA7219F-DE67-4E74-BF32-B91203AF7543"
          ]?.toString() ?? "Nenhuma",
        operadorNotaFiscal:
          customFields[
            "deal_C2D46ECE-C8FD-4935-932A-EBCC55DAFC89"
          ]?.toString() ?? "Não definido",
        responsavelNotaFiscal:
          customFields[
            "deal_C2D46ECE-C8FD-4935-932A-EBCC55DAFC89"
          ]?.toString() ?? "Não definido",
        statusNotaFiscal:
          customFields[
            "deal_1463F487-CAB0-475D-8CA5-08B4EE90AF8E"
          ]?.toString() ?? "Pendente",
        tipoFrete:
          customFields[
            "deal_FE31CCE4-69C9-490C-BF91-8CE060518981"
          ]?.toString() ?? "Não especificado",
        valorFrete:
          customFields[
            "deal_D2FCCD9B-F8F6-4705-BD3C-16971FAF1E78"
          ]?.toString() || "0",
        precisaEncomendar:
          customFields[
            "deal_0E008FFE-2FB3-4C48-92AA-8B6CCBCAF30B"
          ]?.toString() ?? "não",
        precisaRecuperar:
          customFields[
            "deal_DA2328FE-440B-47C0-ACA8-C38AB2184668"
          ]?.toString() ?? "não",
        descreva:
          customFields[
            "deal_5372FD9F-1E53-4F92-90A7-7BAE846F9562"
          ]?.toString() ?? "Sem descrição",
        author: {
          create: {
            expedicao: "não definido",
            cliente:
              customFields[
                "deal_583AEEB4-909B-429B-B019-603A5AB4BAA1"
              ]?.toString() ??
              deal.Customer?.Name ??
              "Cliente desconhecido",
          },
        },
      },
    });
    console.log("Dados salvos no financeiro.");
  } catch (error) {
    console.error("Erro ao salvar dados no financeiro:", error);
  }
}
