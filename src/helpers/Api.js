const CoffeeContext = {
  coffeeEndpoint: () => `${Api.baseURL}/coffees`,
  coffeeLista: () => `${CoffeeContext.coffeeEndpoint()}/find-coffees`,
  coffeeById: (id) => `${CoffeeContext.coffeeEndpoint()}/find-coffees/${id}`,
  createCoffee: () => `${CoffeeContext.coffeeEndpoint()}/create`,
  updateCoffeeById: (id) => `${CoffeeContext.coffeeEndpoint()}/update/${id}`,
  deleteCoffeeByid: (id) => `${CoffeeContext.coffeeEndpoint()}/delete/${id}`,
};

export const Api = {
  baseURL: 'https://bluecoffees-server-production.up.railway.app',
  ...CoffeeContext,
};
