import React, { useEffect, useState } from "react";
import { Button, TextField } from "@mui/material";
import CustomInputMask from "@components/customInputMask";
import CustomSelect_Widget from "@components/customSelect_widget";
import { useForm } from "react-hook-form";
import CustomRadio from "@components/customRadio";
import { ModelFinanceiro } from "~/models/setoresInterface";
import { sendThisToDatabase } from "@services/sendData";
import { sendEmail } from "@services/sendEmail";

type Props = {};

const financeiro = ({}: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [widthScreen, setWidthScreen] = useState(0);

  const [tipoFaturamentoOther, setTipoFaturamentoOther] = useState(false);
  const [tipoFaturamentoRM, setTipoFaturamentoRM] = useState(false);
  const [tipoFaturamentoN, setTipoFaturamentoN] = useState(false);

  const [entregaRetiraEI, setEntregaRetiraEI] = useState(false);
  const [entregaRetiraEA, setEntregaRetiraEA] = useState(false);
  const [entregaRetiraT, setEntregaRetiraT] = useState(false);

  const [vendaFreteSIM, setVendaFreteSIM] = useState(false);
  const [agendadoDataSim, setAgendadoDataSim] = useState(false);

  const [formaPGOAV, setFormaPGOAV] = useState(false);
  const [formaPGOCartao, setFormaPGOCartao] = useState(false);
  const [formaPGOCheque, setFormaPGOCheque] = useState(false);

  const [disabilitarBotao, setDisabilitarBotao] = useState(false);

  const [valorVendaInput, setValorVendaInput] = useState("");
  const [valorFreteInput, setValorFreteInput] = useState("");
  const [formaDePagamento, setFormaDePagamento] = useState("");

  const [parcelas, setParcelas] = useState("");
  const [bandeira, setBandeira] = useState("");

  const [mostrarDescreva, setMostrarDescreva] = useState(false);

  useEffect(() => {
    setWidthScreen(window.innerWidth);
  }, []);

  useEffect(() => {
    switch (formaDePagamento) {
      case "Cartão":
        break;
      default:
        setParcelas("");
        setBandeira("");
        break;
    }
  }, [formaDePagamento]);

  const onSubmit = async (data: any) => {
    await setDisabilitarBotao(true);

    let dadosFinanceiro: ModelFinanceiro = {
      cliente: data.cliente,
      formaPagamento: formaDePagamento,
      bandeiraCartao: bandeira ?? "",
      dataEntrega: data.dataEntrega ?? "",
      entregaCadastro: data.entregaCadastro == "Sim" ? true : false ?? false,
      vendaFrete: data.vendaFrete == "Sim" ? true : false ?? false,
      localCobranca: data.localCobranca ?? "",
      observacao: data.obs == "" ? "Nenhuma Observação" : data.obs,
      orcamento: data.orcamento ?? "",
      parcelas: parcelas ?? "",
      responsavelNotaFiscal: "...",
      retiraEntrega: data.entregaRetira ?? "",
      tipoFaturamento: data.tipoFaturamento ?? "",
      tipoFrete: data.tipoFrete ?? "",
      valor: valorVendaInput ?? "",
      observacaoFinanceiro: "...",
      operadorNotaFiscal: "...",
      statusNotaFiscal: "Pendente",
      freteConta: data.freteConta ?? "",
      valorFrete: valorFreteInput ?? "",
      vendedor: data.vendedor ?? "",
      precisaEncomendar: data.precisaEncomendar ?? "",
      precisaRecuperar: data.precisaRecuperar ?? "",
      descreva: data.descreva ?? "",

      email: data.email ?? "",
      refreshToken: data.refreshToken ?? "",
      setor: "financeiro",
    };

    try {
      const {
        precisaEncomendar,
        descreva,
        vendedor,
        orcamento,
        cliente,
        tipoFaturamento,
      } = data;

      if (descreva) {
        const userEmail = "anderson.guestart@gmail.com";

        await sendEmail(
          "/api/methodsdatabase/enviarEmail",
          {
            from: userEmail,
            to: "compras@cemear.com.br",
            subject: "Pedido de Encomenda",
            text: `\nPEDIDO DE ENCOMENDA DE MATERIAL!\n\nVENDEDOR:\n${vendedor.toUpperCase()}\n\nORÇAMENTO:\n${orcamento.toUpperCase()}\n\nTIPO DE FATURAMENTO:\n${tipoFaturamento.toUpperCase()}\n\nCLIENTE:\n${cliente.toUpperCase()}\n\nMATERIAL:\n${descreva.toUpperCase()}`,
          },
          "E-mail enviado com sucesso!",
          3000
        );
      }

      await sendThisToDatabase(
        "/api/methodsdatabase/create",
        dadosFinanceiro,
        3000
      );
    } catch (error) {
      console.error("Erro ao processar dados:", error);
    } finally {
      setDisabilitarBotao(false);
      // Recarrega a página após o envio
      window.location.reload();
    }
  };
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        background: "#053C5E",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          background: "#F5F5F5",
          borderRadius: 10,
          padding: 10,
          marginTop: 100,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
          }}
        >
          <a
            href="https://form.jotform.com/232073802977057"
            target="_blank"
            style={{
              textDecoration: "none",
              color: "black",
              display: "flex",
              alignItems: "center",
            }}
          >
            <span style={{ marginLeft: 10, fontSize: 18, fontWeight: "bold" }}>
              Acessar Jotform:{" "}
            </span>
            <img
              src="/icones/logoJot.png"
              alt="Descrição da imagem"
              title="ACESSAR JOTFORM..."
              style={{
                width: 170, // Ajuste o tamanho da imagem conforme necessário
                transition: "transform 0.3s ease-in-out",
                paddingLeft: 15,
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseOut={(e) => (e.currentTarget.style.transform = "scale(1)")}
            />
          </a>
        </div>

        <h3 style={{ textAlign: "center" }}>Solicitação de Faturamento - </h3>

        <hr />
        <div
          style={
            widthScreen > 600
              ? {
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "50%",
                }
              : {}
          }
        >
          <div style={{ margin: 50 }}>
            <CustomSelect_Widget
              labelText={"Vendedor:"}
              register={register("vendedor")}
              itens={[
                { value: "BETO", visualValue: "BETO" },
                { value: "FELIPE", visualValue: "FELIPE" },
                { value: "ALINE", visualValue: "ALINE" },
                { value: "FAGUNDES", visualValue: "FAGUNDES" },
                { value: "MARCIA", visualValue: "MARCIA" },
                { value: "WAGNER", visualValue: "WAGNER" },
                { value: "LUIS", visualValue: "LUIS" },
                { value: "KOZAK", visualValue: "KOZAK" },
                { value: "EDUARDO", visualValue: "EDUARDO" },
                { value: "FAVRETTO", visualValue: "FAVRETTO" },
                { value: "GASPAR", visualValue: "GASPAR" },
                { value: "GILIARD", visualValue: "GILIARD" },
                { value: "GILMAR", visualValue: "GILMAR" },
                {
                  value: "GUILHERME RODRIGUES",
                  visualValue: "GUILHERME RODRIGUES",
                },
                { value: "GUILHERME FRANÇA", visualValue: "GUILHERME FRANÇA" },
                { value: "JONATHAS", visualValue: "JONATHAS" },
                { value: "LEONARDO", visualValue: "LEONARDO" },
                { value: "SABINO", visualValue: "SABINO" },

                { value: "RAFAEL AZEVEDO", visualValue: "RAFAEL AZEVEDO" },
              ]}
            />
            <br />
            <br />
            <TextField
              {...register("cliente")}
              sx={{ width: 250 }}
              label="Cliente"
              variant="outlined"
              required
            />
            <br />
            <CustomRadio
              register={register("tipoFaturamento")}
              onchange={(e) => {
                switch (e.target.value) {
                  case "Para Futura Entrega":
                    setTipoFaturamentoRM(false);
                    setTipoFaturamentoN(true);
                    break;
                  case "Remessa de Materiais":
                    setTipoFaturamentoOther(true);
                    setTipoFaturamentoN(true);
                    setTipoFaturamentoRM(true);
                    break;
                  case "Bonificado":
                    setTipoFaturamentoOther(true);
                    setTipoFaturamentoN(true);
                    setTipoFaturamentoRM(true);
                    break;
                  default:
                    setTipoFaturamentoRM(false);
                    setTipoFaturamentoN(false);
                    setTipoFaturamentoOther(false);
                    break;
                }
              }}
              labelText={"Tipo de Faturamento: "}
              items={[
                { value: "Normal", visualValue: "Normal" },
                {
                  value: "Para Futura Entrega",
                  visualValue: "Para Futura Entrega",
                },
                {
                  value: "Remessa de Materiais",
                  visualValue: "Remessa de Materiais",
                },
                { value: "Bonificado", visualValue: "Bonificado" },
              ]}
            />
            <br />
            <br />

            <CustomRadio
              register={register("precisaEncomendar")}
              labelText={"Precisa encomendar ? "}
              items={[
                { value: "Sim", visualValue: "Sim" },
                { value: "Não", visualValue: "Não" },
              ]}
              onchange={(e) => {
                if (e.target.value === "Sim") {
                  setMostrarDescreva(true);
                } else {
                  setMostrarDescreva(false);
                }
              }}
            />
            <br />
            {mostrarDescreva && (
              <TextField
                {...register("descreva")}
                label="Descreva o material:"
                placeholder="Favor colocar o código do produto, descrição, fornecedor/marca e quantidade..."
                multiline
                minRows={4}
                maxRows={10}
                sx={{ width: 350 }}
              />
            )}

            <CustomRadio
              register={register("precisaRecuperar")}
              labelText={"Precisa recuperar o produto?"}
              items={[
                { value: "Sim", visualValue: "Sim" },
                { value: "Não", visualValue: "Não", checked: true },
              ]}
            />
            <br />

            {formaPGOAV ? (
              <CustomRadio
                register={register("formaPagamentoAVista")}
                labelText={"Forma de Pagamento Á vista: "}
                onchange={(e) => {
                  switch (e.target.value) {
                    case "Depósito":
                      setFormaDePagamento("Depósito");
                      break;
                    case "Pix":
                      setFormaDePagamento("Pix");
                      break;
                    case "Dinheiro":
                      setFormaDePagamento("Dinheiro");
                      break;
                    case "Cartão Débito":
                      setFormaDePagamento("Cartão Débito");
                      break;
                    case "Pago com crédito":
                      setFormaDePagamento("Pago com crédito");
                  }
                }}
                items={[
                  { value: "Depósito", visualValue: "Depósito" },
                  { value: "Pix", visualValue: "Pix" },
                  { value: "Dinheiro", visualValue: "Dinheiro" },
                  { value: "Cartão Débito", visualValue: "Cartão Débito" },
                  {
                    value: "Pago com crédito",
                    visualValue: "Pago com crédito",
                  },
                ]}
              />
            ) : (
              <></>
            )}
            <br />

            {formaPGOCartao ? (
              <CustomRadio
                register={register("bandeira")}
                onchange={(e) => setBandeira(e.target.value)}
                labelText={"Bandeira: "}
                items={[
                  { value: "Visa", visualValue: "Visa" },
                  { value: "Master", visualValue: "Master" },
                  { value: "Banri", visualValue: "banri" },
                  { value: "Elo", visualValue: "Elo" },
                  { value: "Amex", visualValue: "Amex" },
                  { value: "Bndes", visualValue: "Bndes" },
                ]}
              />
            ) : (
              <></>
            )}
            <br />
            {formaPGOCartao == true ||
            formaPGOAV == true ||
            formaPGOCheque == true ? (
              <CustomRadio
                register={register("localCobranca")}
                labelText={"Local de Cobrança: "}
                items={[
                  {
                    value: "Cobrar no Local",
                    visualValue: "Cobrar no Local (Endereço de Entrega)",
                  },
                  {
                    value: "Cobrar na Empresa",
                    visualValue: "Cobrar na Empresa (Cemear)",
                  },
                  {
                    value: "Pago na sala de vendas",
                    visualValue: "Pago na sala de vendas (Showroom)",
                  },
                ]}
              />
            ) : (
              <></>
            )}
            <br />
            {entregaRetiraEI || entregaRetiraEA ? (
              <CustomRadio
                register={register("vendaFrete")}
                labelText={"Venda com Frete? "}
                onchange={(e) => {
                  switch (e.target.value) {
                    case "Sim":
                      setVendaFreteSIM(true);
                      break;
                    default:
                      setVendaFreteSIM(false);
                      break;
                  }
                }}
                items={[
                  { value: "Sim", visualValue: "Sim" },
                  { value: "Não", visualValue: "Não" },
                ]}
              />
            ) : (
              <></>
            )}
            <br />
            <br />
            {vendaFreteSIM ? (
              <CustomRadio
                register={register("tipoFrete")}
                labelText={"Tipo de frete: "}
                items={[
                  { value: "Destacado", visualValue: "Destacado" },
                  { value: "Diluído", visualValue: "Diluído" },
                ]}
              />
            ) : (
              <></>
            )}
            <br />
          </div>

          <div style={{ margin: 50 }}>
            <TextField
              {...register("orcamento")}
              sx={{ width: 250 }}
              type="number"
              label="Orcamento"
              variant="outlined"
              required
            />
            <br />
            <br />

            <CustomInputMask
              register={setValorVendaInput}
              placeHolder="Valor da Venda (incluindo frete)"
            />

            {!tipoFaturamentoRM ? (
              <CustomRadio
                register={register("formaPagamento")}
                onchange={(e) => {
                  switch (e.target.value) {
                    case "Cartão":
                      setFormaDePagamento("Cartão");
                      setFormaPGOCartao(true);
                      setFormaPGOAV(false);
                      break;
                    case "Á Vista":
                      setFormaDePagamento("Á Vista");
                      setFormaPGOAV(true);
                      setFormaPGOCartao(false);
                      break;
                    case "Faturado":
                      setFormaDePagamento("Faturado");
                      setFormaPGOCheque(false);
                      setFormaPGOAV(false);
                      setFormaPGOCartao(false);
                      break;
                    case "Sem Pagamento":
                      setFormaDePagamento("Sem Pagamento");
                      setFormaPGOAV(false);
                      setFormaPGOCartao(false);
                      break;
                    case "Depósito Programado":
                      setFormaDePagamento("Depósito Programado");
                      setFormaPGOAV(false);
                      setFormaPGOCartao(false);
                      break;
                    case "Cheque Programado":
                      setFormaDePagamento("Cheque Programado");
                      setFormaPGOCheque(true);
                      setFormaPGOAV(false);
                      setFormaPGOCartao(false);
                      break;
                    default:
                      setFormaPGOAV(false);
                      setFormaPGOCartao(false);
                      break;
                  }
                }}
                labelText={"Forma de Pagamento: "}
                items={[
                  { value: "Á Vista", visualValue: "Á vista" },
                  { value: "Faturado", visualValue: "Faturado" },
                  { value: "Cartão", visualValue: "Cartão" },
                  { value: "Sem Pagamento", visualValue: "Sem Pagamento" },
                  {
                    value: "Depósito Programado",
                    visualValue: "Depósito Programado",
                  },
                  {
                    value: "Cheque Programado",
                    visualValue: "Cheque Programado",
                  },
                ]}
              />
            ) : (
              <></>
            )}

            {!tipoFaturamentoN || tipoFaturamentoRM ? (
              <CustomRadio
                register={register("entregaRetira")}
                onchange={(e) => {
                  switch (e.target.value) {
                    case "Entrega Imediata":
                      setEntregaRetiraEI(true);
                      setEntregaRetiraT(false);
                      setEntregaRetiraEA(false);

                      break;
                    case "Entrega Agendada":
                      setEntregaRetiraEA(true);
                      setEntregaRetiraT(false);
                      setEntregaRetiraEI(false);
                      break;
                    case "Transportadora":
                      setEntregaRetiraT(true);
                      break;
                    default:
                      setEntregaRetiraEA(false);
                      setEntregaRetiraT(false);
                      setEntregaRetiraEI(false);
                      break;
                  }
                }}
                labelText={"Entrega ou Retirada? "}
                items={[
                  {
                    value: "Entrega Imediata",
                    visualValue: "Entrega Imediata",
                  },
                  {
                    value: "Entrega Agendada",
                    visualValue: "Entrega Agendada",
                  },
                  {
                    value: "Entrega (Aguardar vendedor)",
                    visualValue: "Entrega (Aguardar vendedor)",
                  },
                  { value: "Retira", visualValue: "Retira" },
                  { value: "Transportadora", visualValue: "Transportadora" },
                ]}
              />
            ) : (
              <></>
            )}
            <br />
            <br />
            {entregaRetiraT ? (
              <CustomRadio
                register={register("freteConta")}
                labelText={"Frente por conta: "}
                items={[
                  { value: "Cemear", visualValue: "Cemear" },
                  { value: "Cliente", visualValue: "Cliente", checked: true },
                ]}
              />
            ) : (
              <></>
            )}
            <br />
            <br />
            {formaPGOCartao ? (
              <CustomSelect_Widget
                labelText={"Número de Parcelas:"}
                onChangeValue={(e) => setParcelas(e.target.value)}
                register={register("parcelas")}
                itens={[
                  { value: "...", visualValue: "..." },
                  { value: "1x", visualValue: "1x" },
                  { value: "2x", visualValue: "2x" },
                  { value: "3x", visualValue: "3x" },
                  { value: "4x", visualValue: "4x" },
                  { value: "5x", visualValue: "5x" },
                  { value: "6x", visualValue: "6x" },
                  { value: "Outros", visualValue: "Outros" },
                ]}
              />
            ) : (
              <></>
            )}

            <br />
            <br />

            {entregaRetiraEI || entregaRetiraEA ? (
              <CustomRadio
                register={register("entregaCadastro")}
                labelText={"Entrega no Endereço do Cadastro? "}
                items={[
                  { value: "Sim", visualValue: "Sim" },
                  { value: "Não", visualValue: "Não" },
                ]}
              />
            ) : (
              <></>
            )}

            <br />
            {entregaRetiraEA ? (
              <CustomRadio
                register={register("dataAgendada")}
                labelText={"Foi agendado uma data? "}
                onchange={(e) => {
                  switch (e.target.value) {
                    case "Sim":
                      setAgendadoDataSim(true);
                      break;
                    default:
                      setAgendadoDataSim(false);
                      break;
                  }
                }}
                items={[
                  { value: "Sim", visualValue: "Sim" },
                  { value: "Não", visualValue: "Não" },
                ]}
              />
            ) : (
              <></>
            )}
            <br />
            <br />
            {vendaFreteSIM ? (
              <CustomInputMask
                register={setValorFreteInput}
                placeHolder="Valor do Frete"
              />
            ) : (
              <></>
            )}
            <br />
            <br />

            {agendadoDataSim ? (
              <TextField
                {...register("dataEntrega")}
                sx={{ width: 250 }}
                type="date"
                variant="outlined"
                required
              />
            ) : (
              <></>
            )}
          </div>
        </div>

        <TextField
          {...register("obs")}
          sx={{ width: "100%" }}
          label="Observações"
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            type="submit"
            sx={{ width: "50%", marginTop: 10 }}
            disabled={disabilitarBotao}
            variant="contained"
          >
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
};

export default financeiro;
