import { OrderSideEnum } from "../enums/OrderSide.enum"
import { ClientDetails } from "../types/ClientDetails"
import { Order } from "../types/Order"
import {v4 as uuidv4} from 'uuid';

export class OrderUtils {
    static generateId(): string {
        return uuidv4()
    }

    static generateOrder({
        symbol,
        side,
        price,
        quantity,
        client,
    }: {
        symbol: string,
        side: OrderSideEnum,
        price: number,
        quantity: number,
        client?: ClientDetails
    }): Order {
        return ({
            id: OrderUtils.generateId(),
            symbol,
            side,
            price,
            quantity,
            client,
        })
    }

    static isMatch(orderA: Order, orderB: Order): boolean {
        return (
            orderA.symbol === orderB.symbol &&
            orderA.side !== orderB.side &&
            orderA.price === orderB.price)
    }
}
