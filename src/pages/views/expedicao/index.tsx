import React, { useState } from "react";

import { useFetch } from "@hooks/useFetch";
import { ModelExpedicao } from "@models/setoresInterface";
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
import CustomSelect_Widget from "@components/customSelect_widget";
import color from "~/config/colors";
import Loader from "@components/loader";
import { motion } from "framer-motion";
import ItemNaoEncontrado from "@components/itemNaoEncontrado";

interface typeDB {
  result: ModelExpedicao[];
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
        "expedicao",
        searchString
      )
    : useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "expedicao");

  //! LOADER DE CARREGAMENTO
  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* //! BARRA DE PESQUISA */}
      <CustomNavBar
        setor="EXPEDIÇÃO"
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
                value: "Aguardando Cliente",
                visualValue: "Aguardando Cliente",
                color: color.expedicao.aguardandoCliente.background,
              },
              {
                value: "Cliente Retirou",
                visualValue: "Cliente Retirou",
                color: color.expedicao.clienteRetirou.background,
              },
              {
                value: "Cancelada",
                visualValue: "Cancelada",
                color: color.expedicao.cancelada.background,
              },
              {
                value: "Nota fiscal sendo encaminhada para o setor",
                visualValue: "Nota fiscal sendo encaminhada para o setor",
                color: color.expedicao.notaFiscalSendoEnviada.background,
              },
              {
                value: "Aguardando Transportadora",
                visualValue: "Aguardando Transportadora",
                color: color.expedicao.pendente.background,
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
              { value: "Max", visualValue: "Max" },
              { value: "Eduardo", visualValue: "Eduardo" },
              { value: "Cristiano S.", visualValue: "Cristiano S." },
              { value: "Everton", visualValue: "Everton" },
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
          childrenRowTable={data!.result.map((item: ModelExpedicao) => {
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
                  item.statusNotaFiscal == "Aguardando Cliente"
                    ? color.expedicao.aguardandoCliente
                    : item.statusNotaFiscal == "Aguardando Transportadora"
                    ? color.expedicao.aguardandoCliente
                    : item.statusNotaFiscal == "Cliente Retirou"
                    ? color.expedicao.clienteRetirou
                    : item.statusNotaFiscal == "Em Separação"
                    ? color.expedicao.emSeparacao
                    : item.statusNotaFiscal == "Cancelada"
                    ? color.expedicao.cancelada
                    : item.statusNotaFiscal == "não definido"
                    ? color.expedicao.naoDefinido
                    : item.statusNotaFiscal == "a definir"
                    ? color.expedicao.pendente
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
                  {item.responsavelNotaFiscal != "a definir" ? (
                    <img
                      src={
                        "/icones/" +
                        item.responsavelNotaFiscal.toLowerCase() +
                        ".png"
                      }
                      alt={item.responsavelNotaFiscal}
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
                    metadata="_responsavelNotaFiscal"
                    value="responsavelNotaFiscal"
                    tags={["Max", "Cristiano S.", "Eduardo M.", "Everton"]}
                    setor="expedicao"
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
                      "Aguardando Cliente",
                      "Cliente Retirou",
                      "Cancelada",
                      "Em Separação",
                    ]}
                    setor="expedicao"
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
