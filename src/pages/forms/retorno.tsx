import React from 'react'

type Props = {}

const retorno = (props: Props) => {
  return (
        <div>
            <label for="numeronf" class="col-form-label">Número da Nota Fiscal:</label><br/>
            <input type="text" placeholder="Se for mais de uma nota separe por virgula..."/>
            <br/><br/>
              <label for="codentrega" class="col-form-label">Cód. Entrega:                 </label> 
              <br/>
            <input type="text"  name="codentrega"/>
            <br/><br/>
          <label for="placa" class="col-form-label">Placa: </label>
              <br/>
          <select name="placa" id="placa">
            <option value=" "> </option>
            <option value="IWC5261">IWC5261</option>
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
              <br/>

            <br/>
            <label for="hodometro" class="col-form-label">Hodometro:</label> 
            <br/>
            <input type="text"  name="hodometro"/>
            <br/>
            <br/>
            <label for="data" >Data:</label> 
            <br/>
            <input type="date"  name="data"/>
            <br/><br/>
            <label for="obs" >Observações:</label>
            <br/>
            <input type="text"  name="obs"/>
            <br/>


        </div>
  )
}

export default retorno