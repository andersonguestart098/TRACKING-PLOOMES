import React, { useState } from "react";
import { useFetch } from "@hooks/useFetch";
import { Chip, Pagination, TableCell, TableRow, Tooltip } from "@mui/material";
import CustomTable from "@components/customtable";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import CustomNavBar from "@components/customAppBar";
import { ModelFinanceiro } from "@models/setoresInterface";
import CustomInput from "@components/customInput";
import CustomSelect from "@components/customSelect";
import { motion } from "framer-motion";
import ItemNaoEncontrado from "@components/itemNaoEncontrado";
import Loader from "@components/loader";
import color from "~/config/colors";
import WarningIcon from "@mui/icons-material/Warning";

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
  // Novo mapeamento para os IDs de vendedores (usuários)
  4317000: {
    40059457: "Danielle Penteado",
    40075006: "Felipe",
    40075007: "Anderson",
    40075008: "Daniel",
    40076882: "Julia",
    40082319: "Gaspar Tartari",
    40059458: "Automação",
    40060657: "AtendiTI - Parceiro Ploomes",
    40060660: "AtendiTI 2 - Parceiro Ploomes",
    40077175: "WhatsApp",
    40083098: "Anderson",
    40082414: "Dionathan",
    40082415: "Igon",
    40082416: "Juliano",
    40082417: "Claudemir",
    40082418: "Paulo Alexandre",
    40082419: "Nadia Lopes",
    40082408: "Eduardo Santos",
    40082409: "Rosi",
    40082410: "Vinícius",
    40082411: "Dieimes Bedin",
    40082412: "Cristiano Sanhudo",
    40082413: "Manoel Nogueira",
    40082402: "Jonathas Rodrigues",
    40082403: "Giliard",
    40082404: "Leonardo Machado",
    40082405: "Sabino Bresolini",
    40082406: "Rafael Azavedo",
    40082407: "Gilmar",
    40082396: "Marcia Meller",
    40082397: "Aline Gomes",
    40082398: "Guilherme Rodrigues",
    40082399: "Luis Tizoni",
    40082400: "Wagner Rosa",
    40082401: "Paulo Fagundes",
    40082390: "Sandra Vargas",
    40082391: "Gelson Machado",
    40082392: "Guilherme",
    40082393: "Eduardo",
    40082394: "Jandir Marineli",
    40082395: "Lucas Flores",
  },
};

const mapOptionValue = (optionsTableId: number, objectId: string | number) => {
  const mapping = optionsMapping[optionsTableId];
  const idAsNumber =
    typeof objectId === "string" ? parseInt(objectId, 10) : objectId;
  return mapping && mapping[idAsNumber] ? mapping[idAsNumber] : objectId;
};

interface typeDB {
  result: ModelFinanceiro[];
  lengthDB: number;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);
  if (!session) {
    return { redirect: { destination: "/", permanent: false } };
  }
  return { props: { session } };
};

function Index() {
  const { data: dataAuth } = useSession();
  const [pagina, setPagina] = useState(0);
  const [travarAuto, setTravarAuto] = useState(false);
  const [searchString, setSearchString] = useState("{}");
  const [filterInput, setFilterInput] = useState("notaFiscal");
  const [valueInputChange, setValueInputChange] = useState("");

  React.useEffect(() => {
    if (searchString == "{}") {
      setTravarAuto(false);
    }
  }, [searchString]);

  const { data, isLoading } = travarAuto
    ? useFetch<typeDB>(
        "/api/methodsdatabase/getall",
        pagina,
        "financeiro",
        searchString
      )
    : useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "financeiro");

  function getColorForTipoFaturamento(tipoFaturamento: string): string {
    switch (tipoFaturamento) {
      case "Remessa de Materiais":
        return "#8ceaf5";
      case "Para Futura Entrega":
        return "#edfc77";
      default:
        return "transparent";
    }
  }

  function getColorForPrecisaRecuperar(tipoFaturamento: string): string {
    return tipoFaturamento === "Sim" ? "#deff1c" : "transparent";
  }

  // Função para formatar o orçamento a cada 6 números
const formatOrcamento = (orcamento: string | number) => {
  const orcamentoStr = String(orcamento).replace(/\D/g, ""); // Remove caracteres não numéricos
  return orcamentoStr.replace(/(\d{6})(?=\d)/g, "$1-"); // Insere hífen a cada 6 números
};

