import './CoffeeDetalhesModal.css';
import Modal from 'components/Modal/Modal';

function CoffeeDetalhesModal({coffee, closeModal}){
    return (
        <Modal closeModal={closeModal}>
            <div className="CoffeeDetalhesModal">
                <div>
                    <div className="CoffeeDetalhesModal__titulo">{coffee.titulo}</div>
                    <div className="CoffeeDetalhesModal__preco">R$ {Number(coffee.preco).toFixed(2)}</div>
                    <div className="CoffeeDetalhesModal__descricao"><b>Descrição</b> {coffee.descricao}</div>
                </div>
                <img className='CoffeeDetalhesModal__foto' src={coffee.foto} alt={`Café ${coffee.titulo}`} />
            </div>
        </Modal>
    );
}

export default CoffeeDetalhesModal;
