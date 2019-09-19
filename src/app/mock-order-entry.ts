import { OrderEntry } from './order-entry';

export const ORDERENTRY: OrderEntry = {
    pizzas: [
      {id: 1, name: 'Small', price: 5, typeID: 1, quantity: 1},
      {id: 2, name: 'Medium', price: 7, typeID: 2, quantity: 1},
      {id: 3, name: 'Large', price: 8, typeID: 3, quantity: 1},
      {id: 4, name: 'Extra Large', price: 9, typeID: 4, quantity: 1}
    ],
    toppingType: [
      {typeID: 1, type: 'Veg Options'},
      {typeID: 2, type: 'Non Veg Options'}
    ],
    toppings: [
      {id: 1, name: 'Tomatoes', price: 1, typeID: 1, count: 1},
      {id: 2, name: 'Onions', price: 0.5, typeID: 1, count: 1},
      {id: 3, name: 'Bell pepper', price: 1, typeID: 1, count: 1},
      {id: 4, name: 'Mushrooms', price: 1.2, typeID: 1, count: 1},
      {id: 5, name: 'Pineapple', price: 0.75, typeID: 1, count: 1},
      {id: 6, name: 'Sausage', price: 1, typeID: 2, count: 1},
      {id: 7, name: 'Pepperoni', price: 2, typeID: 2, count: 2},
      {id: 8, name: 'Barbecue chicken', price: 3, typeID: 2, count: 2}
    ],
    offers: [
      {id: 1, name: 'Offer1', pizzaTypeID: 2, pizzaCount: 1, toppingCount: 2, price: 5, description: '1 Medium Pizza with 2 topping = $5'}, 
      {id: 1, name: 'Offer1', pizzaTypeID: 2, pizzaCount: 2, toppingCount: 4, price: 9, description: '2 Medium Pizza with 4 topping each = $9'}, 
      {id: 1, name: 'Offer1', pizzaTypeID: 3, pizzaCount: 1, toppingCount: 4, price: 0.5, isPercentage: true, description: '1 Large with 4 toppings ( Peperoni and Barbecue chicken are counted as 2 toppings)- 50% discount'}
    ]
  };