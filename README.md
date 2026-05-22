# Distributed Exchange (BFX Challenge)

A high-performance simplified P2P Distributed Exchange built with Node.js, TypeScript, and Grenache DHT network communication.

Each exchange node operates its own order book instance. Clients can submit limit buy/sell orders, which are distributed across the peer-to-peer Grape network. The matching engine matches matching buy/sell bids instantly, while any remaining order quantities are listed on the book.

## Features

- **P2P Microservice Topology**: Peer discovery and routing powered by **Bitfinex Grenache** Grape DHT (Distributed Hash Table).
- **Decentralized Matching Engine**: Real-time order matching executed independently at each node, maintaining decentralized consistencies.
- **Robust Orderbook state**: Fast limit order book supporting standard buy/sell order matches.
- **Modern TypeScript Stack**: Fully typed P2P link layers, request models, and order books.

## Setup & Running

### Prerequisites

- **Node.js**: version `v18.0.0` or higher.
- **Grape DHT**: Install Grape globally to establish a local peer-to-peer DHT network:
  ```bash
  npm install -g grenache-grape
  ```

### Step 1: Boot Grape DHT Servers

In separate terminals, boot two Grape nodes to form a local ring:

```bash
# Grape 1
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'

# Grape 2
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

### Step 2: Install & Build

Install dependencies and compile the TypeScript:

```bash
make install
make build
```

### Step 3: Run Exchange Nodes

Start multiple instances of exchange clients, passing separate links:

```bash
# Run Node 1
make run GRAPE_PORT=30001 NODE_PORT=8001

# Run Node 2 (in a separate terminal)
make run GRAPE_PORT=40001 NODE_PORT=8002
```

## Testing

Run unit tests verifying the matching engine and Link layer logic:

```bash
make test
```
