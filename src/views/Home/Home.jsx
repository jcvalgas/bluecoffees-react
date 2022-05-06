import './Home.css';
import { useState } from 'react';
import CoffeeLista from 'components/CoffeeLista/CoffeeLista.jsx';
import Navbar from 'components/Navbar/Navbar.jsx';
import SacolaModal from 'components/SacolaModal/SacolaModal';
import AdicionaEditaCoffeeModal from 'components/AdicionaEditaCoffeeModal/AdicionaEditaCoffeeModal';
import DeleteCoffeeModal from 'components/DeleteCoffeeModal/DeleteCoffeeModal';
import { ActionMode } from 'constants/index.js';
import { SacolaService } from 'services/SacolaService';

function Home() {
  const [canShowAdicionaCoffeeModal, setCanShowAdicionaCoffeeModal] = useState(false);
  const [coffeeParaAdicionar, setCoffeeParaAdicionar] = useState();
  const [coffeeParaEditar, setCoffeeParaEditar] = useState();
  const [coffeeEditado, setCoffeeEditado] = useState()
  const [coffeeParaDeletar, setCoffeeParaDeletar] = useState();
  const [coffeeRemovido, setCoffeeRemovido] = useState();
  const [canOpenBag, setCanOpenBag] = useState()
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
    setModoAtual(ActionMode.NORMAL)
  }

  const abrirSacola = async () => {
    const lista = JSON.parse(localStorage.getItem('sacola'));
    const sacola = lista.filter(i => i.quantidade > 0);

    await SacolaService.create(sacola);
    setCanOpenBag(true);
  }
  return (
    <div className="Home">
      <Navbar mode={modoAtual} createCoffee={() => setCanShowAdicionaCoffeeModal(true)} updateCoffee={() => handleActions(ActionMode.ATUALIZAR)} deleteCoffee={() => handleActions(ActionMode.DELETAR)} openBag={abrirSacola}/>
      <div className="Home__container">
        <CoffeeLista mode={modoAtual} coffeeCriado={coffeeParaAdicionar} coffeeEditado={coffeeEditado} deleteCoffee={handleDeleteCoffee} coffeeRemovido={coffeeRemovido} updateCoffee={handleUpdateCoffee} />
        {
          canShowAdicionaCoffeeModal &&
          (<AdicionaEditaCoffeeModal mode={modoAtual} onCreateCoffee={(coffee) => setCoffeeParaAdicionar(coffee)} onUpdateCoffee={(coffee) => setCoffeeEditado(coffee)} coffeeToUpdate={coffeeParaEditar} coffeeToDelete={coffeeParaDeletar} closeModal={handleCloseModal} />)
        }
        {
          coffeeParaDeletar &&
          <DeleteCoffeeModal 
            coffeeParaDeletar={coffeeParaDeletar}
            closeModal={handleCloseModal}
            onDeleteCoffee={(coffee) => setCoffeeRemovido(coffee)}
          />
        }
        {
          canOpenBag &&
          <SacolaModal closeModal={() => setCanOpenBag(false)} />
        }
      </div>
    </div>
  );
}

export default Home;
