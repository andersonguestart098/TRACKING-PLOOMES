import React from 'react'

type Props = {}

const retorno = (props: Props) => {
  return (
        <div>
            <label for="quemrecebeu" class="col-form-label">Quem recebeu o canhoto: </label>
              <br/>
          <select name="quemrecebeu" id="quemrecebeu">
            <option value=" "> </option>
            <option value="MARCIA">MARCIA</option>
            <option value="JULIA">JULIA</option>
            <option value="RENITA">RENITA</option>
            <option value="NADIA">NADIA</option>
          </select>
              <br/><br/>
              <label for="numeronf" class="col-form-label">Número da Nota Fiscal: </label>
              <br/>
            <input type="text"  name="numeronf" placeholder="Digite o número da Nota..."/>
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
            <option value="VANDERLEI">VANDERLEI</option>
            <option value="VILNEI">VILNEI</option>
            <option value="WILLIAM">WILLIAM</option>
            <option value="PAULO ALEXANDRE">PAULO ALEXANDRE</option>
            <option value="OUTROS">OUTROS</option>
          </select>
              <br/>

              <input type="hidden"  name="concluida" value="CONCLUIDO"/>
            <br/>


        </div>
  )
}

export default retorno