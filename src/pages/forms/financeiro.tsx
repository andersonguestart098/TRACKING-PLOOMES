import React, { useEffect, useState } from 'react'
import { Button, TextField } from '@mui/material'
import CustomInputMask from '@components/customInputMask'
import CustomSelect_Widget from '@components/customSelect_widget'
import { useForm } from 'react-hook-form'
import CustomRadio from '@components/customRadio'
import { ModelFinanceiro } from '~/models/setoresInterface'
import { sendThisToDatabase } from '~/services/sendData'

type Props = {}

const financeiro = ({}: Props) => {
  const { register, handleSubmit, formState: { errors } } = useForm()
  const [widthScreen, setWidthScreen] = useState(0)

  const [tipoFaturamentoOther , setTipoFaturamentoOther] = useState(false)
  const [tipoFaturamentoRM , setTipoFaturamentoRM] = useState(false)
  const [tipoFaturamentoN , setTipoFaturamentoN] = useState(false)

  const [entregaRetiraEI , setEntregaRetiraEI] = useState(false)
  const [entregaRetiraEA , setEntregaRetiraEA] = useState(false)
  const [entregaRetiraT , setEntregaRetiraT] = useState(false)

  const [vendaFreteSIM , setVendaFreteSIM] = useState(false)
  const [agendadoDataSim , setAgendadoDataSim] = useState(false)

  const [formaPGOAV , setFormaPGOAV] = useState(false)
  const [formaPGOCartao , setFormaPGOCartao] = useState(false)

  const [disabilitarBotao, setDisabilitarBotao] = useState(false)

  const [valorVendaInput, setValorVendaInput] = useState("")
  const [valorFreteInput, setValorFreteInput] = useState("")
  const [formaDePagamento, setFormaDePagamento] = useState("")

  
  useEffect(() => {
    setWidthScreen(window.innerWidth)
  },[])

  const onSubmit = async (data: any) => {
    await setDisabilitarBotao(true) 

    let dadosFinanceiro: ModelFinanceiro = {
      cliente: data.cliente,
      formaPagamento: formaDePagamento,
      bandeiraCartao: data.bandeira ?? "",
      dataEntrega: data.dataEntrega ?? "",
      entregaCadastro: data.entregaCadastro == "Sim" ? true : false ?? false,
      vendaFrete: data.vendaFrete == "Sim" ? true : false ?? false,
      localCobranca: data.localCobranca ?? "",
      observacao: data.obs == ""? "Nenhuma Observação" : data.obs,
      orcamento: data.orcamento ?? "",
      parcelas: data.parcelas ?? "",
      responsavelNotaFiscal: "...",
      retiraEntrega: data.entregaRetira ?? "",
      tipoFaturamento: data.tipoFaturamento ?? "",
      tipoFrete: data.tipoFrete ?? "",
      valor: valorVendaInput ?? "",
      observacaoFinanceiro: "...",
      operadorNotaFiscal: "...",
      statusNotaFiscal: "Pendente",
      freteConta: data.freteConta,
      valorFrete: valorFreteInput ?? "",
      vendedor: data.vendedor ?? "",
      setor: "financeiro"
    }

    await sendThisToDatabase("/api/methodsdatabase/create", dadosFinanceiro, 300)
    window.location.reload()
  }

  return (
    <div style={{display: "flex", justifyContent: "center", alignItems: "center", height: "100%", background: "#053C5E"}}>
      <form onSubmit={handleSubmit(onSubmit)} style={{background: "#F5F5F5", borderRadius: 10, padding: 10, marginTop: 100}}>
        <h3 style={{textAlign: "center"}}>Solicitação de Faturamento</h3>
        <hr />
        <div style={widthScreen > 600 ? {display: "flex", flexDirection: "row", 
          justifyContent: "space-between", width: "50%"} : {}}>
            <div style={{margin: 50}}>
              <CustomSelect_Widget
                labelText={'Vendedor:'}
                register={register("vendedor")} 
                itens={[
                  { value: "BETO", visualValue: "BETO" },
                  { value: "FELIPE", visualValue: "FELIPE" },
                  { value: "ALINE", visualValue: "ALINE" },
                  { value: "CRISTIAN", visualValue: "CRISTIAN" },
                  { value: "FAGUNDES", visualValue: "FAGUNDES" },
                  { value: "MARCIA", visualValue: "MARCIA" },
                  { value: "WAGNER", visualValue: "WAGNER" },
                  { value: "GELSON", visualValue: "GELSON" },
                  { value: "LUIS", visualValue: "LUIS" },
                  { value: "FERNANDO", visualValue: "FERNANDO" },
                  { value: "EDUARDO", visualValue: "EDUARDO" },
                  { value: "SANANDUVA", visualValue: "SANANDUVA" },
                  { value: "EDUARDO", visualValue: "EDUARDO" },
                  { value: "FAVRETTO", visualValue: "FAVRETTO" },
                  { value: "FERNANDA", visualValue: "FERNANDA" },
                  { value: "GASPAR", visualValue: "GASPAR" },
                  { value: "GILIARD", visualValue: "GILIARD" },
                  { value: "GILMAR", visualValue: "GILMAR" },
                  { value: "JONATHAS", visualValue: "JONATHAS" },
                  { value: "KOZAK", visualValue: "KOZAK" },
                  { value: "LEONARDO", visualValue: "LEONARDO" },
                  { value: "SABINO", visualValue: "SABINO" },
                  { value: "ANDREBARBOSA", visualValue: "ANDREBARBOSA" }
                ]}
               /> 
              <br/><br/>
              <TextField {...register("cliente")} sx={{width: 250}} label="Cliente" variant="outlined" required />
              <br/>
              <CustomRadio 
                register={register("tipoFaturamento")} 
                onchange={(e) => {
                  switch(e.target.value) {
                    case "Para Futura Entrega": 
                      setTipoFaturamentoRM(false)
                      setTipoFaturamentoN(true)
                      break
                    case "Remessa de Materiais": 
                      setTipoFaturamentoOther(true)
                      setTipoFaturamentoN(true)
                      setTipoFaturamentoRM(true)
                      break
                    case "Bonificado": 
                      setTipoFaturamentoOther(true)
                      setTipoFaturamentoN(true)
                      setTipoFaturamentoRM(true)
                      break
                    default:
                      setTipoFaturamentoRM(false)
                      setTipoFaturamentoN(false)
                      setTipoFaturamentoOther(false)
                    break
                  }
                }}
                labelText={'Tipo de Faturamento: '} 
                items={[
                  { value: "Normal", visualValue: "Normal" },  
                  { value: "Para Futura Entrega", visualValue: "Para Futura Entrega" }, 
                  { value: "Remessa de Materiais", visualValue: "Remessa de Materiais" }, 
                  { value: "Bonificado", visualValue: "Bonificado" }, 
                ]} />
                <br/>
                {formaPGOAV ?<CustomRadio 
                register={register("formaPagamentoAVista")} 
                labelText={'Forma de Pagamento Á vista: '} 
                onchange={(e) => {
                  switch (e.target.value) {
                    case "Depósito":
                      setFormaDePagamento("Depósito")
                    break;
                    case "Pix":
                      setFormaDePagamento("Pix")
                    break;
                    case "Dinheiro":
                      setFormaDePagamento("Dinheiro")
                    break;
                    case "Pago com crédito":
                      setFormaDePagamento("Pago com crédito")
                    break;
                  }
                }}
                items={[
                  { value: "Depósito", visualValue: "Depósito" },  
                  { value: "Pix", visualValue: "Pix" },
                  { value: "Dinheiro", visualValue: "Dinheiro" },
                  { value: "Pago com crédito", visualValue: "Pago com crédito" }
                ]} /> : <></> }
                <br/>
                
                {formaPGOCartao ? <CustomRadio 
                register={register("bandeira")} 
                labelText={'Bandeira: '} 
                items={[
                  { value: "Visa", visualValue: "Visa" },  
                  { value: "Master", visualValue: "Master" },
                  { value: "Banri", visualValue: "banri" },
                  { value: "Elo", visualValue: "Elo" },
                  { value: "Amex", visualValue: "Amex" },
                  { value: "Bndes", visualValue: "Bndes" }
                ]} /> : <></>}
                <br/>
                {formaPGOCartao == true || formaPGOAV == true ? <CustomRadio 
                    register={register("localCobranca")}
                    labelText={'Local de Cobrança: '} 
                    items={[
                      { value: "Cobrar no Local", visualValue: "Cobrar no Local (Endereço de Entrega)" },  
                      { value: "Cobrar na Empresa", visualValue: "Cobrar na Empresa (Cemear)" },
                      { value: "Pago na sala de vendas", visualValue: "Pago na sala de vendas (Showroom)" }
                    ]} /> : <></>}
                <br/>
              {entregaRetiraEI || entregaRetiraEA ? <CustomRadio 
                register={register("vendaFrete")} 
                labelText={'Venda com Frete? '} 
                onchange={(e) => {
                  switch (e.target.value) {
                    case "Sim":
                      setVendaFreteSIM(true)
                      break;
                    default:
                      setVendaFreteSIM(false)
                      break;
                  }
                }}
                items={[
                  { value: "Sim", visualValue: "Sim" },  
                  { value: "Não", visualValue: "Não" }
                ]} /> : <></>}
                <br/><br/>
                {vendaFreteSIM ? <CustomRadio
                register={register("tipoFrete")}
                labelText={'Tipo de frete: '}
                items={[
                  { value: "Destacado", visualValue: "Destacado" },  
                  { value: "Diluído", visualValue: "Diluído" }
                ]} /> : <></> }
                <br/>

              {agendadoDataSim? <TextField {...register("dataEntrega")} sx={{width: 250}} type="date" variant="outlined" required />:<></>}
              
            </div>


            <div style={{margin:50}}>
              <TextField {...register("orcamento")} sx={{width: 250}} type="number" label="Orcamento" variant="outlined" required />
              <br/><br/>
              
              <CustomInputMask register={setValorVendaInput} placeHolder='Valor da Venda (incluindo frete)' />
              
                {!tipoFaturamentoRM ? <CustomRadio 
                    register={register("formaPagamento")} 
                    onchange={(e) => {
                      switch(e.target.value) {
                        case "Cartão": 
                          setFormaDePagamento("Cartão")
                          setFormaPGOCartao(true)
                          setFormaPGOAV(false)
                          break
                        case "Á Vista": 
                          setFormaDePagamento("Á Vista")
                          setFormaPGOAV(true)
                          setFormaPGOCartao(false)
                          break
                        case "Faturado": 
                          setFormaDePagamento("Faturado")
                          setFormaPGOAV(false)
                          setFormaPGOCartao(false)
                        break
                        case "Sem Pagamento": 
                          setFormaDePagamento("Sem Pagamento")
                          setFormaPGOAV(false)
                          setFormaPGOCartao(false)
                        break
                        case "Depósito Programado": 
                          setFormaDePagamento("Depósito Programado")
                          setFormaPGOAV(false)
                          setFormaPGOCartao(false)
                        break
                        case "Cheque Programado": 
                          setFormaDePagamento("Cheque Programado")
                          setFormaPGOAV(false)
                          setFormaPGOCartao(false)
                        break
                        default: 
                          setFormaPGOAV(false)
                          setFormaPGOCartao(false)
                        break
                      }
                    }}
                    labelText={'Forma de Pagamento: '} 
                    items={[
                      { value: "Á Vista", visualValue: "Á vista" },  
                      { value: "Faturado", visualValue: "Faturado" },
                      { value: "Cartão", visualValue: "Cartão" },
                      { value: "Sem Pagamento", visualValue: "Sem Pagamento" },
                      { value: "Depósito Programado", visualValue: "Depósito Programado" },
                      { value: "Cheque Programado", visualValue: "Cheque Programado" }
                    ]} /> : <></>}
                    <br/>
               {!tipoFaturamentoN || tipoFaturamentoRM ? <CustomRadio 
                register={register("entregaRetira")} 
                onchange={(e) => {
                  switch(e.target.value) {
                    case "Entrega Imediata": 
                      setEntregaRetiraEI(true)
                      setEntregaRetiraT(false)
                      setEntregaRetiraEA(false)
                      
                    break
                    case "Entrega Agendada": 
                      setEntregaRetiraEA(true)
                      setEntregaRetiraT(false)
                      setEntregaRetiraEI(false)
                    break
                    case "Transportadora": 
                      setEntregaRetiraT(true)
                    break
                    default: 
                      setEntregaRetiraEA(false)
                      setEntregaRetiraT(false)
                      setEntregaRetiraEI(false)
                    break
                  }
                }}
                labelText={'Entrega ou Retirada? '} 
                items={[
                  { value: "Entrega Imediata", visualValue: "Entrega Imediata" },  
                  { value: "Entrega Agendada", visualValue: "Entrega Agendada" },  
                  { value: "Retira", visualValue: "Retira" },
                  { value: "Transportadora", visualValue: "Transportadora" }
                ]} /> : <></>}
                <br/>
                <br/>
                {entregaRetiraT ? <CustomRadio
                register={register("freteConta")}
                labelText={'Frente por conta: '}
                items={[
                  { value: "Cemear", visualValue: "Cemear" },  
                  { value: "Cliente", visualValue: "Cliente", checked: true }
                ]} /> : <></> }
                <br/>
                <br/>
                {formaPGOCartao ? <CustomSelect_Widget
                labelText={'Número de Parcelas:'} 
                register={register("parcelas")} 
                itens={[
                  { value: "...", visualValue: "..." },
                  { value: "1x", visualValue: "1x" },
                  { value: "2x", visualValue: "2x" },
                  { value: "3x", visualValue: "3x" },
                  { value: "4x", visualValue: "4x" },
                  { value: "5x", visualValue: "5x" },
                  { value: "6x", visualValue: "6x" },
                  { value: "Outros", visualValue: "Outros" }
                ]}
                /> : <></>}
                
                <br/><br/>
               
              
                {entregaRetiraEI || entregaRetiraEA ? <CustomRadio
                register={register("entregaCadastro")}
                labelText={'Entrega no Endereço do Cadastro? '}
                items={[
                  { value: "Sim", visualValue: "Sim" },  
                  { value: "Não", visualValue: "Não" }
                ]} /> : <></> }

                {vendaFreteSIM ? <CustomInputMask register={setValorFreteInput} placeHolder='Valor do Frete' />: <></>}
                <br/>
                {entregaRetiraEA ? <CustomRadio
                register={register("dataAgendada")}
                labelText={'Foi agendado uma data? '}
                onchange={(e)=> {
                  switch(e.target.value){
                    case "Sim":
                      setAgendadoDataSim(true)
                    break
                    default:
                      setAgendadoDataSim(false)
                    break
                  }
                }}
                items={[
                  { value: "Sim", visualValue: "Sim" },  
                  { value: "Não", visualValue: "Não" }
                ]} /> : <></> }       
            </div>
                
        </div>
        <TextField {...register("obs")} sx={{width: "100%",}} label="Observações" />
        <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <Button type='submit' sx={{width: "50%", marginTop: 10}} disabled={disabilitarBotao} variant="contained">Enviar</Button>
        </div>
      </form>
    </div>
  )
}

export default financeiro