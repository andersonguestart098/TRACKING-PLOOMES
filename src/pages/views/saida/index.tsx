import React, { useState } from "react";

import { useFetch } from "@hooks/useFetch";
import { ModelSaida } from "@models/setoresInterface";
import CustomTable from "@components/customtable";
import CustomNavBar from "@components/customAppBar";
import CustomInput from "@components/customInput";
import CustomSelect from "@components/customSelect";
import Loader from "@components/loader";
import color from "~/config/colors";

import {
  Button,
  Chip,
  CircularProgress,
  Pagination,
  TableCell,
  TableRow,
} from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import ItemNaoEncontrado from "~/components/itemNaoEncontrado";
import requestApi from "~/services/requestApi";

interface typeDB {
  result: [ModelSaida[], any];
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
  const [filterInput, setFilterInput] = useState("notaFiscalP");
  const [imgGigante, setImgGigante] = useState("");

  const [valueInputChange, setValueInputChange] = useState("");
  const [dataImg, setDataImg] = useState<any>([]);

  React.useEffect(() => {
    if (searchString == "{}") {
      setTravarAuto(false);
    }
  }, [searchString]);

  const { data, isLoading } = travarAuto
    ? useFetch<typeDB>(
        "/api/methodsdatabase/getall",
        pagina,
        "saida",
        searchString
      )
    : useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "saida");

  console.log(data);

  //! LOADER DE CARREGAMENTO
  if (isLoading) {
    return <Loader />;
  }

  if (isLoading) return <p>Loading...</p>;
  if (!data) return <p>No profile data</p>;

  return (
    <>
      {imgGigante.length ? (
        <div
          style={{
            zIndex: 5,
            position: "fixed",
            left: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            top: 0,
            background: "#00000080",
            width: "100vw",
            height: "100vh",
          }}
        >
          <div style={{ background: "0.0" }}>
            <img
              style={{ borderRadius: 25 }}
              width={580}
              height={580}
              src={imgGigante}
            />
          </div>
          <Button
            sx={{
              position: "absolute",
              right: 10,
              top: 10,
            }}
            color="error"
            onClick={() => setImgGigante("")}
            variant="contained"
          >
            X
          </Button>
        </div>
      ) : (
        <></>
      )}
      <CustomNavBar
        setor="CARREGAMENTO CAMINHÃO"
        setSearchString={setSearchString}
        setValueInputChange={setValueInputChange}
        searchString={searchString}
        filter={filterInput}
        setSearch={setTravarAuto}
        dados={dataAuth}
        filterData={[
          ["codigoEntrega"],
          [
            {
              codigoEntrega: {
                contains: valueInputChange,
              },
            },
          ],
        ]}
      />

      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}
      <div style={{ textAlign: "center" }}>
        <Chip
          onClick={() => {
            setSearchString("{}");
          }}
          sx={{ marginTop: 2 }}
          label="Tirar Todos Filtros"
          variant="outlined"
        />

        <Chip
          onClick={() => {
            setFilterInput("codigoEntrega");
          }}
          sx={
            filterInput == "codigoEntrega"
              ? { marginLeft: 2, background: "#6d6e6d80" }
              : { marginLeft: 2, marginTop: 2 }
          }
          label="Codigo Entrega"
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
              <TableCell style={{ background: "#e1ebf0" }}>Motorista</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Cód|Entrega
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Número|NF</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Conferente
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Placa</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Cidades|Destino
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Hodometro</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Fotos </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Observação
              </TableCell>
            </TableRow>
          }
          childrenRowTable={data!.result[0].map(
            (item: ModelSaida, idx: number) => {
              return (
                <TableRow
                  key={item.id}
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
                  <TableCell>
                    {item.motorista != "a definir" ? (
                      <img
                        src={"/icones/" + item.motorista.toLowerCase() + ".png"}
                        alt={item.motorista}
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
                      metadata="_motorista"
                      value="motorista"
                      tags={[
                        "DIONATHA",
                        "DOUGLAS",
                        "IGON",
                        "JULIANO",
                        "CLAUDEMIR",
                        "VANDERLEI",
                        "VILNEI",
                        "ANDRE LUIS",
                        "RONALDO",
                        "PAULO ALEXANDRE",
                      ]}
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>{item.codigoEntrega}</TableCell>
                  <TableCell>
                    <CustomInput
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_notaFiscal"
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>
                    {item.nomeConferente != "a definir" ? (
                      <img
                        src={
                          "/icones/" +
                          item.nomeConferente.toLowerCase() +
                          ".png"
                        }
                        alt={item.nomeConferente}
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
                      metadata="_nomeConferente"
                      value="nomeConferente"
                      tags={[
                        "Manoel",
                        "Dieimes",
                        "Cristiano D.",
                        "Matheus",
                        "Max",
                        "Eduardo M.",
                        "Everton",
                        "Cristiano S.",
                      ]}
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomSelect
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_placa"
                      value="placa"
                      tags={[
                        "YW7921",
                        "IWC5261",
                        "JBD7E59",
                        "IZT1E84",
                        "IWW7921",
                        "IVO1603",
                        "AZI2E30",
                        "ITA7784",
                        "IUT9476",
                        "IST6840",
                        "IVP0G05",
                        "JBD9H36",
                        "IXH8706",
                      ]}
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomInput
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_cidadeDestino"
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>
                    <CustomInput
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_hodometro"
                      setor="saida"
                    />
                  </TableCell>
                  <TableCell>
                    {item.images != null ? (
                      <div
                        style={{
                          width: 120,
                          height: 120,
                          borderRadius: 15,
                          overflowY: "scroll",
                        }}
                      >
                        {data.result[1][idx].map((itemImg: string) => {
                          return (
                            <img
                              style={{ borderRadius: 15 }}
                              src={itemImg}
                              width={100}
                              height={100}
                              onClick={() => setImgGigante(itemImg)}
                            />
                          );
                        })}
                      </div>
                    ) : (
                      <>Não contém imagem</>
                    )}
                  </TableCell>
                  <TableCell>
                    <CustomInput
                      key={item.id}
                      item={item}
                      routerEdit="/api/methodsdatabase/editDataWhere"
                      metadata="_obs"
                      setor="saida"
                    />
                  </TableCell>
                </TableRow>
              );
            }
          )}
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
