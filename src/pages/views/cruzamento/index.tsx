import React, { useState } from "react";
import { useFetch } from "@hooks/useFetch";
import {
  Chip,
  CircularProgress,
  Pagination,
  TableCell,
  TableRow,
} from "@mui/material";
import CustomTable from "@components/customtable";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import CustomNavBar from "@components/customAppBar";
import {
  ModelCanhoto,
  ModelConfirmacaoEntrega,
  ModelCruzamento,
  ModelExpedicao2,
} from "@models/setoresInterface";
import Loader from "@components/loader";
import CustomSelect_Widget from "@components/customSelect_widget";
import color from "~/config/colors";
import { motion } from "framer-motion";
import ItemNaoEncontrado from "@components/itemNaoEncontrado";

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
  const [filterInput, setFilterInput] = useState("notaFiscalP");

  const [valueInputChange, setValueInputChange] = useState("");

  React.useEffect(() => {
    if (searchString == "{}") {
      setTravarAuto(false);
    }
  }, [searchString]);

  const { data, isLoading } = travarAuto
    ? useFetch(
        "/api/methodsdatabase/getall",
        pagina,
        "cruzamento",
        searchString
      )
    : useFetch("/api/methodsdatabase/getall", pagina, "cruzamento");

  console.log(data);

  //! LOADER DE CARREGAMENTO
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      <CustomNavBar
        setor="RASTREAMENTO"
        setSearchString={setSearchString}
        setValueInputChange={setValueInputChange}
        searchString={searchString}
        filter={filterInput}
        setSearch={setTravarAuto}
        dados={dataAuth}
        filterData={[
          ["cliente"],
          [
            {
              financeiroPassagem: {
                every: {
                  cliente: {
                    contains: valueInputChange,
                  },
                },
              },
            },
          ],
        ]}
      />

      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
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
              <TableCell style={{ background: "#e1ebf0" }}>
                Id (Financeiro)
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Número NF (Financeiro)
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Vendedor (Financeiro)
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Cliente (Financeiro)
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Valor(Financeiro)
              </TableCell>
              <TableCell style={{ background: "#D3EEFF" }}>
                Status (Financeiro)
              </TableCell>
              <TableCell style={{ background: "#b5d6d6" }}>
                Status (Expedicao)
              </TableCell>
              <TableCell style={{ background: "#eaf2d7" }}>
                Status (Expedicao 2)
              </TableCell>
              <TableCell style={{ background: "#efcfe3" }}>
                Status (Logistica)
              </TableCell>
              <TableCell style={{ background: "#caffbf" }}>
                Status (Confirmacao Entrega)
              </TableCell>
              <TableCell style={{ background: "#fdffb6" }}>
                Status (Canhoto)
              </TableCell>
            </TableRow>
          }
          childrenRowTable={data.result.map((item: any, index: number) => {
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
                key={index}
              >
                <TableCell>{item?.financeiroPassagem[0]?.id}</TableCell>
                <TableCell
                  style={
                    item?.financeiroPassagem[0]?.vendedor == undefined
                      ? { background: "red" }
                      : {}
                  }
                >
                  <div style={{ textAlign: "center" }}>
                    {item?.financeiroPassagem[0]?.vendedor && (
                      <>
                        <div style={{ marginBottom: "10px" }}>
                          <img
                            src={`/icones/${item?.financeiroPassagem[0]?.vendedor.toLowerCase()}.png`}
                            alt={item?.financeiroPassagem[0]?.vendedor}
                            style={{
                              width: "110px",
                              height: "110px",
                              borderRadius: "50%",
                              border: "2px solid #3279a8",
                            }}
                          />
                        </div>
                        <div
                          style={{
                            background: "#3279a8",
                            color: "white",

                            borderRadius: "10px",
                            fontSize: "14px",
                          }}
                        >
                          <p style={{ padding: 5 }}>
                            {item?.financeiroPassagem[0]?.vendedor ??
                              "NAO ENVIADO A ESSE SETOR"}
                          </p>
                        </div>
                      </>
                    )}
                  </div>
                </TableCell>

                <TableCell
                  style={
                    item.notaFiscal == undefined ? { background: "yellow" } : {}
                  }
                >
                  {item.notaFiscal ?? "NF AINDA NÃO EMITIDA"}
                </TableCell>

                <TableCell
                  style={
                    item?.cliente == undefined ? { background: "yellow" } : {}
                  }
                >
                  {item?.cliente ?? "NAO ENVIADO A ESSE SETOR"}
                </TableCell>

                <TableCell
                  style={
                    item?.financeiroPassagem[0]?.valor == undefined
                      ? { background: "yellow" }
                      : {}
                  }
                >
                  {item?.financeiroPassagem[0]?.valor ??
                    "NAO ENVIADO A ESSE SETOR"}
                </TableCell>

                <TableCell
                  style={
                    item?.financeiroPassagem[0]?.statusNotaFiscal == "Cancelada"
                      ? color.financeiro.cancelada
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "Emitida"
                      ? color.financeiro.emitida
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "Retornou"
                      ? color.financeiro.retornou
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "Boleto em aberto"
                      ? color.financeiro.boletoAberto
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "Aguardando deposito"
                      ? color.financeiro.aguardadoDeposito
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "Em analise"
                      ? color.financeiro.emAnalise
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "não definido"
                      ? color.financeiro.pendente
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "Cancelada"
                      ? color.financeiro.cancelada
                      : item?.financeiroPassagem[0]?.statusNotaFiscal ==
                        "Pendente"
                      ? color.financeiro.pendente
                      : {}
                  }
                >
                  <img
                    src={`/icones/${item?.financeiroPassagem[0]?.statusNotaFiscal.toLowerCase()}.png`}
                    alt={item?.financeiroPassagem[0]?.statusNotaFiscal}
                    style={{
                      width: "70px",
                      height: "70px",
                    }}
                  />
                  <div
                    style={{
                      background: "#3279a8",
                      color: "white",
                      borderRadius: "10px",
                      fontSize: "14px",
                    }}
                  ></div>
                  {item?.financeiroPassagem[0]?.statusNotaFiscal}
                </TableCell>

                <TableCell
                  style={
                    item?.expedicaoPassagem[0]?.statusNotaFiscal ===
                    "Cliente Retirou"
                      ? color.expedicao.clienteRetirou
                      : item?.expedicaoPassagem[0]?.statusNotaFiscal ===
                        "a definir"
                      ? color.expedicao.naoDefinido
                      : item?.expedicaoPassagem[0]?.statusNotaFiscal ===
                        "Em Separação"
                      ? color.expedicao.emSeparacao
                      : item?.expedicaoPassagem[0]?.statusNotaFiscal ===
                        "Cancelada"
                      ? color.expedicao.cancelada
                      : item?.expedicaoPassagem[0]?.statusNotaFiscal ===
                        "Aguardando Cliente"
                      ? color.expedicao.pendente
                      : {}
                  }
                >
                  {item?.expedicaoPassagem[0]?.statusNotaFiscal && (
                    <div>
                      {item?.expedicaoPassagem[0]?.statusNotaFiscal !==
                        "não definido" && (
                        <img
                          src={`/icones/${item?.expedicaoPassagem[0]?.statusNotaFiscal.toLowerCase()}.png`}
                          alt={item?.expedicaoPassagem[0]?.statusNotaFiscal}
                          style={{
                            width: "70px",
                            height: "70px",
                          }}
                        />
                      )}
                      <div
                        style={{
                          background: "#3279a8",
                          color: "white",
                          borderRadius: "10px",
                          fontSize: "14px",
                        }}
                      ></div>
                    </div>
                  )}
                  {item?.expedicaoPassagem[0]?.statusNotaFiscal}
                </TableCell>

                <TableCell
                  style={
                    item?.expedicao2Passagem[0]?.statusNotaFiscal ===
                    "Cliente Retirou"
                      ? color.expedicao2.clienteRetirou
                      : item?.expedicao2Passagem[0]?.statusNotaFiscal ===
                        "Aguardando Transportadora"
                      ? color.expedicao2.aguardandoTransportadora
                      : item?.expedicao2Passagem[0]?.statusNotaFiscal ===
                        "a definir"
                      ? color.expedicao.naoDefinido
                      : item?.expedicao2Passagem[0]?.statusNotaFiscal ===
                        "Em Separação"
                      ? color.expedicao.emSeparacao
                      : item?.expedicao2Passagem[0]?.statusNotaFiscal ===
                        "Cancelada"
                      ? color.expedicao.cancelada
                      : item?.expedicao2Passagem[0]?.statusNotaFiscal ===
                        "Aguardando Cliente"
                      ? color.expedicao2.aguardandoCliente
                      : {}
                  }
                >
                  {item?.expedicao2Passagem[0]?.statusNotaFiscal && (
                    <div>
                      {item?.expedicao2Passagem[0]?.statusNotaFiscal !==
                        "não definido" && (
                        <img
                          src={`/icones/${item?.expedicao2Passagem[0]?.statusNotaFiscal.toLowerCase()}.png`}
                          alt={item?.expedicao2Passagem[0]?.statusNotaFiscal}
                          style={{
                            width: "70px",
                            height: "70px",
                          }}
                        />
                      )}
                      <div
                        style={{
                          background: "#3279a8",
                          color: "white",
                          borderRadius: "10px",
                          fontSize: "14px",
                        }}
                      ></div>
                    </div>
                  )}
                  {item?.expedicao2Passagem[0]?.statusNotaFiscal}
                </TableCell>

                <TableCell
                  style={
                    item?.logisticaPassagem[0]?.statusNotaFiscal &&
                    item?.logisticaPassagem[0]?.statusNotaFiscal !==
                      "não definido"
                      ? item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - ALEXANDRE" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - Dionathan" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - DOUGLAS" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - IGON" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - JULIANO" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - MATHEUS" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - PAULO ALEXANDRE" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - VANDERLEI" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - VILNEI" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - MAX" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - CRISTIANO" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito - WILLIAM" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Aguardando Rota" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Aguardando Vendedor" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Boleto em aberto" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Transito" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "a definir" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Em Separação" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Cancelada" ||
                        item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "Pendente"
                        ? item?.logisticaPassagem[0]?.statusNotaFiscal ===
                          "a definir"
                          ? { background: "#f2c335" }
                          : item?.logisticaPassagem[0]?.statusNotaFiscal ===
                            "Aguardando Rota"
                          ? { background: "#d851f0" }
                          : item?.logisticaPassagem[0]?.statusNotaFiscal ===
                            "Aguardando Vendedor"
                          ? { background: "#5256bf" }
                          : color.logistica.emTransito
                        : {}
                      : {}
                  }
                >
                  {item?.logisticaPassagem[0]?.statusNotaFiscal && (
                    <div>
                      {item?.logisticaPassagem[0]?.statusNotaFiscal !==
                        "não definido" && (
                        <img
                          src={`/icones/${item?.logisticaPassagem[0]?.statusNotaFiscal.toLowerCase()}.png`}
                          alt={item?.logisticaPassagem[0]?.statusNotaFiscal}
                          style={{
                            width: "70px",
                            height: "70px",
                          }}
                        />
                      )}
                      <div
                        style={{
                          background: "#3279a8",
                          color: "white",
                          borderRadius: "10px",
                          fontSize: "14px",
                        }}
                      ></div>
                    </div>
                  )}
                  {item?.logisticaPassagem[0]?.statusNotaFiscal}
                </TableCell>

                {/* //! o 1 do dado abaixo referencia ao confirmção entrega*/}
                <TableCell
                  style={
                    data.nonFlux[1][index].entregaConcluida === "Sim" ||
                    data.nonFlux[1][index].entregaConcluida === "ENTREGUE"
                      ? { background: "#38f269" }
                      : {}
                  }
                >
                  {data.nonFlux[1][index].entregaConcluida === "Sim" ||
                  data.nonFlux[1][index].entregaConcluida === "ENTREGUE" ? (
                    <div>
                      <img
                        src="/icones/sim.png"
                        alt="Sim"
                        style={{ width: "70px", height: "70px" }}
                      />
                      <div>{data.nonFlux[1][index].entregaConcluida}</div>
                    </div>
                  ) : null}
                </TableCell>

                {/* //! o 0 do dado abaixo referencia ao canhoto*/}
                <TableCell
                  style={
                    data.nonFlux[0][index].statusCanhoto === "Concluido"
                      ? { background: "#38f269" }
                      : { background: "red" }
                  }
                >
                  {data.nonFlux[0][index].statusCanhoto === "Concluido" ? (
                    <div>
                      <img
                        src="/icones/concluido.png"
                        alt="Concluído"
                        style={{ width: "70px", height: "70px" }}
                      />
                      <div>Concluído</div>
                    </div>
                  ) : null}
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
