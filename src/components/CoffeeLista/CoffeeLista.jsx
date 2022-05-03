import './CoffeeLista.css';

import CoffeeListaItem from 'components/CoffeeListaItem/CoffeeListaItem';
import CoffeeDetalhesModal from 'components/CoffeeDetalhesModal/CoffeeDetalhesModal';
import { useEffect, useState } from 'react';
import { CoffeeService } from 'services/CoffeeService.js'

function CoffeeLista() {

  const [coffees, setCoffees] = useState([]);
  const [coffeeSelecionado, setCoffeeSelecionado] = useState({});
  const [coffeeModal, setCoffeeModal] = useState(false)

  const coffee = {
    titulo: 'Metropolitan Express',
    descricao: 'tempor incididunt ut labore et dolore magna aliqua.',
    foto: './assets/images/large-coffee_ccexpress.png',
    preco: 10
  }

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
        clickItem={(coffeeIndex) => setCoffeeModal(coffee)}
        />
      )}
      {coffeeModal && <CoffeeDetalhesModal coffee={coffeeModal} closeModal={() => setCoffeeModal(false)} />}
    </div>
  );
}

export default CoffeeLista;