const formatCurrency = (value: any) => {
  if (!value) return "R$ 0,00"; // Retorna um valor padrão se for null ou undefined
  const numericValue = parseFloat(value.replace(",", "")); // Garante que o valor seja numérico
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(numericValue);
};


  if (isLoading) return <Loader />;

  return (
    <>
      <CustomNavBar
        setor="FINANCEIRO"
        setSearchString={setSearchString}
        setValueInputChange={setValueInputChange}
        searchString={searchString}
        filter={filterInput}
        setSearch={setTravarAuto}
        dados={dataAuth}
        filterData={[
          ["cliente"],
          [{ author: { cliente: { contains: valueInputChange } } }],
        ]}
      />

      <div style={{ textAlign: "center" }}>
        <p>Filtrar ao digitar: </p>
        <div>
          <Chip
            onClick={() => setFilterInput("notaFiscal")}
            sx={
              filterInput === "notaFiscal"
                ? { marginLeft: 2, background: "#6d6e6d80" }
                : { marginLeft: 2 }
            }
            label="Numero de Nota Fiscal"
            variant="outlined"
          />
          <Chip
            onClick={() => setFilterInput("cliente")}
            sx={
              filterInput === "cliente"
                ? { marginLeft: 2, background: "#6d6e6d80" }
                : { marginLeft: 2 }
            }
            label="Cliente"
            variant="outlined"
          />
        </div>
        <Chip
          onClick={() => setSearchString("{}")}
          sx={{ marginTop: 2 }}
          label="Tirar Todos Filtros"
          variant="outlined"
        />
      </div>
      <br />
      {data.result.length ? (
        <CustomTable
        childrenCabecarioTable={
          <TableRow>
            <TableCell style={{ background: "#e1ebf0" }}>Id</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Data|Hora</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Vendedor</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Orçamento</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Cliente</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Tipo|Faturamento</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Valor</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Forma|Pagamento</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Bandeira|Cartão</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Parcelas</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Venda|Frete</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Retira|Entrega</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Frete|Conta</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Entrega|Cadastro</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Local|Cobrança</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Observações</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Tipo|Frete</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Valor|Frete</TableCell>
            <TableCell style={{ background: "#e1ebf0" }}>Data|Entrega</TableCell>
            <TableCell style={{ background: "#bedded" }}>Precisa|Recuperar</TableCell>
            <TableCell style={{ background: "#bedded" }}>Número|NF</TableCell>
            <TableCell style={{ background: "#bedded" }}>Status|NF</TableCell>
            <TableCell style={{ background: "#bedded" }}>Operador|NF</TableCell>
            <TableCell style={{ background: "#bedded" }}>Exped|Log</TableCell>
            <TableCell style={{ background: "#bedded" }}>Responsável|NF</TableCell>
            <TableCell style={{ background: "#bedded" }}>Observação Financeiro</TableCell>
          </TableRow>
        }
        childrenRowTable={data.result.map((item: ModelFinanceiro) => (
          <TableRow
            component={motion.div}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            key={item.id}
            style={
              item.statusNotaFiscal === "Cancelada"
                ? color.financeiro.cancelada
                : item.statusNotaFiscal === "Emitida"
                ? color.financeiro.emitida
                : item.statusNotaFiscal === "Retornou"
                ? color.financeiro.retornou
                : item.statusNotaFiscal === "Boleto em aberto"
                ? color.financeiro.boletoAberto
                : item.statusNotaFiscal === "Aguardando deposito"
                ? color.financeiro.aguardadoDeposito
                : item.statusNotaFiscal === "Em analise"
                ? color.financeiro.emAnalise
                : item.statusNotaFiscal === "Pendente"
                ? color.financeiro.pendente
                : {}
            }
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell>{item.id}</TableCell>
            <TableCell>{new Date(String(item.createdAt)).toLocaleString()}</TableCell>
            <TableCell>{mapOptionValue(4317000, item.vendedor)}</TableCell>
            <TableCell>{formatOrcamento(item.orcamento)}</TableCell>
            <TableCell>{item.author?.cliente}</TableCell>
            <TableCell
              style={{
                backgroundColor: getColorForTipoFaturamento(
                  String(mapOptionValue(4316006, item.tipoFaturamento))
                ),
              }}
            >
              {mapOptionValue(4316006, item.tipoFaturamento)}
            </TableCell>
            <TableCell>{formatCurrency(item.valor)}</TableCell>
            <TableCell>{mapOptionValue(4316007, item.formaPagamento)}</TableCell>
            <TableCell>{mapOptionValue(4316263, item.bandeiraCartao)}</TableCell>
            <TableCell>{mapOptionValue(4316264, item.parcelas)}</TableCell>
            <TableCell>{item.vendaFrete ? "Sim" : "Não"}</TableCell>
            <TableCell>{mapOptionValue(4316520, item.retiraEntrega)}</TableCell>
            <TableCell>{mapOptionValue(4316536, item.freteConta)}</TableCell>
            <TableCell>{item.entregaCadastro ? "Sim" : "Não"}</TableCell>
            <TableCell>{mapOptionValue(4316518, item.localCobranca)}</TableCell>
            <TableCell
                  className="cell-descricao"
                  style={{
                    maxWidth: 230,
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                    position: "relative",
                  }}
                >
                  <Tooltip title={item.observacao} arrow>
                    <div
                      data-tip={item.observacao}
                      data-for={`descricao-tooltip-${item.id}`}
                      className="tooltip-cell"
                      style={{
                        textOverflow: "ellipsis",
                        overflow: "hidden",
                      }}
                    >
                      {item.observacao}
                    </div>
                  </Tooltip>
                  {item.observacao !== "Nenhuma Observação" && (
                    <WarningIcon
                      style={{
                        position: "absolute",
                        top: "50%",
                        right: "0px",
                        transform: "translateY(-50%)",
                        color: "yellow",
                      }}
                    />
                  )}
                </TableCell>
            <TableCell>{mapOptionValue(4316535, item.tipoFrete)}</TableCell>
            <TableCell>{item.valorFrete}</TableCell>
            <TableCell>{item.dataEntrega}</TableCell>
            <TableCell>{item.precisaRecuperar}</TableCell>
            <TableCell>
              <CustomInput
                key={item.id}
                bg={item.author?.notaFiscal != null ? undefined : "#f71900"}
                typeInput="number"
                item={item.author}
                routerEdit="/api/methodsdatabase/editDataWhere"
                metadata="_notaFiscal"
              />
            </TableCell>
            <TableCell>
              <CustomSelect
                key={item.id}
                item={item}
                routerEdit="/api/methodsdatabase/editDataWhere"
                metadata="_statusNotaFiscal"
                value="statusNotaFiscal"
                tags={[
                  "Pendente", "Emitida", "Cancelada", "Retornou",
                  "Boleto em aberto", "Aguardando deposito", "Em analise"
                ]}
              />
            </TableCell>
            <TableCell>
                  {item.operadorNotaFiscal != "..." ? (
                    <img
                      src={
                        "/icones/" +
                        item.operadorNotaFiscal.toLowerCase() +
                        ".png"
                      }
                      alt={item.operadorNotaFiscal}
                      width={100}
                      style={{
                        borderRadius: "50%",
                        border: "2px solid #3279a8",
                      }}
                    />
                  ) : (
                    <></>
                  )}
                  <CustomSelect
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_operadorNotaFiscal"
                    value="operadorNotaFiscal"
                    tags={["Rosi", "Vini", "Lucas","Julia", "Khetley"]}
                    setor="financeiro"
                  />
                </TableCell>
                <TableCell>
                  <CustomSelect
                    key={item.id}
                    item={item.author}
                    routerEdit="/api/methodsdatabase/mudancaPassagem"
                    metadata={"_" + item.author?.expedicao}
                    value="expedicao"
                    tags={["expedicao", "expedicao2", "logistica"]}
                  />
                </TableCell>
                <TableCell></TableCell>
                <TableCell>
                  <CustomInput
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_observacaoFinanceiro"
                    setor="financeiro"
                  />
                </TableCell>
          </TableRow>
        ))}
        paginacao={
          <Pagination
            onChange={(_, value) => setPagina(value - 1)}
            count={Math.ceil(data.lengthDB / 40)}
            style={{ display: "flex", justifyContent: "center", padding: 50 }}
          />
        }
      />
      ) : (
        <ItemNaoEncontrado />
      )}
    </>
  );
}

export default Index;