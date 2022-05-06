import './CoffeeLista.css';
import { useEffect, useState, useCallback } from 'react';
import CoffeeListaItem from 'components/CoffeeListaItem/CoffeeListaItem';
import CoffeeDetalhesModal from 'components/CoffeeDetalhesModal/CoffeeDetalhesModal';
import { CoffeeService } from 'services/CoffeeService.js'
import {ActionMode} from "constants/index.js"

function CoffeeLista({coffeeCriado, mode, updateCoffee, deleteCoffee}) {

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
    const mapper = {
      [ActionMode.NORMAL] : () => setCoffeeModal(response),
      [ActionMode.ATUALIZAR]: () => updateCoffee(response),
      [ActionMode.DELETAR]: () => deleteCoffee(response)
    };

    mapper[mode]();
  }

  const adicionaCoffeeNaLista = useCallback(
    (coffee) => {
      const lista = [...coffees, coffee];
      setCoffees(lista);
    },
    [coffees]
  );
    

  useEffect(() => {
    if(
      coffeeCriado &&
      !coffees.map(({id}) => id).includes(coffeeCriado.id)
    ) {
      adicionaCoffeeNaLista(coffeeCriado)
    } 
  }, [adicionaCoffeeNaLista ,coffeeCriado, coffees])

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
