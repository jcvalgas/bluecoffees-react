import './CoffeeLista.css';

import {coffees} from '../mocks/coffee.js';
import { useState } from 'react';

function CoffeeLista() {

  const [coffeeSelecionado, setCoffeeSelecionado] = useState({});
  const adicionarItem = (coffeeIndex) => {
    const coffee = {[coffeeIndex]: Number(coffeeSelecionado[coffeeIndex] || 0) + 1}
    setCoffeeSelecionado({...coffeeSelecionado, ...coffee});
  }

  return (
    <div className="CoffeeLista">
      {coffees.map((coffee, index) => 
      <div className="CoffeeListaItem" key={`CoffeeListaItem-${index}`}>
        <span className="CoffeeListaItem__badge"> {coffeeSelecionado[index] || 0} </span>
        <div>
          <div className="CoffeeListaItem__titulo">{coffee.titulo}</div>
          <div className="CoffeeListaItem__preco">R$ {coffee.preco.toFixed(2)}</div>
          <div className="CoffeeListaItem__descricao">{coffee.descricao}</div>
          <div className="CoffeeListaItem__acoes Acoes">
            <button className="Acoes__adicionar Acoes__adicionar--preencher" onClick={() => adicionarItem(index)}>adicionar</button>
          </div>
        </div>
        <img className="CoffeeListaItem__foto" src={coffee.foto} />
      </div>
      )}
    </div>
  )
}

export default CoffeeLista;
