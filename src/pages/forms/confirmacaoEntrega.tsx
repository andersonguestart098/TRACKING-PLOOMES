import React from 'react'

type Props = {}

const confirmacaoEntrega = (props: Props) => {
  return (
        <div>
            <label for="numeronf" class="col-form-label">Número da Nota Fiscal:</label><br/>
            <input type="text" placeholder="Se for mais de uma nota separe por virgula..."/>
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

              <label for="codentrega" class="col-form-label">Cód. Entrega:                 </label> 
              <br/>
            <input type="text"  name="codentrega"/>
            <br/>

            <br/>
            <label for="destino" class="col-form-label">Cidadede(s) Destino:</label> 
            <br/>
            <input type="text"  name="destino"/>
            <br/>
            <br/>
            <label for="quemrecebeu" >Quem recebeu o material:</label> 
            <br/>
            <input type="text"  name="quemrecebeu"/>
            <br/><br/>

            <label for="concluida" class="col-form-label">Entrega Concluída?</label>
              <br/>
          <select name="concluida" id="concluida">
            <option value=" "> </option>
            <option value="Concluída">Concluída</option>
            <option value="Parcialmente Concluída">Parcialmente Concluída</option>
            <option value="Recusada">Recusada</option>
          </select>
              <br/>


        </div>
  )
}

export default confirmacaoEntrega