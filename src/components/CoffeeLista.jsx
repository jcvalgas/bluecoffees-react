import './CoffeeLista.css'

import 

function CoffeeLista() {
  return (
    <div className="CoffeeLista">
      <div className="CoffeeListaItem">
        <div>
          <div className="CoffeeListaItem__titulo">Citizen Express</div>
          <div className="CoffeeListaItem__preco">R$ 10.00</div>
          <div className="CoffeeListaItem__descricao">tempor incididunt ut labore et dolore magna aliqua.</div>
          <div className="CoffeeListaItem__acoes Acoes">
            <button className="Acoes__adicionar Acoes__adicionar--preencher">adicionar</button>
          </div>
        </div>
        <img className="CoffeeListaItem__foto" src={require('../assets/images/large-coffee_ccexpress.png')} />
      </div>
    </div>
  )
}

export default CoffeeLista;
