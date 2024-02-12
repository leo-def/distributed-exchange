import { OrderSideEnum } from "../enums/OrderSide.enum"
import { ClientDetails } from "./ClientDetails"

export interface Order {
    id: string
    symbol: string
    side: OrderSideEnum
    price: number
    quantity: number
    client?: ClientDetails
}
