import dotenv from "dotenv"
import { OrderGrenacheClient } from "./grenache/clients/OrderGrenacheClient"
import { OrderGrenacheService } from "./grenache/services/OrderGrenacheService"
import { OrderSideEnum } from "./orderbooklib/enums/OrderSide.enum";
import { ClientDetailsUtils } from "./orderbooklib/utils/ClientDetailsUtils";
import { OrderUtils } from "./orderbooklib/utils/OrderUtils";

async function runClient() {
    console.log('runClient')
    const config = {
        url: process.env.workbook_grape_url ?? '',
        port: Number(process.env.client_port)
    }
    const client = new OrderGrenacheClient(ClientDetailsUtils.generateClientDetails(), config)
    const order1 = OrderUtils.generateOrder({
        symbol: 'AAPL',
        side: OrderSideEnum.buy,
        price: 150.0,
        quantity: 10,
      })
      const order2 =  OrderUtils.generateOrder({
        symbol: 'AAPL',
        side: OrderSideEnum.sell,
        price: 150.0,
        quantity: 5,
    })
    await client.submitOrder(order1)
    await client.submitOrder(order2)
}

async function runClientB() {
    console.log('runClientB')
    const config = {
        url: process.env.workbook_grape_url ?? '',
        port: Number(process.env.client_b_port)
    }
    const client = new OrderGrenacheClient(ClientDetailsUtils.generateClientDetails(), config)
    const order3 =  OrderUtils.generateOrder({
        symbol: 'AAPL',
        side: OrderSideEnum.sell,
        price: 150.0,
        quantity: 10,
    })
      const order4 =  OrderUtils.generateOrder({
        symbol: 'AAPL',
        side: OrderSideEnum.buy,
        price: 150.0,
        quantity: 5,
    })
    await client.submitOrder(order3)
    await client.submitOrder(order4)
}


async function checkStatus() {
    console.log('checkStatus')
    const config = {
        url: process.env.workbook_grape_url ?? '',
        port: Number(process.env.check_status_port)
    }
    const client = new OrderGrenacheClient(ClientDetailsUtils.generateClientDetails(), config)
    await client.checkStatus().then((status) => console.log(status))
}

async function runService() {
    console.log('runService')
    const config = {
        url: process.env.workbook_grape_url ?? '',
        port: Number(process.env.server_port)
    }
    const service = new OrderGrenacheService(ClientDetailsUtils.generateClientDetails(), config)
    await service.run();
}


async function run() {
    console.log('run')
    dotenv.config()
    if (process.argv[2] === 'client') {
       await runClient()
    } else if (process.argv[2] === 'client_b') {
        await runClientB()
    } else if (process.argv[2] === 'check_status') {
        await checkStatus()
    } else {
        await runService()
    }
}

run().then(() => console.log('finished')).finally(() => console.log('finally'))