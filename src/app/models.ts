

export module Models {
    export class Unit {
        id?: number;
        name?: string;
        price?: number;
    }

    export class ToppingType extends Unit {
        typeID?: number;
        type?: string;
    }

    export class Topping extends ToppingType {        
        count: number;
    }

    export class Offer {
        id: number;
        name: string;
        pizzaTypeID: number;
        pizzaCount: number;
        toppingCount: number; 
        price: number;       
        isPercentage?: boolean;

        description?: string;
    } 

    export class Pizza extends Unit {
        typeID?: number;
        quantity?: number;
        toppings?: Topping[];
        offers?: Offer[];
    }       
}