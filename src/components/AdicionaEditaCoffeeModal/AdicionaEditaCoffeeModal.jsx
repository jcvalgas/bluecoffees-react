import './AdicionaEditaCoffeeModal.css';
import { useState, useEffect } from 'react';
import { CoffeeService } from 'services/CoffeeService';
import Modal from 'components/Modal/Modal.jsx';
import { ActionMode } from 'constants/index.js';

function AdicionaEditaCoffeeModal({
  closeModal,
  onCreateCoffee,
  mode,
  coffeeToUpdate,
  onUpdateCoffee,
}) {
  const form = {
    preco: coffeeToUpdate?.preco ?? '',
    sabor: coffeeToUpdate?.sabor ?? '',
    descricao: coffeeToUpdate?.descricao ?? '',
    foto: coffeeToUpdate?.foto ?? '',
  };

  const [state, setState] = useState(form);
  const [canDisable, setCanDisable] = useState(true);

  const canDisableButtom = () => {
    const response = !Boolean(
      state.descricao.length &&
        state.foto.length &&
        state.sabor.length &&
        String(state.preco).length,
    );
    setCanDisable(response);
  };

  const handleChange = (e, name) => {
    setState({ ...state, [name]: e.target.value });
  };

  const handleSend = async () => {
    const renomeiaCaminhoFoto = (fotoPath) => fotoPath.split(/\\|\//).pop();
    const { sabor, descricao, preco, foto } = state;
    const coffee = {
      ...(coffeeToUpdate && { _id: coffeeToUpdate?.id }),
      sabor,
      descricao,
      preco,
      foto: `./assets/images/${renomeiaCaminhoFoto(foto)}`,
    };
    const serviceCall = {
      [ActionMode.NORMAL]: () => CoffeeService.create(coffee),
      [ActionMode.ATUALIZAR]: () =>
        CoffeeService.updateById(coffeeToUpdate?.id, coffee),
    };

    const response = await serviceCall[mode]();

    const actionResponse = {
      [ActionMode.NORMAL]: () => onCreateCoffee(response),
      [ActionMode.ATUALIZAR]: () => onUpdateCoffee(response),
    };

    actionResponse[mode]();

    const reset = {
      preco: '',
      descricao: '',
      sabor: '',
      foto: '',
    };

    setState(reset);
    closeModal();
  };

  useEffect(() => {
    canDisableButtom();
  });
  
  return (
    <Modal closeModal={closeModal}>
      <div className="AdicionaCoffeeModal">
        <form autoComplete="off">
          <h2>{ActionMode.ATUALIZAR === mode ? 'Atualizar' : 'Adicionar ao'} Cardápio</h2>
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
              accept="image/png, image/gif, image/jpeg"
              onChange={(e) => handleChange(e, 'foto')}
            />
          </div>
          <button
            type="button"
            className="AdicionaCoffeeModal__enviar"
            disabled={canDisable}
            onClick={handleSend}
          >
            {ActionMode.NORMAL === mode ? 'Enviar' : 'Atualizar'}
          </button>
        </form>
      </div>
    </Modal>
  );
}

export default AdicionaEditaCoffeeModal;
