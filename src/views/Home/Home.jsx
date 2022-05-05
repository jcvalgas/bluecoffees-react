import './Home.css';
import { useState } from 'react';
import CoffeeLista from 'components/CoffeeLista/CoffeeLista.jsx'
import Navbar from 'components/Navbar/Navbar.jsx';
import AdicionaCoffeeModal from 'components/AdicionaCoffeeModal/AdicionaCoffeeModal';

function Home() {
  const [canShowAdicionaCoffeeModal, setCanShowAdicionaCoffeeModal] = useState(false)
  return (
    <div className="Home">
      <Navbar createCoffee={() => setCanShowAdicionaCoffeeModal(true)}/>
      <div className="Home__container">
        <CoffeeLista />
        {
          canShowAdicionaCoffeeModal &&
          (<AdicionaCoffeeModal closeModal={() => setCanShowAdicionaCoffeeModal(false)} />)
        }
      </div>
    </div>
  );
}

export default Home;
