import React, { useState } from 'react';
import { useFetch } from "@hooks/useFetch";
import { ModelFeedBack, ModelOcorrencia } from '@models/setoresInterface';
import CustomTable from "@components/customtable";
import CustomNavBar from "@components/customAppBar";
import CustomInput from '@components/customInput';
import CustomSelect from '@components/customSelect';
import { Chip, Pagination, TableCell, TableRow } from "@mui/material";
import { getSession, useSession } from 'next-auth/react';
import { GetServerSideProps } from 'next/types';
import color from '~/config/colors';
import { motion } from 'framer-motion';
import Loader from '@components/loader';
import ItemNaoEncontrado from '@components/itemNaoEncontrado';
import { Tooltip } from '@mui/material';

interface typeDB {
  result: ModelFeedBack[]
  lengthDB: number
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const session = await getSession(ctx)

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false
      }
    }
  }

  return {
    props: {
      session
    }
  }
}

function index() {
  const { data: dataAuth } = useSession()
  const [pagina, setPagina] = useState(0)

  const [travarAuto, setTravarAuto] = useState(false)
  const [searchString, setSearchString] = useState("{}")

  //! VALOR PADRAO DE FILTRO DE PESQUISA (VALOR DO DB)
  const [filterInput, setFilterInput] = useState('notaFiscalP')

  const [valueInputChange, setValueInputChange] = useState('')

  React.useEffect(() => {
    if (searchString == "{}") {
      setTravarAuto(false)
    }
  }, [searchString])

  const { data, isLoading } = travarAuto ?
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "feedBack", searchString) :
    useFetch<typeDB>("/api/methodsdatabase/getall", pagina, "feedBack")

  //! LOADER DE CARREGAMENTO
  if (isLoading) {
    return (
      <Loader />
    )
  }

  return (
    <>
      {/* //! BARRA DE PESQUISA */}
      <CustomNavBar
        setor="FEEDBACK"
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
                gte: new Date(valueInputChange)
              }
            },
          ]
        ]}
      />
      {/* //! MAIS OPÇÔES DE FILTRO (ODF) */}
      <div style={{ textAlign: "center" }}>
        <p>Filtro rapido: </p>
        <div style={{ display: "flex", justifyContent: "space-between", marginLeft: 15, marginRight: 15 }}>

        </div>
        <Chip onClick={() => {
          setSearchString("{}")
        }} sx={{ marginTop: 2 }} label="Tirar Todos Filtros" variant="outlined" />
      </div>
      <br />
      {data.result.length ?
        <CustomTable
          childrenCabecarioTable={
            <TableRow>
              <TableCell style={{ background: "#e1ebf0" }}>Id</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Data|Abertura</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Nome</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Nota</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Motivo|Nota</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Pontos|Melhorias</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Gostaria|ver</TableCell>
              <TableCell style={{ background: "#e1ebf0" }}>Observações</TableCell>
            </TableRow>
          }
          childrenRowTable={
            data!.result.map((item: ModelFeedBack) => {
              return (
                <TableRow
                  component={motion.div}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: [0, 0.71, 0.2, 1.01]
                  }}
                  key={item.id}
                  style={
                    item.nome == "RESOLVIDO" ? color.financeiro.emitida : {}
                  }
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell>{item.id}</TableCell>
                  <TableCell>{new Date(String(item.createdAt)).getDate()}/{new Date(String(item.createdAt)).getMonth() + 1}/{new Date(String(item.createdAt)).getFullYear()}
                    <br /> {new Date(String(item.createdAt)).getHours()}:{new Date(String(item.createdAt)).getMinutes()}</TableCell>
                    <TableCell>{item.nome}</TableCell>
                  <TableCell>{item.avalie}</TableCell>
                  <TableCell className="cell-descricao" style={{ maxWidth: '280px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <Tooltip title={item.nota} arrow>
                      <div
                        data-tip={item.nota}
                        data-for={`descricao-tooltip-${item.id}`}
                        className="tooltip-cell"
                        style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                      >
                        {item.nota}
                      </div>
                    </Tooltip>
                  </TableCell>
                    <TableCell>{item.pontos}</TableCell>
                  <TableCell>{item.gostaria}</TableCell>
                  <TableCell className="cell-descricao" style={{ maxWidth: '280px', overflow: 'hidden', whiteSpace: 'nowrap' }}>
                    <Tooltip title={item.obs} arrow>
                      <div
                        data-tip={item.obs}
                        data-for={`descricao-tooltip-${item.id}`}
                        className="tooltip-cell"
                        style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}
                      >
                        {item.obs}
                      </div>
                    </Tooltip>
                  </TableCell>
                </TableRow>
              )
            })
          } paginacao={
            <Pagination onChange={(_, value) => {
              value = value - 1
              setPagina(value)
            }} style={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 50 }} count={Math.ceil(data.lengthDB / 40)} />
          } />
        : <ItemNaoEncontrado />}
    </>
  )
}

export default index;
