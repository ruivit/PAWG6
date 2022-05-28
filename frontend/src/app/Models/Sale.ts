import { Book } from "./Book";

export class Sale {
    clientUsername: String;
    books: String;
    total: Number;
    gainedPoints: Number;
    date: Date;
    shipping: Number;

    constructor(sale: Sale) {
        this.clientUsername = sale.clientUsername;
        this.books = sale.books;
        this.total = sale.total;
        this.gainedPoints = sale.gainedPoints;
        this.date = sale.date;
        this.shipping = sale.shipping;
    }
}


