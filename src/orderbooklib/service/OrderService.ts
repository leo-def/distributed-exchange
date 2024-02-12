
import { Order } from "../types/Order"
import { OrderBook } from "./OrderBook"
import { OrderClient } from "./OrderClient"

export class OrderService {
    constructor(
        public readonly orderClient: OrderClient,
        private readonly orderBook: OrderBook = new OrderBook()
    ){}

    submitOrder(order: Order) {
        this.handleOrder(order)
        if(this.orderClient) {
            this.orderClient.submitOrder(order)
        }
    }
  
    submitMatch(order: Order, match: Order) {
        this.handleMatch(order, match)
        if(this.orderClient) {
            this.orderClient.submitMatch(order, match)
        }
    }

    handleOrder(order: Order) {
        this.orderBook.handleOrder(order)
    }
  
    handleMatch(order: Order, match: Order) {
        this.orderBook.handleMatch(order, match)
    }

    checkStatus() {
        const result = ({
            pending: this.orderBook.pending,
            orderBook: this.orderBook.orderBook,
        })
        return result
    }
}