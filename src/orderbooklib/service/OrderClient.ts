import { Order } from "../types/Order";

export interface OrderClient {
    submitOrder(order: Order): Promise<void>
    submitMatch(order: Order, match: Order): Promise<void>
}