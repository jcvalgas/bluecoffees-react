import { Api } from 'helpers/Api';

const parseResponse = (response) => response.json;

export const CoffeeService = {
  getLista: () =>
    fetch(Api.coffeeLista(), { method: 'GET' }).then(parseResponse),
  getById: (id) =>
    fetch(Api.coffeeById(id), { method: 'GET' }).then(parseResponse),
  create: () =>
    fetch(Api.createCoffee(), { method: 'POST' }).then(parseResponse),
  updateById: (id) =>
    fetch(Api.updateCoffeeById(id), { method: 'PUT' }).then(parseResponse),
  deleteById: (id) =>
    fetch(Api.deleteCoffeeByid(id), { method: 'DELETE' }).then(parseResponse),
};
