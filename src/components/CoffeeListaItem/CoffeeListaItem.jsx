import './CoffeeListaItem.css'
import { ActionMode } from 'constants/index.js';

function CoffeeListaItem({coffee, quantidadeSelecionada, index, onAdd, onRemove, clickItem, mode}){

  const badgeCounter = (canRender, index) => Boolean(canRender) && (<span className="CoffeeListaItem__badge"> {quantidadeSelecionada} </span>);
  const badgeAction = (canRender) => {
    if (canRender) return (<span className="CoffeeListaItem__tag">{mode}</span>)
  }
  const removeButton = (canRender, index) => Boolean(canRender) && (<button className="Acoes__remover" disabled={mode !== ActionMode.NORMAL} onClick={(e) => {e.stopPropagation(); onRemove(index);}}>remover</button>)
  return (
    <div className={`CoffeeListaItem ${mode !== ActionMode.NORMAL && 'CoffeeListaItem--disable'}`} onClick={() => clickItem(coffee.id)}>
    {badgeCounter(quantidadeSelecionada, index)}
    {badgeAction(mode !== ActionMode.NORMAL)}
    <div>
      <div className="CoffeeListaItem__titulo">{coffee.titulo}</div>
      <div className="CoffeeListaItem__preco">R$ {coffee.preco.toFixed(2)}</div>
      <div className="CoffeeListaItem__descricao">{coffee.descricao}</div>
      <div className="CoffeeListaItem__acoes Acoes">
        <button className={`Acoes__adicionar ${!quantidadeSelecionada && "Acoes__adicionar--preencher"}`} disabled={mode !== ActionMode.NORMAL} onClick={(e) => { e.stopPropagation(); onAdd(index); }}>adicionar</button>
        {removeButton(quantidadeSelecionada, index)}
      </div>
    </div>
    <img className="CoffeeListaItem__foto" src={coffee.foto} />
  </div>
  );
}

export default CoffeeListaItem;
