import './CoffeeLista.css';

import CoffeeListaItem from 'components/CoffeeListaItem/CoffeeListaItem';
import {coffees} from 'mocks/coffee.js';
import { useState } from 'react';

function CoffeeLista() {

  const [coffeeSelecionado, setCoffeeSelecionado] = useState({});

  const adicionarItem = (coffeeIndex) => {
    const coffee = {[coffeeIndex]: Number(coffeeSelecionado[coffeeIndex] || 0) + 1};
    setCoffeeSelecionado({...coffeeSelecionado, ...coffee});
  }

  const removerItem = (coffeeIndex) => {
    const coffee = {[coffeeIndex]: Number(coffeeSelecionado[coffeeIndex] || 0) - 1};
    setCoffeeSelecionado({...coffeeSelecionado, ...coffee});
  }

  return (
    <div className="CoffeeLista">
      {coffees.map((coffee, index) => 
        <CoffeeListaItem />
      )}
    </div>
  )
}

export default CoffeeLista;