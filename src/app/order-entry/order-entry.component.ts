import { Component, OnInit } from '@angular/core';

import { Models } from '../models';
import { OrderEntry } from '../order-entry';
import { OrderEntryService } from '../order-entry.service';
import { filter } from 'minimatch';
import { CurrencyPipe } from '@angular/common';
import { temporaryAllocator } from '@angular/compiler/src/render3/view/util';

@Component({
  selector: 'app-order-entry',
  templateUrl: './order-entry.component.html',
  styleUrls: ['./order-entry.component.css']
})
export class OrderEntryComponent implements OnInit {
  title = 'Order Entry';
  orderEntry: OrderEntry;
  pizzas: Models.Pizza[];
  toppingTypes: Models.ToppingType[];
  toppings: Models.Topping[];
  offers: Models.Offer[];
  pizzaOrders: Models.Pizza[];

  constructor(private orderEntryService: OrderEntryService) { }

  ngOnInit() {
    this.getOrderEntry();
    this.getPizzas();
    this.getToppingTypes();
    this.getToppings();
    this.getOffers();
    this.initPizzaOrders();
  }

  initPizzaOrders(): void {
    this.pizzaOrders = [];
  }

  getOrderEntry(): void {
    this.orderEntryService.getOrderEntry()
      .subscribe(entry => this.orderEntry = entry);
  }

  getPizzas(): void {
    this.pizzas = this.orderEntry ? this.orderEntry.pizzas : this.pizzas;
  }

  getToppingTypes(): void {
    this.toppingTypes = this.orderEntry ? this.orderEntry.toppingType : this.toppingTypes;
  }

  getToppings(): void {
    this.toppings = this.orderEntry ? this.orderEntry.toppings : this.toppings;
  }

  getOffers(): void {
    this.offers = this.orderEntry ? this.orderEntry.offers : this.offers;
  }

  onToppingSelect(pizzaID: number, toppingID: number,  event: any): void {
    let tempPizza: Models.Pizza =  this.getPizza(pizzaID, this.pizzaOrders);
    let tempTopping: Models.Topping;
    let index: number;
    let checked: boolean = (event && event.currentTarget ? event.currentTarget.checked : false);

    if (!tempPizza) {
      tempPizza = this.getPizza(pizzaID);
    } 

    if (tempPizza) {
      if (!tempPizza.toppings) {
        tempPizza.toppings = [];
      }
      index = tempPizza.toppings.findIndex(t => t.id == toppingID);
      if (index != -1) {
        if (!checked) {
          tempPizza.toppings.splice(index, 1);
        }
      } else {
        tempTopping = this.getTopping(toppingID);
        if (tempTopping) {
          tempPizza.toppings.push(tempTopping);
        }
      }
      
      this.addRemovePizzaOrder(tempPizza);
    }
  }

  addRemovePizzaOrder(inputPizza: Models.Pizza): void {
    if (inputPizza) {
      let tempPizza: Models.Pizza = this.getPizza(inputPizza.id, this.pizzaOrders);
      let pizzaNotExists: boolean = false;
      
      if (!tempPizza) {
        pizzaNotExists = true;
        tempPizza = inputPizza;
      }
            
      if (tempPizza.toppings) {
        if (tempPizza.toppings.length == 0) {
          if (!pizzaNotExists) {
            this.removePizzaOrder(tempPizza);
          }
        } else {
          if (pizzaNotExists) {
            this.addPizzaOrder(tempPizza);
          }
          this.setOffers(tempPizza);
        }
      }
    }
  }

  addPizzaOrder(inputPizza: Models.Pizza): void {
    if (inputPizza && !this.getPizza(inputPizza.id, this.pizzaOrders)) {
      this.pizzaOrders.push(inputPizza);
    }
  }

  removePizzaOrder(inputPizza: Models.Pizza): void {
    let index: number;
    if (inputPizza) {
      index = this.pizzaOrders.findIndex(p => p.id == inputPizza.id);      
      this.pizzaOrders.splice(index, 1);
    }
  }
  
