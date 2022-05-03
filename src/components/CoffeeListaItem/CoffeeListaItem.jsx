import './CoffeeListaItem.css'

function CoffeeListaItem({coffee, quantidadeSelecionada, index, onAdd, onRemove, clickItem}){

  const badgeCounter = (canRender, index) => Boolean(canRender) && (<span className="CoffeeListaItem__badge"> {quantidadeSelecionada} </span>);
  const removeButton = (canRender, index) => Boolean(canRender) && (<button className="Acoes__remover" onClick={(e) => {e.stopPropagation(); onRemove(index);}}>remover</button>)
  return (
    <div className="CoffeeListaItem" onClick={() => clickItem(coffee.id)}>
    {badgeCounter(quantidadeSelecionada, index)}
    <div>
      <div className="CoffeeListaItem__titulo">{coffee.titulo}</div>
      <div className="CoffeeListaItem__preco">R$ {coffee.preco.toFixed(2)}</div>
      <div className="CoffeeListaItem__descricao">{coffee.descricao}</div>
      <div className="CoffeeListaItem__acoes Acoes">
        <button className={`Acoes__adicionar ${!quantidadeSelecionada && "Acoes__adicionar--preencher"}`} onClick={(e) => { e.stopPropagation(); onAdd(index); }}>adicionar</button>
        {removeButton(quantidadeSelecionada, index)}
      </div>
    </div>
    <img className="CoffeeListaItem__foto" src={coffee.foto} />
  </div>
  );
}

export default CoffeeListaItem;
