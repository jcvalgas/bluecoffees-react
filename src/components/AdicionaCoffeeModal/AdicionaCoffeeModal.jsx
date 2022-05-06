import './AdicionaCoffeeModal.css';
import { useState, useEffect } from 'react';
import { CoffeeService } from 'services/CoffeeService';
import Modal from 'components/Modal/Modal.jsx';

function AdicionaCoffeeModal({ closeModal, onCreateCoffee }) {
  const form = {
    preco: '',
    sabor: '',
    descricao: '',
    foto: '',
  };

  const [state, setState] = useState(form);
  const [canDisable, setCanDisable] = useState(true);
  
  const canDisableButtom = () => {
      const response = !Boolean(
          state.descricao.length
          && state.foto.length
          && state.sabor.length
          && state.preco.length  
        )
      setCanDisable(response)
  }

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const createCoffee = async () => {
      const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split('\\').pop();
      const {sabor, descricao, preco, foto} = state;
      const coffee = {
          sabor,
          descricao,
          preco,
          foto: `./assets/images/${renomeiaCaminhoFoto(foto)}`
      }

      const response = await CoffeeService.create(coffee);
      onCreateCoffee(response)
      closeModal();
  }

  useEffect(() => {
      canDisableButtom();
  });

  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaCoffeeModal">
        <form autoComplete="off">
          <h2>Adicionar ao Cardápio</h2>
          <div>
            <label htmlFor="preco" className="AdicionaCoffeeModal__text">
              Preço:
            </label>
            <input
              required
              type="text"
              id="preco"
              placeholder="10,00"
              value={state.preco}
              onChange={(e) => handleChange(e, 'preco')}
            />
          </div>
          <div>
            <label htmlFor="sabor" className="AdicionaCoffeeModal__text">
              Sabor:
            </label>
            <input
              required
              type="text"
              id="sabor"
              placeholder="Citizen Express"
              value={state.sabor}
              onChange={(e) => handleChange(e, 'sabor')}
            />
          </div>
          <div>
            <label htmlFor="descricao" className="AdicionaCoffeeModal__text">
              Descrição:
            </label>
            <input
              required
              type="text"
              id="descricao"
              placeholder="Detalhe o produto"
              value={state.descricao}
              onChange={(e) => handleChange(e, 'descricao')}
            />
          </div>
          <div>
            <label
              htmlFor="foto"
              className="AdicionaCoffeeModal__text AdicionaCoffeeModal__foto-label"
            >
              {!state.foto.length ? 'Selecionar imagem' : state.foto}
            </label>
            <input
              required
              type="file"
              className="AdicionaCoffeeModal__foto"
              id="foto"
              value={state.foto}
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleChange(e, 'foto')}
            />
          </div>
          <button
            type="button"
            className="AdicionaCoffeeModal__enviar"
            disabled={canDisable}
            onClick={createCoffee}>
            Enviar            
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaCoffeeModal;
