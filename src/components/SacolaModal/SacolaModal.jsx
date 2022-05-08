import './SacolaModal.css';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from 'components/Modal/Modal';
import { SacolaService } from 'services/SacolaService';
import { CoffeeService } from 'services/CoffeeService';

function SacolaModal({ closeModal }) {
  
  const navigate = useNavigate();

  const [lista, setLista] = useState([]);

  const purchase = async () => {
    await SacolaService.purchase();
    navigate('/loading')
  };

  const handleClose = async () => {
    await SacolaService.purchase();
    closeModal();
  };

  const getListas = async () => {
    const coffeeLista = await CoffeeService.getLista();
    const sacolaLista = await SacolaService.getLista();
    const encontraNome = (id) => {
      const obj = coffeeLista.find((i) => i.id === id);
      return (obj && obj.titulo) ?? '';
    };

    if (Array.isArray(sacolaLista)) {
      const novaLista = sacolaLista.map(({ coffeeId, quantidade }) => ({
        nome: encontraNome(coffeeId),
        quantidade,
      }));
      setLista(novaLista);
    }
  };
  
  useEffect(() => {
    getListas();
  }, []);

  return (
    <Modal closeModal={handleClose}>
      <div className="SacolaModal">
        <h2>Cafés & Quantidades</h2>
        <div>
          {lista.map((i,idx) => (
              <div key={idx}>
                  {`${i.nome} x${i.quantidade}`}
              </div>
          ))}
        </div>
        <br />
        <div>
          <button onClick={purchase} className="SacolaModal__confirmar">
            Fechar compra
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default SacolaModal;
