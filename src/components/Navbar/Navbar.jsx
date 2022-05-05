import './Navbar.css';
import logoblue from 'assets/logoblue.png';
import coffee_add from "assets/icons/coffee_add.png"
import sacola_site from 'assets/icons/sacola_site.png';

function Navbar({createCoffee}){
    return (
        <div className="Home__header Header">
        <div className="row">
          <div className="Header__logo Logo">
            <img
              src={logoblue}
              width="70px"
              alt="logo bluecoffees"
              className="Logo__icone"
            />
            <span className="Logo__titulo">Coffee's</span>
          </div>
          <div className="Header__opcoes Opcoes">
            <button type="button" className="Opcoes__coffee Coffee" onClick={() => createCoffee()}>
              <img src={coffee_add} height="50px" alt="Icone adicionar café" className="Coffee__icone" />
            </button>
            <div className="Opcoes__sacola Sacola">
              <img
                width="45px"
                src={sacola_site}
                alt="sacola de compras"
                className="Sacola__icone"
              />
            </div>
          </div>
        </div>
      </div>
    );
}

export default Navbar
