import './Home.css';
import { useState } from 'react';
import CoffeeLista from 'components/CoffeeLista/CoffeeLista.jsx'
import Navbar from 'components/Navbar/Navbar.jsx';
import AdicionaEditaCoffeeModal from 'components/AdicionaEditaCoffeeModal/AdicionaEditaCoffeeModal';
import { ActionMode } from 'constants';

function Home() {
  const [canShowAdicionaCoffeeModal, setCanShowAdicionaCoffeeModal] = useState(false);
  const [coffeeParaAdicionar, setCoffeeParaAdicionar] = useState();
  const [coffeeParaEditar, setCoffeeParaEditar] = useState();
  const [coffeeParaDeletar, setCoffeeParaDeletar] = useState();
  const [modoAtual, setModoAtual] = useState(ActionMode.NORMAL);

  const handleActions = (action) => {
    const novaAcao = modoAtual === action ? ActionMode.NORMAL : action;
    setModoAtual(novaAcao);
  }

  const handleDeleteCoffee = (coffeeToDelete) => {
    setCoffeeParaDeletar(coffeeToDelete);
  }

  const handleUpdateCoffee =  (coffeeToUpdate) => {
    setCoffeeParaEditar(coffeeToUpdate);
    setCanShowAdicionaCoffeeModal(true);
  }

  const handleCloseModal = () => {
    setCanShowAdicionaCoffeeModal(false);
    setCoffeeParaAdicionar();
    setCoffeeParaDeletar();
    setCoffeeParaEditar();
  }
  return (
    <div className="Home">
      <Navbar mode={modoAtual} createCoffee={() => setCanShowAdicionaCoffeeModal(true)} updateCoffee={() => handleActions(ActionMode.ATUALIZAR)}/>
      <div className="Home__container">
        <CoffeeLista mode={modoAtual} coffeeCriado={coffeeParaAdicionar} deleteCoffee={handleDeleteCoffee} updateCoffee={handleUpdateCoffee} />
        {
          canShowAdicionaCoffeeModal &&
          (<AdicionaEditaCoffeeModal onCreateCoffee={(coffee) => setCoffeeParaAdicionar(coffee)} coffeeToUpdate={coffeeParaEditar} coffeeToDelete={coffeeParaDeletar} closeModal={handleCloseModal} />)
        }
      </div>
    </div>
  );
}

export default Home;
