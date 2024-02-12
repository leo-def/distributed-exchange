import { OrderClient } from "../../orderbooklib/service/OrderClient"
import { ClientDetails } from "../../orderbooklib/types/ClientDetails"
import { Order } from "../../orderbooklib/types/Order"
import { OrderServiceConfig } from "../../orderbooklib/types/OrderServiceConfig"

const { PeerRPCClient }  = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

export class OrderGrenacheClient implements OrderClient {
    peer: any

    constructor(private readonly details: ClientDetails, private readonly config: OrderServiceConfig) {
        const { url } = this.config
        const link = new Link({
            grape: url,
            requestTimeout: 10000
        })
        link.start()
        this.peer = new PeerRPCClient(link, {})
        this.peer.init()
    }
    
    async submitOrder(params: Omit<Order, 'client'>): Promise<any> {
        const order = {
            ...params,
            client: this.details
        }
        const payload = { order }
        return await this.asyncOrderRequest(payload)
    }

    async submitMatch(order: Order, match: Order): Promise<any> {
        const payload = { order, match }
        return await this.asyncOrderRequest(payload)
    }

    async checkStatus(): Promise<any> {
        const payload = { checkStatus: true }
        return await this.asyncOrderRequest(payload)
    }
     
    asyncOrderRequest(payload: any): Promise<any>  {
        return new Promise((resolve, reject) => {
            this.peer.request(
                'order_book_service',
                payload,
                { timeout: 100000 },
                (err: any, result: any) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(result)
                    }
                }
            )
        })
    }

}