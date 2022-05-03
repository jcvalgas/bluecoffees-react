import { Api } from 'helpers/Api';

const parseResponse = (res) => res.json();

const transformCoffee = (coffee) => {
  return {
    ...coffee,
    id: coffee._id,
    titulo: coffee.sabor
  };
}

const parseTransformLista = (response) => parseResponse(response).then(coffees => coffees.map(transformCoffee));

export const CoffeeService = {
  getLista: () =>
    fetch(Api.coffeeLista(), { method: 'GET' }).then(parseTransformLista),
  getById: (id) =>
    fetch(Api.coffeeById(id), { method: 'GET' }).then(parseTransformLista),
  create: () =>
    fetch(Api.createCoffee(), { method: 'POST' }).then(parseTransformLista),
  updateById: (id) =>
    fetch(Api.updateCoffeeById(id), { method: 'PUT' }).then(parseTransformLista),
  deleteById: (id) =>
    fetch(Api.deleteCoffeeByid(id), { method: 'DELETE' }).then(parseTransformLista),
};
