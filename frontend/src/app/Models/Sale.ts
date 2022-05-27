import { Book } from "./Book";

export interface Sale {
    clientUsername: String,
    books: Array<Book>,
    quantity: Array<number>,
    total: Number,
    gainedPoints: Number,
    date: Date,
    shipping: Number
}