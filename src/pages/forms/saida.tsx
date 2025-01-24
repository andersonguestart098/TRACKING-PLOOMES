import { Button, TextField } from "@mui/material";
import React from "react";
import { useForm } from "react-hook-form";
import { sendThisToDatabase } from "@services/sendData";
import { ModelSaida } from "@models/setoresInterface";
import CustomSelect_Widget from "@components/customSelect_widget";

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
  const [notas, setNotas] = React.useState("");
  const [notasVisual, setNotasVisual] = React.useState([""]);

  React.useEffect(() => {
    let notasLocal = notas.split(",");
    setNotasVisual(notasLocal);
  }, [notas]);

  async function onSubmit(e: any) {
    setDisabilitarBotao(true);
    for (let nota in notasVisual) {
      if (notasVisual[nota]?.trim().length != 0) {
        const dadosSaida: ModelSaida = {
          motorista: e.motorista,
          notaFiscal: Number(notasVisual[nota]),
          cidadeDestino: e.cidadeDestino,
          codigoEntrega: e.codigoEntrega,
          hodometro: e.hodometro,
          nomeConferente: e.conferente,
          obs: e.obs == "" ? "Nenhuma Observação" : e.obs,
          placa: e.placa,
          images: e.images,
          setor: "saida",
        };
        await sendThisToDatabase(
          "/api/methodsdatabase/create",
          dadosSaida,
          300
        );
      }
    }
    window.location.reload();
  }

  return (
    <div>
      <img
        src="/logoce (2).svg"
        style={{ width: 70, marginLeft: 15, marginTop: 15 }}
      />
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
          marginTop: 150,
        }}
      >
        <h3 style={{ textAlign: "center", marginBottom: 30 }}>
          Carregamento do Caminhão
        </h3>
        <TextField
          {...register("codigoEntrega", {
            value: Math.floor(Math.random() * (9999 - 1000 + 1)) + 1000,
          })}
          sx={{ width: 250 }}
          disabled
          type="number"
          required
          id="codigoEntrega"
          label="Código da entrega"
          variant="outlined"
        />
        <br />
        <br />
        <TextField
          {...register("numeroNotaFiscal")}
          sx={{ width: 250 }}
          value={notas}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setNotas(event.target.value);
          }}
          required
          id="numeroNotaFiscal"
          label="Número Nota Fiscal"
          variant="outlined"
        />
        <div style={{ marginTop: 5 }}>
          <p>Numero de Notas a serem enviadas</p>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {notasVisual.map((item, index) => {
              return (
                <div
                  key={index}
                  style={{
                    marginLeft: 4,
                    color: "#fff",
                    background: "#058FED",
                    padding: 10,
                    borderRadius: 5,
                  }}
                >
                  {item}
                </div>
              );
            })}
          </div>
        </div>
        <br />
        <br />

        <CustomSelect_Widget
          labelText={"Conferente:"}
          register={register("conferente")}
          itens={[
            { value: "Max", visualValue: "Max" },
            { value: "Eduardo M.", visualValue: "Eduardo M." },
            { value: "Cristiano", visualValue: "Cristiano" },
            { value: "Matheus", visualValue: "Matheus" },
            { value: "Manoel", visualValue: "Manoel" },
            { value: "Everton", visualValue: "Everton" },
          ]}
        />
        <br />
        <br />
        <CustomSelect_Widget
          labelText={"Placa:"}
          register={register("placa")}
          itens={[
            { value: "IYW7921", visualValue: "IYW7921" },
            { value: "JCS8G59", visualValue: "JCS8G59" },
            { value: "JCS8670", visualValue: "JCS8670" },
            { value: "IWC5261", visualValue: "IWC5261" },
            { value: "JBD7E59", visualValue: "JBD7E59" },
            { value: "IZT1E84", visualValue: "IZT1E84" },
            { value: "IVO1603", visualValue: "IVO1603" },
            { value: "AZI2E30", visualValue: "AZI2E30" },
            { value: "ITA7784", visualValue: "ITA7784" },
            { value: "IUT9E76", visualValue: "IUT9E76" },
            { value: "IST6840", visualValue: "IST6840" },
            { value: "JBD9H36", visualValue: "JBD9H36" },
            { value: "JBT9A29", visualValue: "JBT9A29" },
            { value: "JBS7F81", visualValue: "JBS7F81" },
          ]}
        />
        <br />
        <br />
        <CustomSelect_Widget
          labelText={"Motorista:"}
          register={register("motorista")}
          itens={[
            { value: "ALEXANDRE", visualValue: "ALEXANDRE" },
            { value: "DIONATHA", visualValue: "DIONATHA" },
            { value: "DOUGLAS", visualValue: "DOUGLAS" },
            { value: "IGON", visualValue: "IGON" },
            { value: "JULIANO", visualValue: "JULIANO" },
            { value: "CLAUDEMIR", visualValue: "CLAUDEMIR" },
            { value: "VANDERLEI", visualValue: "VANDERLEI" },
            { value: "VILNEI", visualValue: "VILNEI" },
            { value: "MAX", visualValue: "MAX" },
            { value: "CRISTIANO", visualValue: "CRISTIANO" },
            { value: "PAULO ALEXANDRE", visualValue: "PAULO ALEXANDRE" },
            { value: "RONALDO", visualValue: "RONALDO" },
            { value: "VANDERSON", visualValue: "VANDERSON" },
            { value: "ROGER", visualValue: "ROGER" },
          ]}
        />
        <br />
        <br />

        <TextField
          {...register("hodometro")}
          sx={{ width: 250 }}
          type="number"
          required
          id="hodometro"
          label="hodometro"
          variant="outlined"
        />
        <br />
        <br />

        <TextField
          {...register("cidadeDestino")}
          sx={{ width: 250 }}
          required
          id="cidadeDestino"
          label="cidadeDestino"
          variant="outlined"
        />
        <br />
        <br />

        <TextField
          {...register("obs")}
          sx={{ width: 250, height: 350 }}
          type="text"
          id="obs"
          label="Observação"
          variant="outlined"
        />
        <br />
        <br />

        <Button type="submit" disabled={disabilitarBotao} variant="contained">
          Enviar
        </Button>
      </form>
    </div>
  );
};

export default retorno;
