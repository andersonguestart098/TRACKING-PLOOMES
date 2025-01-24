import prisma from "@utils/prismaInstance";
import { truncateLog } from "@utils/logHelper";
import { saveDealToFinance } from "@services/ploomesService"; // Ajuste o caminho, se necessário
import axios from "axios";

// URL base da API do Ploomes para puxar os dados de OtherProperties
const PLOOMES_API_URL =
  "https://api2.ploomes.com/Deals?$expand=OtherProperties";

// Função para obter dados diretamente da API do Ploomes
async function fetchDealDataFromPloomes(dealId: number) {
  try {
    const response = await axios.get(
      `${PLOOMES_API_URL}&$filter=Id eq ${dealId}`,
      {
        headers: {
          "User-Key": process.env.PLOOMES_API_KEY!, // Certifique-se de definir a chave de API corretamente
        },
      }
    );
    if (
      response.data &&
      response.data.value &&
      response.data.value.length > 0
    ) {
      return response.data.value[0];
    }
    return null;
  } catch (error: any) {
    console.error("Erro ao obter dados do Ploomes:", error.message);
    throw error;
  }
}

// Função principal para sincronizar dados do financeiro
export default async function handler(req: any, res: any) {
  console.log("Requisição recebida no endpoint /api/syncFinanceiro");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método não permitido" });
  }

  // Usar função de truncamento de log para evitar logs longos
  const truncatedPayload = truncateLog(req.body, 300);
  console.log("Payload recebido (truncado):", truncatedPayload);

  const dealId = req.body?.dealId;
  const stageId = req.body?.stageId;

  console.log(`Valores capturados: dealId = ${dealId}, stageId = ${stageId}`);

  if (!dealId || !stageId) {
    console.error("dealId ou stageId estão ausentes.");
    return res
      .status(400)
      .json({ message: "dealId e stageId são necessários." });
  }

  try {
    // Obter dados do negócio diretamente do Ploomes usando a nova URL
    const dealData = await fetchDealDataFromPloomes(dealId);

    if (!dealData) {
      console.error(
        `Não foi possível obter os dados do negócio para dealId: ${dealId}`
      );
      return res
        .status(404)
        .json({ message: "Dados do negócio não encontrados." });
    }

    // Função auxiliar para extrair valores personalizados, priorizando `ObjectValueName`
    const getCustomFieldValue = (fieldKey: string) => {
      const field = dealData.OtherProperties?.find(
        (prop: any) => prop.FieldKey === fieldKey
      );
      return (
        field?.ObjectValueName ||
        field?.StringValue ||
        field?.IntegerValue ||
        field?.DecimalValue ||
        field?.BoolValue ||
        "Não especificado"
      );
    };

    // Extrair campos personalizados de OtherProperties
    const customFields = {
      tipoFaturamento: getCustomFieldValue(
        "deal_81DC0C6D-8DED-4111-8C72-E42C79EC594A"
      ),
      valor: getCustomFieldValue("deal_61BE29AC-CE96-421A-86A5-97022E6834C0"),
      formaPagamento: getCustomFieldValue(
        "deal_89906A82-06DF-4448-98C6-073FF9FFEC79"
      ),
      parcelas: getCustomFieldValue(
        "deal_AE5BCE52-230A-41DC-A9A3-6B71E6CE4563"
      ),
      vendaFrete:
        getCustomFieldValue("deal_041002DF-FDED-4C04-8758-7AFCADFC3B49") ===
        "Sim",
      bandeiraCartao: getCustomFieldValue(
        "deal_59AAA879-5B0C-460B-B39C-C8703BA013CB"
      ),
      retiraEntrega: getCustomFieldValue(
        "deal_B8E4844F-0A9B-44E4-B09B-37D706EE3F8A"
      ),
      freteConta: getCustomFieldValue(
        "deal_E2E2CF1D-C407-4244-8E4C-A98334C2192B"
      ),
      entregaCadastro:
        getCustomFieldValue("deal_65B56CA4-C988-4650-A3E7-38C20DC0CAA8") ===
        "Sim",
      localCobranca: getCustomFieldValue(
        "deal_B5FEEE33-4350-48E7-B6ED-37C4B3DF2FA0"
      ),
      observacao: dealData.Observation || "Sem observações",
      observacaoFinanceiro: getCustomFieldValue(
        "deal_DCA7219F-DE67-4E74-BF32-B91203AF7543"
      ),
      tipoFrete: getCustomFieldValue(
        "deal_FE31CCE4-69C9-490C-BF91-8CE060518981"
      ),
      valorFrete: getCustomFieldValue(
        "deal_D2FCCD9B-F8F6-4705-BD3C-16971FAF1E78"
      ),
      dataEntrega:
        getCustomFieldValue("deal_4CA5294A-926E-4594-B8F5-AAD8E55CA136") ||
        new Date().toISOString(),
      statusNotaFiscal: getCustomFieldValue(
        "deal_1463F487-CAB0-475D-8CA5-08B4EE90AF8E"
      ),
      operadorNotaFiscal: getCustomFieldValue(
        "deal_C2D46ECE-C8FD-4935-932A-EBCC55DAFC89"
      ),
      responsavelNotaFiscal: getCustomFieldValue(
        "deal_C2D46ECE-C8FD-4935-932A-EBCC55DAFC89"
      ),
      precisaEncomendar: getCustomFieldValue(
        "deal_0E008FFE-2FB3-4C48-92AA-8B6CCBCAF30B"
      ),
      descreva: getCustomFieldValue(
        "deal_5372FD9F-1E53-4F92-90A7-7BAE846F9562"
      ),
      precisaRecuperar: getCustomFieldValue(
        "deal_DA2328FE-440B-47C0-ACA8-C38AB2184668"
      ),
      vendedor: dealData.Seller?.Name || "Desconhecido",
    };

    console.log(
      "Campos personalizados extraídos:",
      JSON.stringify(customFields, null, 2)
    );

    // Verificar se já existe um negócio no banco de dados para evitar duplicação
    const existingDeal = await prisma.financeiro.findFirst({
      where: { orcamento: dealId },
    });

    if (existingDeal) {
      console.log(`Negócio já existe no banco de dados para dealId: ${dealId}`);
      return res.status(200).json({ message: "Negócio já processado." });
    }

    console.log(`Iniciando sincronização para dealId: ${dealId}`);
    await saveDealToFinance({ ...dealData, customFields });

    console.log(`Sincronização concluída para dealId: ${dealId}`);
    res.status(200).json({ message: "Sincronização concluída com sucesso!" });
  } catch (error: any) {
    console.error(
      "Erro ao verificar duplicação ou sincronizar:",
      error.message
    );
    res.status(500).json({ message: "Erro ao verificar duplicação" });
  }
}
