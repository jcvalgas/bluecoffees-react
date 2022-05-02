import './CoffeeListaItem.css'

function CoffeeListaItem(){
  const removerItem = (i) => console.log(`remover ${i}`);
  const adicionarItem = (i) => console.log(`adicionar ${i}`);
  const index = 0;
  const coffeeSelecionado = [0];
  const coffee = {
      titulo: 'Metropolitan Express',
      preco: 10,
      descricao: 'tempor incididunt ut labore et dolore magna aliqua.',
      foto: require('assets/images/large-coffee_ccexpress.png')
  }

  const badgeCounter = (canRender, index) => Boolean(canRender) && (<span className="CoffeeListaItem__badge"> {coffeeSelecionado[index]} </span>);
  const removeButton = (canRender, index) => Boolean(canRender) && (<button className="Acoes__remover" onClick={() => removerItem(index)}>remover</button>)
  return (
    <div className="CoffeeListaItem" key={`CoffeeListaItem-${index}`}>
    {badgeCounter(coffeeSelecionado[index], index)}
    <div>
      <div className="CoffeeListaItem__titulo">{coffee.titulo}</div>
      <div className="CoffeeListaItem__preco">R$ {coffee.preco.toFixed(2)}</div>
      <div className="CoffeeListaItem__descricao">{coffee.descricao}</div>
      <div className="CoffeeListaItem__acoes Acoes">
        <button className={`Acoes__adicionar ${!coffeeSelecionado[index] && "Acoes__adicionar--preencher"}`} onClick={() => adicionarItem(index)}>adicionar</button>
        {removeButton(coffeeSelecionado[index], index)}
      </div>
    </div>
    <img className="CoffeeListaItem__foto" src={coffee.foto} />
  </div>
  );
}

export default CoffeeListaItem;