  getPizza(pizzaID: number, inputPizzas?: Models.Pizza[]): Models.Pizza {
    let tempPizzas = (inputPizzas || this.pizzas || []).filter(p => p.id == pizzaID);
    return (tempPizzas && tempPizzas.length > 0) ? tempPizzas[0] : null;
  }

  getTopping(toppingID: number, inputToppings?: Models.Topping[]): Models.Topping {
    let tempToppings = (inputToppings || this.toppings || []).filter(t => t.id == toppingID);
    return (tempToppings && tempToppings.length > 0) ? tempToppings[0] : null;
  }

  setOffers(inputPizza: Models.Pizza): void {
    let desc: string = '';
    let tempOffers: Models.Offer[];
    let tempOffer: Models.Offer;
    let index: number = -1;
    let removeOffer: boolean;

    if (inputPizza) {
      if (!inputPizza.offers) {
        inputPizza.offers = [];
      }
      tempOffers = this.offers.filter(o => o.pizzaTypeID == inputPizza.typeID);
      if (tempOffers && tempOffers.length > 0) {
        for (let i = 0; i < tempOffers.length; i++) {
          removeOffer = true;
          index = inputPizza.offers.findIndex(o => o.id == tempOffers[i].id);
          if (tempOffers[i].pizzaCount == inputPizza.quantity) {
            if (this.getToppingCount(inputPizza.toppings) >= tempOffers[i].toppingCount) {
              if (index == -1) {
                inputPizza.offers.push(tempOffers[i]);                
              } else {
                removeOffer = false;
              }             
            }
          } 

          if (index != -1 && removeOffer) {
            inputPizza.offers.splice(index, 1);
          }
        }
      }
    }
  }

  getToppingCount(inputToppings: Models.Topping[]): number {
    let count: number = 0;

    if (inputToppings) {
      for (let i = 0; i < inputToppings.length; i++) {
        count += inputToppings[i].count;
      }  
    }

    return count;
  }

  getOfferMarkup(pizzaID: number): string {
    let markup: string = '';
    let tempPizza: Models.Pizza = this.getPizza(pizzaID, this.pizzaOrders);
    let tempOffers: Models.Offer[];
    if (tempPizza) {
      tempOffers = (tempPizza.offers || []);
      for (let i = 0; i < tempOffers.length; i++) {
        markup += markup = `
        <div class="text-success">
          <h6 class="my-0">${tempOffers[i].name} (-${tempOffers[i].price.toLocaleString("en-us", {style: tempOffers[i].isPercentage ? 'percent' : 'currency', currency: 'USD'})})</h6>
          <small>${tempOffers[i].description}</small>
        </div>
        `;
      }      
    }

    return markup;
  }

  getPizzaTotalMarkup(pizzaID: number): string {
    let markup: string = '';
    let tempPizza: Models.Pizza = this.getPizza(pizzaID, this.pizzaOrders);
    let total: number = 0;
    let discount: number = 0;
    let discountMarkup: string = '';
    if (tempPizza) {
      total += tempPizza.price * tempPizza.quantity;
      if (tempPizza.toppings) {
        for (let i = 0; i < tempPizza.toppings.length; i++) {
          total += tempPizza.toppings[i].price;
        }
      }

      if (tempPizza.offers) {
        for (let i = 0; i < tempPizza.offers.length; i++) {
          discount += total * tempPizza.offers[i].price;          
        }
      }

      if (discount > 0) {
        discountMarkup =`<small class="text-danger"><del>${total.toLocaleString("en-us", {style: 'currency', currency: 'USD'})}</div></small>`;
      }

      markup = `
        <div>  
          ${discountMarkup}        
          <h6 class="text-primary">${(total - discount).toLocaleString("en-us", {style: 'currency', currency: 'USD'})}</h6>
        </div>
      `;          
    }

    return markup;
  }

  resetPizzaOrder(): void {
    if (this.pizzaOrders) {
      this.pizzaOrders.length = 0;
    }
  }
}
