import './CoffeeLista.css';

import CoffeeListaItem from 'components/CoffeeListaItem/CoffeeListaItem';
import { useEffect, useState } from 'react';
import { CoffeeService } from 'services/CoffeeService.js'

function CoffeeLista() {

  const [coffees, setCoffees] = useState([]);
  const [coffeeSelecionado, setCoffeeSelecionado] = useState({});

  const adicionarItem = (coffeeIndex) => {
    const coffee = {[coffeeIndex]: Number(coffeeSelecionado[coffeeIndex] || 0) + 1};
    setCoffeeSelecionado({...coffeeSelecionado, ...coffee});
  }

  const removerItem = (coffeeIndex) => {
    const coffee = {[coffeeIndex]: Number(coffeeSelecionado[coffeeIndex] || 0) - 1};
    setCoffeeSelecionado({...coffeeSelecionado, ...coffee});
  }

  const getLista = async () => {
    const response = await CoffeeService.getLista();
    setCoffees(response)
  }

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="CoffeeLista">
      {coffees.map((coffee, index) => 
        <CoffeeListaItem 
        key={`CoffeeListaItem-${index}`}
        coffee={coffee}
        quantidadeSelecionada={coffeeSelecionado[index]}
        index={index}
        onAdd={index => adicionarItem(index)}
        onRemove={index => removerItem(index)}
        />
      )}
    </div>
  );
}

export default CoffeeLista;
