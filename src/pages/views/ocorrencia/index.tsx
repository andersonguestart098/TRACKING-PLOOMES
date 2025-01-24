import React, { useState } from "react";
import { useFetch } from "@hooks/useFetch";
import { ModelOcorrencia } from "@models/setoresInterface";
import CustomTable from "@components/customtable";
import CustomNavBar from "@components/customAppBar";
import CustomInput from "@components/customInput";
import CustomSelect from "@components/customSelect";
import { Chip, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from "next-auth/react";
import { GetServerSideProps } from "next/types";
import color from "~/config/colors";
import { motion } from "framer-motion";
import Loader from "@components/loader";
import ItemNaoEncontrado from "@components/itemNaoEncontrado";
import { Tooltip } from "@mui/material";

interface typeDB {
  result: ModelOcorrencia[];
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
        "ocorrencia",
        searchString
      )
    : useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "ocorrencia");

  //! LOADER DE CARREGAMENTO

  if (isLoading) {
    return <Loader />;
  }

  return (
    <>
      {/* //! BARRA DE PESQUISA */}
      <CustomNavBar
        setor="OCORRENCIAS"
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
        <p>Filtro rapido: </p>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginLeft: 15,
            marginRight: 15,
          }}
        ></div>
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
              <TableCell style={{ background: "#e1ebf0" }}>
                Data|Abertura
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Descrição</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Gravidade</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Responsável
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Setor</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Prioridade
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Status</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Causa</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Resolução</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Gerou|Custo
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Especifique
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Data|Encerramento
              </TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>
                Observação
              </TableCell>
            </TableRow>
          }
          childrenRowTable={data!.result.map((item: ModelOcorrencia) => {
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
                  item.status == "RESOLVIDO"
                    ? color.financeiro.emitida
                    : item.status == "EM ANDAMENTO"
                    ? color.financeiro.emAnalise
                    : item.status == "NÃO RESOLVIDO"
                    ? color.financeiro.cancelada
                    : item.status == "PENDENTE"
                    ? color.financeiro.pendente
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
                <TableCell
                  className="cell-descricao"
                  style={{
                    maxWidth: "280px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Tooltip title={item.descricao} arrow>
                    <div
                      data-tip={item.descricao}
                      data-for={`descricao-tooltip-${item.id}`}
                      className="tooltip-cell"
                      style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                      {item.descricao}
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <CustomSelect
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_gravidade"
                    value="gravidade"
                    tags={["BAIXO", "MÉDIO", "ALTO"]}
                    setor="ocorrencia"
                  />
                </TableCell>
                <TableCell>{item.responsavel}</TableCell>
                <TableCell>{item.departamento}</TableCell>
                <TableCell>
                  <CustomSelect
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_prioridade"
                    setor="ocorrencia"
                    value="prioridade"
                    tags={["BAIXA", "MÉDIA", "ALTA"]}
                  />
                </TableCell>
                <TableCell>
                  <CustomSelect
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_status"
                    setor="ocorrencia"
                    value="status"
                    tags={[
                      "EM ANDAMENTO",
                      "RESOLVIDO",
                      "PENDENTE",
                      "NÃO RESOLVIDO",
                    ]}
                  />
                </TableCell>
                <TableCell
                  className="cell-descricao"
                  style={{
                    maxWidth: "280px",
                    overflow: "hidden",
                    whiteSpace: "nowrap",
                  }}
                >
                  <Tooltip title={item.causa} arrow>
                    <div
                      data-tip={item.causa}
                      data-for={`descricao-tooltip-${item.id}`}
                      className="tooltip-cell"
                      style={{ textOverflow: "ellipsis", overflow: "hidden" }}
                    >
                      {item.causa}
                    </div>
                  </Tooltip>
                </TableCell>
                <TableCell>
                  <CustomInput
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_resolucao"
                    setor="ocorrencia"
                  />
                </TableCell>
                <TableCell>
                  <CustomSelect
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_gerouCusto"
                    setor="ocorrencia"
                    value="gerouCusto"
                    tags={["SIM", "NÃO"]}
                  />
                </TableCell>
                <TableCell>
                  <CustomInput
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_especifique"
                    setor="ocorrencia"
                  />
                </TableCell>
                <TableCell>
                  <CustomInput
                    key={item.id}
                    item={item}
                    typeInput="text"
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_dataEncerramento"
                    setor="ocorrencia"
                  />
                </TableCell>
                <TableCell>
                  <CustomInput
                    key={item.id}
                    item={item}
                    routerEdit="/api/methodsdatabase/editDataWhere"
                    metadata="_obs"
                    setor="ocorrencia"
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
