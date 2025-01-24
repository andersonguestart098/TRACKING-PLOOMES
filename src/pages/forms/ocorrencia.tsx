import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from "@services/sendData";
import CustomSelect_Widget from "~/components/customSelect_widget";
import color from "~/config/colors";

type Props = {};

const retorno = (props: Props) => {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm();

  const [disabilitarBotao, setDisabilitarBotao] = React.useState(false);

  async function onSubmit(e: any) {
    setDisabilitarBotao(true);

    const dadosOcorrencia = {
      descricao: e.descricao,

      gravidade: e.gravidade,
      responsavel: e.responsavel,
      departamento: e.departamento,
      prioridade: e.prioridade,
      status: e.status,
      causa: e.causa,
      resolucao: e.resolucao,
      gerouCusto: e.gerouCusto,
      dataEncerramento: e.dataEncerramento,
      especifique: e.especifique,
      obs: e.obs,
      setor: "ocorrencia",
    };
    await sendThisToDatabase(
      "/api/methodsdatabase/create",
      dadosOcorrencia,
      300
    );

    window.location.reload();
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#053c5e",
        marginTop: "none",
      }}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          alignItems: "center",
          background: "#F5F5F5",
          width: "50%",
          textAlign: "center",
          borderRadius: 10,
          padding: 10,
          marginTop: 100,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div>
          <img
            src="/icones/logo.png"
            style={{
              width: 200,
              marginRight: 610,
              marginTop: 5,
            }}
          />
        </div>
        <h3
          style={{
            textAlign: "center",
            marginBottom: 50,
            marginTop: 0,
            marginRight: 32,
            flexDirection: "row",
            justifyContent: "space-between",
            width: "50%",
          }}
        >
          Formulário de Ocorrências
        </h3>

        <div style={{ width: 500, alignSelf: "center", marginRight: 15 }}>
          <TextField
            {...register("descricao")}
            sx={{
              width: 500,
              height: "150px",
            }}
            multiline // multilinhas no box (importante)
            rows={4}
            id="descricao"
            label="Descreva o problema..."
            variant="outlined"
          />
          <br />
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            width: 600,
          }}
        >
          <div style={{ flex: 1, marginRight: 10 }}>
            <br />
            <TextField
              {...register("responsavel", { required: true })}
              sx={{ width: 250 }}
              type="text"
              id="responsavel"
              label="Responsável pelo preenchimento..."
              variant="outlined"
            />
            <br />
            <br />
            <CustomSelect_Widget
              labelText={"Selecione o setor:"}
              register={register("departamento", { required: true })}
              itens={[
                { value: "FINANCEIRO", visualValue: "FINANCEIRO" },
                { value: "EXPEDIÇÃO 1", visualValue: "EXPEDIÇÃO 1" },
                { value: "EXPEDIÇÃO 2", visualValue: "EXPEDIÇÃO 2" },
                { value: "LOGISTICA", visualValue: "LOGISTICA" },
                { value: "VENDAS", visualValue: "VENDAS" },
                { value: "COMPRAS", visualValue: "COMPRAS" },
                { value: "ESTOQUE", visualValue: "ESTOQUE" },
                { value: "OBRAS", visualValue: "OBRAS" },
                { value: "PROJETOS", visualValue: "PROJETOS" },
                { value: "MARKETING", visualValue: "MARKETING" },
                { value: "DIRETORIA", visualValue: "DIRETORIA" },
                { value: "RH", visualValue: "RH" },
                { value: "T.I", visualValue: "T.I" },
              ]}
            />

            <br />
            <br />
            <TextField
              {...register("causa", { required: true })}
              sx={{ width: 250 }}
              type="text"
              id="causa"
              label="Causa do problema:"
              variant="outlined"
            />
            <br />
            <br />
            <CustomSelect_Widget
              labelText={"Prioridade:"}
              register={register("prioridade", { required: true })}
              itens={[
                {
                  value: "BAIXA",
                  visualValue: "BAIXA",
                  color: color.financeiro.pendente.background,
                },
                {
                  value: "MÉDIA",
                  visualValue: "MÉDIA",
                  color: color.financeiro.medio.background,
                },
                {
                  value: "ALTA",
                  visualValue: "ALTA",
                  color: color.financeiro.cancelada.background,
                },
              ]}
            />
            <br />
            <br />
            <CustomSelect_Widget
              labelText={"Gerou custo para empresa?"}
              register={register("gerouCusto", { required: true })}
              itens={[
                { value: "SIM", visualValue: "SIM" },
                { value: "NÃO", visualValue: "NÃO" },
              ]}
            />
            <br />
            <br />
          </div>

          <div style={{ flex: 1, marginLeft: 10, marginTop: 20 }}>
            <CustomSelect_Widget
              labelText={"Gravidade do Problema:"}
              register={register("gravidade", { required: true })}
              itens={[
                {
                  value: "BAIXO",
                  visualValue: "BAIXO",
                  color: color.financeiro.pendente.background,
                },
                {
                  value: "MÉDIO",
                  visualValue: "MÉDIO",
                  color: color.financeiro.medio.background,
                },
                {
                  value: "ALTO",
                  visualValue: "ALTO",
                  color: color.financeiro.cancelada.background,
                },
              ]}
            />
            <br />

            <br />
            <CustomSelect_Widget
              labelText={"Status:"}
              register={register("status", { required: true })}
              itens={[
                {
                  value: "PENDENTE",
                  visualValue: "PENDENTE",
                  color: color.financeiro.pendente.background,
                },
                {
                  value: "EM ANDAMENTO",
                  visualValue: "EM ANDAMENTO",
                  color: color.financeiro.emAnalise.background,
                },
                {
                  value: "RESOLVIDO",
                  visualValue: "RESOLVIDO",
                  color: color.financeiro.emitida.background,
                },
                {
                  value: "NÃO RESOLVIDO",
                  visualValue: "NÃO RESOLVIDO",
                  color: color.financeiro.cancelada.background,
                },
              ]}
            />
            <br />
            <br />
            <TextField
              {...register("resolucao")}
              sx={{ width: 250 }}
              type="text"
              id="resolucao"
              label="Como o problema foi resolvido?"
              variant="outlined"
            />
            <br />
            <br />
            <TextField
              {...register("dataEncerramento")}
              InputLabelProps={{ shrink: true }}
              sx={{ width: 250, marginTop: 1 }}
              type="date"
              id="dataEncerramento"
              label="Encerramento:"
              variant="standard"
            />
            <br />
            <br />
            <TextField
              {...register("especifique", { required: true })}
              sx={{ width: 250 }}
              type="text"
              id="especifique"
              label="Especifique..."
              variant="outlined"
            />
            <br />
            <br />

            <br />
            <br />
          </div>
        </div>
        <div
          style={{ display: "flex", justifyContent: "center", marginTop: 20 }}
        >
          <TextField
            {...register("obs")}
            sx={{ width: 500 }}
            type="text"
            id="obs"
            label="Observações"
            variant="outlined"
          />
          <br />
          <br />
          <br />
        </div>
        <br />
        <Button
          type="submit"
          disabled={disabilitarBotao}
          variant="contained"
          sx={{ marginRight: "32px" }}
        >
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default retorno;
