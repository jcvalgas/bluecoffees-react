import './Home.css';
import { useState } from 'react';
import CoffeeLista from 'components/CoffeeLista/CoffeeLista.jsx'
import Navbar from 'components/Navbar/Navbar.jsx';
import AdicionaEditaCoffeeModal from 'components/AdicionaEditaCoffeeModal/AdicionaEditaCoffeeModal';
import { ActionMode } from 'constants';

function Home() {
  const [canShowAdicionaCoffeeModal, setCanShowAdicionaCoffeeModal] = useState(false);
  const [coffeeParaAdicionar, setCoffeeParaAdicionar] = useState();
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  }
  return (
    <div className="Home">
      <Navbar mode={modoAtual} createCoffee={() => setCanShowAdicionaCoffeeModal(true)} updateCoffee={() => handleActions(ActionMode.ATUALIZAR)}/>
      <div className="Home__container">
        <CoffeeLista mode={modoAtual} coffeeCriado={coffeeParaAdicionar} />
        {
          canShowAdicionaCoffeeModal &&
          (<AdicionaEditaCoffeeModal closeModal={() => setCanShowAdicionaCoffeeModal(false)} onCreateCoffee={(coffee) => setCoffeeParaAdicionar(coffee)} />)
        }
      </div>
    </div>
  );
}

export default Home;
