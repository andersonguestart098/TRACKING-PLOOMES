import React, { useState } from "react";

import { useFetch } from "@hooks/useFetch";
import { ModelLogistica } from "@models/setoresInterface";
import CustomTable from "@components/customtable";
import CustomNavBar from "@components/customAppBar";
import CustomInput from "@components/customInput";
import CustomSelect from "@components/customSelect";

import {
  Chip,
  CircularProgress,
  Pagination,
  TableCell,
  TableRow,
} from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import { motion } from "framer-motion";
import Loader from "@components/loader";
import CustomSelect_Widget from "@components/customSelect_widget";
import color from "~/config/colors";
import ItemNaoEncontrado from "@components/itemNaoEncontrado";

interface typeDB {
  result: ModelLogistica[];
  lengthDB: number;
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {
      session,
    },
  };
};

function index() {
  const { data: dataAuth } = useSession();
  const [pagina, setPagina] = useState(0);

  const [travarAuto, setTravarAuto] = useState(false);
  const [searchString, setSearchString] = useState("{}");

  //! VALOR PADRAO DE FILTRO DE PESQUISA (VALOR DO DB)
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
        "logistica",
        searchString
      )
    : useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "logistica");

  //! LOADER DE CARREGAMENTO
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* //! BARRA DE PESQUISA */}
      <CustomNavBar
        setor="LOGISTICA"
        setSearchString={setSearchString}
        setValueInputChange={setValueInputChange}
        searchString={searchString}
        filter={filterInput}
        setSearch={setTravarAuto}
        dados={dataAuth}
        filterData={[
          ["dataCriacao"],
          [
            {
              updatedAt: {
                gte: new Date(valueInputChange),
              },
            },
          ],
        ]}
      />

      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}
      <div style={{ textAlign: "center" }}>
        <p>Filtrar ao digitar: </p>
        <div>
          <Chip
            onClick={() => {
              setFilterInput("notaFiscal");
            }}
            sx={
              filterInput == "notaFiscal"
                ? { marginLeft: 2, background: "#6d6e6d80" }
                : { marginLeft: 2 }
            }
            label="Numero de Nota Fiscal"
            variant="outlined"
          />
        </div>
        <p>Filtro rapido: </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: 15,
            marginRight: 15,
          }}
        >
          <CustomSelect_Widget
            itens={[
              {
                value: "Cancelada",
                visualValue: "Cancelada",
                color: color.logistica.cancelada.background,
              },
              {
                value: "Aguardando Rota",
                visualValue: "Aguardando Rota",
                color: color.logistica.aguardandoRota.background,
              },
              {
                value: "Aguardando Vendedor",
                visualValue: "Aguardando Vendedor",
                color: color.logistica.aguardandoVendedor.background,
              },
              {
                value: "Cancelada",
                visualValue: "Notas",
                color: color.logistica.cancelada.background,
              },
              {
                value: "Nota fiscal sendo encaminhada para o setor",
                visualValue: "Nota fiscal sendo encaminhada para o setor",
                color: color.logistica.notaFiscalSendoEnviada.background,
              },
              {
                value: "Em Transito - ALEXANDRE",
                visualValue: "Em Transito - ALEXANDRE",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - Dionathan",
                visualValue: "Em Transito - Dionathan",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - DOUGLAS",
                visualValue: "Em Transito - DOUGLAS",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - IGON",
                visualValue: "Em Transito - IGON",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - JULIANO",
                visualValue: "Em Transito - JULIANO",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - CLAUDEMIR",
                visualValue: "Em Transito - CLAUDEMIR",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - PAULO ALEXANDRE",
                visualValue: "Em Transito - PAULO ALEXANDRE",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - VANDERLEI",
                visualValue: "Em Transito - VANDERLEI",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - VILNEI",
                visualValue: "Em Transito - VILNEI",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - MAX",
                visualValue: "Em Transito - MAX",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - CRISTIANO",
                visualValue: "Em Transito - CRISTIANO",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - RONALDO",
                visualValue: "Em Transito - RONALDO",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - VANDERSON",
                visualValue: "Em Transito - VANDERSON",
                color: color.logistica.emTransito.background,
              },
              {
                value: "Em Transito - ROGER",
                visualValue: "Em Transito - ROGER",
                color: color.logistica.emTransito.background,
              },
            ]}
            onChangeValue={(e) => {
              let currentFilter = JSON.parse(searchString);
              currentFilter.statusNotaFiscal = e.target.value;
              setSearchString(JSON.stringify(currentFilter));
              setTravarAuto(true);
            }}
            labelText={"Status Nota Fiscal"}
          />

          <CustomSelect_Widget
            itens={[
              { value: "Dieimes", visualValue: "Dieimes" },
              { value: "Miquéias", visualValue: "Miquéias" },
              { value: "Cristiano S.", visualValue: "Cristiano S." },
              { value: "Vanderlei", visualValue: "Vanderlei" },
            ]}
            onChangeValue={(e) => {
              let currentFilter = JSON.parse(searchString);
              currentFilter.responsavelNotaFiscal = e.target.value;
              setSearchString(JSON.stringify(currentFilter));
              setTravarAuto(true);
            }}
            labelText={"Responsavel Nota Fiscal"}
          />
        </div>
        <Chip
          onClick={() => {
            setSearchString("{}");
          }}
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
              <TableCell style={{ background: "#e1ebf0" }}>Número|NF</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Cliente</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Responsável|NF
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Status|NF</TableCell>
            </TableRow>
          }
          childrenRowTable={data!.result.map((item: ModelLogistica) => {
            return (
              <TableRow
                component={motion.div}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0, 0.71, 0.2, 1.01],
                }}
                key={item.id}
                style={
                  item.statusNotaFiscal == "Em Transito - ALEXANDRE"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - Dionathan"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - DOUGLAS"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - IGON"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - JULIANO"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - CLAUDEMIR"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - PAULO ALEXANDRE"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - VANDERLEI"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - VILNEI"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - MAX"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - CRISTIANO"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - RONALDO"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - ROGER"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Em Transito - VANDERSON"
                    ? color.logistica.emTransito
                    : item.statusNotaFiscal == "Cancelada"
                    ? color.logistica.cancelada
                    : item.statusNotaFiscal == "Aguardando Rota"
                    ? color.logistica.aguardandoRota
                    : item.statusNotaFiscal == "não definido"
                    ? color.logistica.pendente
                    : item.statusNotaFiscal == "Aguardando Vendedor"
                    ? color.logistica.aguardandoVendedor
                    : item.statusNotaFiscal == "Em Separação"
                    ? color.logistica.emSeparacao
                    : item.statusNotaFiscal == "a definir"
                    ? color.logistica.aDefinir
                    : item.statusNotaFiscal == ""
                    ? { background: "#f28538" }
                    : {}
                }
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell>{item.id}</TableCell>
                <TableCell>
                  {new Date(String(item.createdAt)).getDate()}/
                  {new Date(String(item.createdAt)).getMonth() + 1}/
                  {new Date(String(item.createdAt)).getFullYear()}
                  <br /> {new Date(String(item.createdAt)).getHours()}:
                  {new Date(String(item.createdAt)).getMinutes()}
                </TableCell>
                <TableCell>{item.author?.notaFiscal}</TableCell>
                <TableCell>{item.author?.cliente}</TableCell>
                <TableCell>
                  <CustomSelect
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_responsavelNotaFiscal"
                    value="responsavelNotaFiscal"
                    tags={["Dieimes", "Miquéias", "Cristiano S.", "Vanderlei"]}
                    setor="logistica"
                  />
                </TableCell>
                <TableCell>
                  {item.statusNotaFiscal === "Em Transito - ALEXANDRE" ? (
                    <>
                      <img
                        src={"/icones/alexandre.png"}
                        alt="Alexandre"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - alexandre.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - Dionathan" ? (
                    <>
                      <img
                        src={"/icones/dionathan.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - dionathan.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - WILLIAM" ? (
                    <>
                      <img
                        src={"/icones/william.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - dionathan.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - Dionathan" ? (
                    <>
                      <img
                        src={"/icones/dionathan.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - dionathan.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - CRISTIANO" ? (
                    <>
                      <img
                        src={"/icones/cristiano S..png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - paulo alexandre.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - MAX" ? (
                    <>
                      <img
                        src={"/icones/max.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />

                      <img
                        src={"/icones/em transito - paulo alexandre.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - VILNEI" ? (
                    <>
                      <img
                        src={"/icones/vilnei.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - paulo alexandre.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal ===
                    "Em Transito - PAULO ALEXANDRE" ? (
                    <>
                      <img
                        src={"/icones/paulo.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - paulo alexandre.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - VANDERLEI" ? (
                    <>
                      <img
                        src={"/icones/vanderlei.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - paulo alexandre.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - JULIANO" ? (
                    <>
                      <img
                        src={"/icones/juliano.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - dionathan.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - IGON" ? (
                    <>
                      <img
                        src={"/icones/igon.png"}
                        alt="Dionathan"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - dionathan.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - RONALDO" ? (
                    <>
                      <img
                        src={"/icones/RONALDO.png"}
                        alt="RONALDO"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - dionathan.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal === "Em Transito - ANDRE LUIS" ? (
                    <>
                      <img
                        src={"/icones/ANDRELUIS.png"}
                        alt="ANDRELUIS"
                        width={80}
                        style={{
                          borderRadius: "50%",
                          border: "2px solid #3279a8",
                        }}
                      />
                      <img
                        src={"/icones/em transito - dionathan.png"}
                        alt="Caminhão"
                        width={80}
                      />
                    </>
                  ) : item.statusNotaFiscal !== "a definir" &&
                    item.statusNotaFiscal !== "não definido" ? (
                    <img
                      src={
                        "/icones/" +
                        item.statusNotaFiscal.toLowerCase() +
                        ".png"
                      }
                      alt={item.statusNotaFiscal}
                      width={80}
                    />
                  ) : (
                    <></>
                  )}
                  <CustomSelect
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_statusNotaFiscal"
                    value="statusNotaFiscal"
                    tags={[
                      "Aguardando Rota",
                      "Aguardando Vendedor",
                      "Cancelada",
                      "Em Transito - ALEXANDRE",
                      "Em Transito - Dionathan",
                      "Em Transito - DOUGLAS",
                      "Em Transito - IGON",
                      "Em Transito - JULIANO",
                      "Em Transito - CLAUDEMIR",
                      "Em Transito - PAULO ALEXANDRE",
                      "Em Transito - VANDERLEI",
                      "Em Transito - VILNEI",
                      "Em Transito - MAX",
                      "Em Transito - CRISTIANO",
                      "Em Transito - RONALDO",
                      "Em Transito - VANDERSON",
                      "Em Transito - ROGER",
                      "Nota fiscal sendo encaminhada para o setor",
                      "Em Separação",
                    ]}
                    setor="logistica"
                  />
                </TableCell>
              </TableRow>
            );
          })}
          paginacao={
            <Pagination
              onChange={(_, value) => {
                value = value - 1;
                setPagina(value);
              }}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                padding: 50,
              }}
              count={Math.ceil(data.lengthDB / 40)}
            />
          }
        />
      ) : (
        <ItemNaoEncontrado />
      )}
    </>
  );
}

export default index;
