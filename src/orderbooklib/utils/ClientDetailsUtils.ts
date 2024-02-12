import { ClientDetails } from "../types/ClientDetails"
import { Order } from "../types/Order"
import {v4 as uuidv4} from 'uuid';

export class ClientDetailsUtils {
    static generateId(): string {
        return uuidv4()
    }

    static generateClientDetails(): ClientDetails {
        return ({
            id: ClientDetailsUtils.generateId(),
            publicKey: '',
            privateKey: ''
        })
    }

    static isMatch(orderA: Order, orderB: Order): boolean {
        return (
            orderA.symbol === orderB.symbol &&
            orderA.side !== orderB.side &&
            orderA.price === orderB.price)
    }
}
