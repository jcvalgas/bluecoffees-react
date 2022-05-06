import './CoffeeLista.css';
import { useEffect, useState, useCallback } from 'react';
import CoffeeListaItem from 'components/CoffeeListaItem/CoffeeListaItem';
import CoffeeDetalhesModal from 'components/CoffeeDetalhesModal/CoffeeDetalhesModal';
import { CoffeeService } from 'services/CoffeeService.js'
import {ActionMode} from "constants/index.js"
import {matchByText} from "helpers/utils.js"

function CoffeeLista({coffeeCriado, coffeeEditado, coffeeRemovido, mode, updateCoffee, deleteCoffee}) {

  const selecionados = JSON.parse(localStorage.getItem('selecionados')) ?? {};

  const [coffees, setCoffees] = useState([]);
  const [coffeeSelecionado, setCoffeeSelecionado] = useState(selecionados);
  const [coffeeModal, setCoffeeModal] = useState(false)
  const [coffeesFiltrados, setCoffeesFiltrados] = useState([]);

  const adicionarItem = (coffeeIndex) => {
    const coffee = {[coffeeIndex]: Number(coffeeSelecionado[coffeeIndex] || 0) + 1};
    setCoffeeSelecionado({...coffeeSelecionado, ...coffee});
  }

  const setSelecionados = useCallback(() => {
    if(!coffees.length) return

    const entries = Object.entries(coffeeSelecionado);
    const sacola = entries.map(arr => ({
      coffeeId: coffees[arr[0]].id,
      quantidade: arr[1]
    }))

    localStorage.setItem('sacola', JSON.stringify(sacola));
    localStorage.setItem('selecionados', JSON.stringify(coffeeSelecionado));
  }, [coffeeSelecionado, coffees])

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
    
  const filtroPorTitulo = ({target}) => {
    const lista = [...coffees].filter(({titulo}) => matchByText(titulo, target.value));
    setCoffeesFiltrados(lista)
  }

  useEffect(() => {
    if(
      coffeeCriado &&
      !coffees.map(({id}) => id).includes(coffeeCriado.id)
    ) {
      adicionaCoffeeNaLista(coffeeCriado)
    }
    setCoffeesFiltrados(coffees)
  }, [adicionaCoffeeNaLista ,coffeeCriado, coffees])

  useEffect(() => {
    getLista();
  }, [coffeeEditado, coffeeRemovido]);

  useEffect(() => {
    setSelecionados();
  }, [setSelecionados, coffeeSelecionado])
  
  return (
    <div className="CoffeeLista-Wrapper">
      <input type="text" className='CoffeeLista-filtro' onChange={filtroPorTitulo} placeholder="Busque um café pelo titulo."/>
      <div className="CoffeeLista">
        {coffeesFiltrados.map((coffee, index) => 
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
    </div>
  );
}

export default CoffeeLista;
