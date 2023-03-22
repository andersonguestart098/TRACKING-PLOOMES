import React from 'react'

type Props = {}

const saida = (props: Props) => {
  return (
        <div>
            <label for="numeronf" class="col-form-label">Número da Nota Fiscal:</label><br/>
            <input type="text" placeholder="Se for mais de uma nota separe por virgula..."/>
            <br/>

            <br/>
            <label for="nomeconferente" class="col-form-label">Conferente:</label>
          <br/>
          <select name="nomeconferente">
            <option value="EVERTON">EVERTON</option>
            <option value="DUDU">DUDU</option>
            <option value="MAX">MAX</option>
            <option value="CRISTIANO D.">CRISTIANO D.</option>
            <option value="MANOEL">MANOEL</option>
            <option value="MATHEUS">MATHEUS</option>
          </select>
              <br/><br/>

              <label for="placa" class="col-form-label">Placa:</label>
              <br/>
          <select name="placa" id="placa">
            <option value="IYW-7921">IYW7921</option>
            <option value="IWC5261">IWC5261</option>
            <option value="JBD-7E59">JBD7E59</option>
            <option value="IZT1E84">IZT1E84</option>
            <option value="IWW7921">IWW7921</option>
            <option value="IVO1603">IVO1603</option>
            <option value="AZI2E30">AZI2E30</option>
            <option value="ITA7784">ITA7784</option>
            <option value="IUT9476">IUT9476</option>
            <option value="IST6840">IST6840</option>
            <option value="IVP0G05">IVP0G05</option>
            <option value="JBD9H36">JBD9H36</option>
            <option value="IXH8706">IXH8706</option>
          </select>
              <br/><br/>

              <label for="motorista" class="col-form-label">Motorista:</label>
              <br/>
          <select name="motorista" id="motorista">
            <option value=" "> </option>
            <option value="ALEXANDRE">ALEXANDRE</option>
            <option value="DIONATHA">DIONATHA</option>
            <option value="DOUGLAS">DOUGLAS</option>
            <option value="IGON">IGON</option>
            <option value="JULIANO">JULIANO</option>
            <option value="MATHEUS">MATHEUS</option>
            <option value="PAULO">PAULO</option>
            <option value="VANDERLEI">VANDERLEI</option>
            <option value="VILNEI">VILNEI</option>
            <option value="MAX">MAX</option>
            <option value="PAULO VITOR">PAULO VITOR</option>
            <option value="CRISTIANO">CRISTIANO</option>
            <option value="WILLIAM">WILLIAM</option>
            <option value="PAULO ALEXANDRE">PAULO ALEXANDRE</option>
          </select>
              <br/><br/>

              <label for="hodometro" class="col-form-label">Hodometro:</label> 
            <br/>
          <input type="text"  name="hodometro"/>
            <br/><br/>

            <label for="destino" class="col-form-label">Cidadede(s) Destino:</label> 
            <br/>
            <input type="text"  name="destino"/>
            <br/><br/>
          <label for="obs" class="col-form-label">Observações:</label> 
            <br/>
          <input type="text"  name="obs"/>
            <br/><br/>
          <label for="datahorasaida" class="col-form-label">Datahora Saída:</label> 
            <br/>
          <input type="datetime-local"  name="datahorasaida"/>
          <br/><br/>


        </div>
  )
}

export default saida