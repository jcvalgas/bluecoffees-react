import './AdicionaCoffeeModal.css';
import { useState } from 'react';
import Modal from 'components/Modal/Modal.jsx';

function AdicionaCoffeeModal({ closeModal }) {
  const form = {
    preco: '',
    sabor: '',
    descricao: '',
    foto: '',
  };

  const [state, setState] = useState(form);

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

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
              type="file"
              className="AdicionaCoffeeModal__foto"
              id="foto"
              value={state.foto}
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleChange(e, 'foto')}
            />
          </div>
          <input
            type="submit"
            className="AdicionaCoffeeModal__enviar"
            value="Enviar"
          />
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaCoffeeModal;