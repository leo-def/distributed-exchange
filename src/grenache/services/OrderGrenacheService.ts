import { Runnable } from "../../orderbooklib/interfaces/Runnable"
import { OrderService } from "../../orderbooklib/service/OrderService"
import { ClientDetails } from "../../orderbooklib/types/ClientDetails"
import { OrderServiceConfig } from "../../orderbooklib/types/OrderServiceConfig"
import { OrderGrenacheClient } from "../clients/OrderGrenacheClient"
const { PeerRPCServer }  = require('grenache-nodejs-ws')
const Link = require('grenache-nodejs-link')

export class OrderGrenacheService extends OrderService implements Runnable {
    constructor(private readonly details: ClientDetails, private readonly config: OrderServiceConfig) {
        super(new OrderGrenacheClient(details, config))
    }

    async run(): Promise<void> {
        const { port, url } = this.config
        
        return new Promise( (resolve, reject) => {
            try {
                const link = new Link({
                    grape: url
                })
                link.start()
                const peer = new PeerRPCServer(link, {})
                peer.init()
                const service = peer.transport('server')
                service.listen(port)
                setInterval(() => {
                    link.announce('order_book_service', service.port, {})
                }, 1000)
                
                service.on('request', (rid: any, key: any, payload: any, handler: { reply: (arg0: any, arg1: any) => void }) => {
                    const { order, match, checkStatus } = payload
                    try {
                        if(checkStatus) {
                            const result = this.checkStatus()
                            handler.reply(null, result)
                            return
                        }
                        if(match) {
                            this.handleMatch(order, match)
                            handler.reply(null, { order, match })
                            return
                        } else {
                            this.handleOrder(order)
                            handler.reply(null, { order })
                            return
                        }
                    } catch(err) {
                        console.error(err)
                        handler.reply(err, {order, match, checkStatus})
                    }

                

                })
            } catch (err) {
                reject(err)
            }
        })
    }
}