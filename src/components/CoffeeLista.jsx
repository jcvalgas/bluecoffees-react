import './CoffeeLista.css';

import {coffees} from '../mocks/coffee.js';

function CoffeeLista() {
  return (
    <div className="CoffeeLista">
      {coffees.map((coffee, index) => 
      <div className="CoffeeListaItem" key={`CoffeeListaItem-${index}`}>
        <div>
          <div className="CoffeeListaItem__titulo">{coffee.titulo}</div>
          <div className="CoffeeListaItem__preco">R$ {coffee.preco.toFixed(2)}</div>
          <div className="CoffeeListaItem__descricao">{coffee.descricao}</div>
          <div className="CoffeeListaItem__acoes Acoes">
            <button className="Acoes__adicionar Acoes__adicionar--preencher">adicionar</button>
          </div>
        </div>
        <img className="CoffeeListaItem__foto" src={coffee.foto} />
      </div>
      )}
    </div>
  )
}

export default CoffeeLista;
