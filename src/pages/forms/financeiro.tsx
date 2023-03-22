import React from 'react'

type Props = {}

const financeiro = (props: Props) => {
  return (
    <div>
                      <label for="nome" >Vendedor</label><br/>
                        
                        <select name="nome" id="vendedor">
                            <option value="" selected disabled hidden>Vendedor</option>
                                <option value="BETO">BETO</option>
                                <option value="FELIPE">FELIPE</option>
                                <option value="ALINE">ALINE</option>
                                <option value="CRISTIAN">CRISTIAN</option>
                                <option value="FAGUNDES">FAGUNDES</option>
                                <option value="MARCIA">MARCIA</option>
                                <option value="WAGNER">WAGNER</option>
                                <option value="GELSON">GELSON</option>
                                <option value="LUIS">LUIS</option>
                                <option value="FERNANDO">FERNANDO</option>
                                <option value="EDUARDO">EDUARDO</option>
                                <option value="PV SANANDUVA">PV SANANDUVA</option>
                                <option value="FAGUNDES">EDUARDO</option>
                                <option value="FAVRETTO">FAVRETTO</option>
                                <option value="FERNANDA">FERNANDA</option>
                                <option value="GASPAR">GASPAR</option>
                                <option value="GILIARD">GILIARD</option>
                                <option value="GILMAR">GILMAR</option>
                                <option value="JONATHAS">JONATHAS</option>
                                <option value="KOZAK">KOZAK</option>
                                <option value="LEONARDO">LEONARDO</option>
                                <option value="SABINO">SABINO</option>
                                <option value="ANDRE BARBOSA">ANDRE BARBOSA</option>
                        </select><br/><br/>

                        <label for="input">Orçamento</label><br/>
  <input id="orcamento" type="number" placeholder="Digite o número do orçamento..."/>
                                <br/><br/>

                        <label for="input">Valor da Venda (incluindo frete)</label><br/>
  <input placeholder="Digite o valor da venda" id="valordoPedido"/>
  <br/><br/>

                        <label for="cliente">Cliente</label><br/>
                    <input name="cliente" id="cliente" placeholder="Digite o nome do Cliente..."/>
                        <br/><br/>
                    <div>
                    <label>Tipo de Faturamento </label><br/>
                    <input type="radio"/>
                    <label id="option">Normal</label><br/>
                    <input type="radio" />
                    <label id="option">Para Entrega Futura</label><br/>
                    <input type="radio"/>
                    <label id="option">Remessa de Materiais</label>
                    <br/>
                    <input type="radio"/>
                    <label id="option">Bonificado</label>
                    <br/>

                    </div>

                    <br/>
                    <div >
                    <label>Forma de pagamento (Á vista)</label><br/>
                    <input type="radio" id="html" name="formaPagamento" value="Depósito"/>
                    <label id="option">Depósito</label><br/>
                    <input type="radio" id="html" name="formaPagamento" value="PIX"/>
                    <label id="option">PIX</label><br/>
                    <input type="radio" id="html" name="formaPagamento" value="Dinheiro"/>
                    <label id="option">Dinheiro</label><br/>
                    <input type="radio" id="html" name="formaPagamento" value="Pago com crédito"/>
                    <label id="option">Pago com crédito</label>
                    </div>


                <div >

                    <br/>
            <label >Bandeira</label><br/>
            <input type="radio" name="bandeira" value="Visa"/>

            </div>
                    <br/>
            <div >
                    <label>Local de Cobrança </label><br/>
                    <input type="radio" id="html" name="localcobranca" value="Cobrar no Local"/>
                    <label id="option">Cobrar no Local (Endereço de Entrega)</label><br/>
                    <input type="radio" id="html" name="localcobranca" value="Cobrar na empresa"/>
                    <label id="option">Cobrar na Empresa (Cemear)</label><br/>
                    <input type="radio" id="html" name="localcobranca" value="Pago na sala de vendas"/>
                    <label id="option">Pago na sala de vendas (Showroom)</label><br/>
                  </div> 

                    <br/>
                  <div >
                    <label>Venda com Frete ?</label><br/>
                    <input type="radio" value="Nao" />
                    <label id="option">Não</label><br/>
                    
                    <input type="radio" />
                    <label id="option">Sim</label>
                    </div>

                    <br/>
                    <div >
                    <label>Tipo de frete</label><br/>
                    <input type="radio" name="tipofrete" value="Destacado"/>
                    <label id="option">Destacado</label><br/>
                    <input type="radio" id="html" name="tipofrete" value="Diluído"/>
                    <label id="option">Diluído</label><br/>
                    </div>

                    <br/>
                    <div >
                    <label>Agendamento para</label><br/>
                    <input type="date" />
                    </div>

                    <br/>
                    <div >
                    <label>Forma de Pagamento/Cobrança</label><br/>
                    <input type="radio"/>
                    <label id="option">Á vista</label><br/>
                    <input type="radio"/>
                    <label id="option">Faturado</label><br/>
                    <input type="radio"/>
                    <label id="option">Cartão</label><br/>
                    <input type="radio"/>
                    <label id="option">Sem Pagamento</label><br/>
                    <input type="radio"/>
                    <label id="option">Depósito Programado</label><br/>
                    <input type="radio"/>
                    <label id="option">Cheque Programado</label><br/>
                    <input type="radio"/>
                    <label id="option">Cartão na sala de vendas</label><br/>
                    </div>

                    <br/>
                    <div >
                    <br/>
                    <label>Número de parcelas:</label><br/>
                    <select>
                        <option>...</option>
                        <option>1x</option>
                        <option>2x</option>
                        <option>3x</option>
                        <option>4x</option>
                        <option>5x</option>
                        <option>6x</option>
                        <option>Outros</option>
                    </select>
                    </div>

                    <br/>
                    <div >
                    <label>Entrega ou Retirada?</label><br/>
                    <input type="radio"/>
                    <label id="option">Entrega</label><br/>
                    <input type="radio"/>
                    <label id="option">Retira</label><br/>
                    <input type="radio"/>
                    <label id="option">Transportadora</label><br/>

                    </div>

                    <div >
                    <br/>
                    <label>Frete por conta:</label><br/>
                    <input type="radio" id="html" name="freteConta" value="Cliente"/>
                    <label id="option">Cliente</label><br/>
                    <input type="radio" id="html" name="freteConta" value="Cemear"/>
                    <label id="option">Cemear</label><br/>
                    </div>

                    <div >
                    <br/>
                    <label for="vF">Valor do Frete</label><br/>
                    <input name="vF"/><br/>
                    </div>
                    
                    <br/>
                    <div >
                    <label>Entrega no Endereço do Cadastro</label><br/>
                    <input type="radio" id="html" name="entregaEndereco" value="Não"/>
                    <label id="option">Não</label><br/>
                    <input type="radio" id="html" name="entregaEndereco" value="Sim"/>
                    <label id="option">Sim</label><br/>
                    </div>

                    <br/>
                      <div >
                    <label>Foi agendado uma data?</label><br/>
                    <input type="radio" value="naoAgendado" />
                    <label id="option">Não - Aguardar Vendedor</label><br/>
                    <input type="radio" value="entregaAgendada" />
                    <label id="option" >Sim - Preencher agenda</label><br/>
                    </div>

        </div>
  )
}

export default financeiro