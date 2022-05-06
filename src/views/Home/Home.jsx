import './Home.css';
import { useState } from 'react';
import CoffeeLista from 'components/CoffeeLista/CoffeeLista.jsx'
import Navbar from 'components/Navbar/Navbar.jsx';
import AdicionaCoffeeModal from 'components/AdicionaCoffeeModal/AdicionaCoffeeModal';

function Home() {
  const [canShowAdicionaCoffeeModal, setCanShowAdicionaCoffeeModal] = useState(false);
  const [coffeeParaAdicionar, setCoffeeParaAdicionar] = useState();

  return (
    <div className="Home">
      <Navbar createCoffee={() => setCanShowAdicionaCoffeeModal(true)}/>
      <div className="Home__container">
        <CoffeeLista coffeeCriado={coffeeParaAdicionar} />
        {
          canShowAdicionaCoffeeModal &&
          (<AdicionaCoffeeModal closeModal={() => setCanShowAdicionaCoffeeModal(false)} onCreateCoffee={(coffee) => setCoffeeParaAdicionar(coffee)} />)
        }
      </div>
    </div>
  );
}

export default Home;
