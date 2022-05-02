import './Home.css';
import CoffeeLista from 'components/CoffeeLista/CoffeeLista.jsx'
import Navbar from 'components/Navbar/Navbar.jsx';

function Home() {
  return (
    <div className="Home">
      <Navbar />
      <div className="Home__container">
        <CoffeeLista />
      </div>
    </div>
  );
}

export default Home;
