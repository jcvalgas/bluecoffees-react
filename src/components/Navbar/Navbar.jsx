import './Navbar.css';
import logoblue from 'assets/logoblue.png';
import sacola_site from 'assets/icons/sacola_site.png';

function Navbar(){
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
            <div className="Opcoes__sacola Sacola">
              <img
                width="40px"
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