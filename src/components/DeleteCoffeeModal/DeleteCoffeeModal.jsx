import './DeleteCoffeeModal.css';
import Modal from 'components/Modal/Modal';
import { CoffeeService } from 'services/CoffeeService';

function DeleteCoffeeModal({ closeModal, coffeeParaDeletar, onDeleteCoffee }) {
  const handleDelete = async (coffee) => {
    await CoffeeService.deleteById(coffee.id);
    onDeleteCoffee(coffee);
    closeModal();
  };
  return (
    <Modal closeModal={closeModal}>
      <div className="DeleteCoffeeModal">
        <h2>Confirmação</h2>
        <p>
          Você realmente deseja remover <b>{coffeeParaDeletar.titulo}</b> do
          cardápio?
        </p>
        <img
          src={coffeeParaDeletar.foto}
          alt={coffeeParaDeletar.titulo}
          className="DeleteCoffeeModal__foto"
        />
        <br />
        <div>
          <button
            className="DeleteCoffeeModal__confirmar"
            onClick={() => handleDelete(coffeeParaDeletar)}
          >
            Confirmar
          </button>
          <button 
            className="DeleteCoffeeModal__cancelar" 
            onClick={closeModal}
          >
            Cancelar
          </button>
        </div>
      </div>

    </Modal>
  );
}

export default DeleteCoffeeModal;
