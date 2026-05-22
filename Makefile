# Variables
NPM = npm
TS_NODE = npx ts-node
TSC = npx tsc

# Ports
GRAPE_PORT ?= 30001
NODE_PORT ?= 8001

.PHONY: all
all: build

# Install dependencies
.PHONY: install
install:
	$(NPM) install

# Compile TypeScript
.PHONY: build
build:
	$(TSC)

# Run P2P exchange node
.PHONY: run
run:
	GRAPE_PORT=$(GRAPE_PORT) NODE_PORT=$(NODE_PORT) $(TS_NODE) src/index.ts

# Run tests
.PHONY: test
test:
	$(NPM) test

# Clean compiled folder
.PHONY: clean
clean:
	rm -rf dist/
