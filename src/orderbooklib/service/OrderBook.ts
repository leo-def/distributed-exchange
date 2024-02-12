import { OrderSideEnum } from "../enums/OrderSide.enum"
import { Match } from "../types/Match"
import { Order } from "../types/Order"
import { OrderUtils } from "../utils/OrderUtils"

export class OrderBook {
    pending: Order[] = []
    orderBook: Match[] = []

    handleOrder(order: Order) {
        this.pending.push(order)
    }
  
    handleMatch(order: Order, match: Order) {
        this.pending = this.pending.filter( (curr) =>
            curr.id !== order.id &&
            curr.id !== match.id
        )
        const buyOrder = order.side === OrderSideEnum.buy
            ? order
            : match
        const sellOrder = order.side === OrderSideEnum.sell
            ? order
            : match
        this.orderBook.push({
            buyOrder,
            sellOrder
        })
    }

    findOrderMatch(order: Order) {
        return this.pending.find((curr) => OrderUtils.isMatch(order, curr))
    }
}