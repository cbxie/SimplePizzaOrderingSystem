import { Models } from './models';

export class OrderEntry {
    toppingType: Models.ToppingType[];
    toppings: Models.Topping[];
    pizzas: Models.Pizza[];
    offers: Models.Offer[];        
}