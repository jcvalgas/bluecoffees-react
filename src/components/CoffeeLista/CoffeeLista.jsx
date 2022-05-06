import './CoffeeLista.css';

import CoffeeListaItem from 'components/CoffeeListaItem/CoffeeListaItem';
import CoffeeDetalhesModal from 'components/CoffeeDetalhesModal/CoffeeDetalhesModal';
import { useEffect, useState } from 'react';
import { CoffeeService } from 'services/CoffeeService.js'

function CoffeeLista({coffeeCriado, mode}) {

  const [coffees, setCoffees] = useState([]);
  const [coffeeSelecionado, setCoffeeSelecionado] = useState({});
  const [coffeeModal, setCoffeeModal] = useState(false)

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

  const getCoffeeById = async (coffeeId) => {
    const response = await CoffeeService.getById(coffeeId);
    console.log(response);
    setCoffeeModal(response)
  }

  const adicionaCoffeeNaLista = (coffee) => {
    const lista = [...coffees, coffee];
    setCoffees(lista);
  };

  useEffect(() => {
    if(coffeeCriado) adicionaCoffeeNaLista(coffeeCriado)
  }, [coffeeCriado])

  useEffect(() => {
    getLista();
  }, []);

  return (
    <div className="CoffeeLista">
      {coffees.map((coffee, index) => 
        <CoffeeListaItem
        mode={mode} 
        key={`CoffeeListaItem-${index}`}
        coffee={coffee}
        quantidadeSelecionada={coffeeSelecionado[index]}
        index={index}
        onAdd={index => adicionarItem(index)}
        onRemove={index => removerItem(index)}
        clickItem={(coffeId) => getCoffeeById(coffeId)}
        />
      )}
      {coffeeModal && <CoffeeDetalhesModal coffee={coffeeModal} closeModal={() => setCoffeeModal(false)} />}
    </div>
  );
}

export default CoffeeLista;
