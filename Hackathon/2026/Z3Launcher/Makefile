BINARY  := z3launcher
PKG     := ./...
COMPOSE := deploy/compose/docker-compose.yml
WEB     := web

.PHONY: all build test vet tidy run up clean web web-install web-test \
        serve serve-testnet serve-regtest

all: vet test build

# Build the Go binary (embeds the prebuilt web/dist).
build:
	go build -o bin/$(BINARY) ./cmd/z3launcher

# Rebuild the React dashboard into web/dist (embedded by the Go build).
web: web-install
	cd $(WEB) && npm run build

web-install:
	cd $(WEB) && npm install

test:
	go test $(PKG)

web-test:
	cd $(WEB) && npm test

vet:
	go vet $(PKG)

tidy:
	go mod tidy

# Dry run: print resolved config + endpoints (no Docker required).
run: build
	./bin/$(BINARY) --compose-file $(COMPOSE)

# Run the control plane + dashboard at http://127.0.0.1:8088 (requires Docker
# for the stack itself; the server starts regardless). Default network: mainnet.
serve: build
	./bin/$(BINARY) --compose-file $(COMPOSE) -serve

# Same, on testnet (~10 GB, production-equivalent consensus) — the recommended
# way to validate an app works "in production" without the ~300 GB mainnet sync.
serve-testnet: build
	./bin/$(BINARY) --compose-file $(COMPOSE) -serve -network testnet

# Same, on regtest (instant, local, no real funds) — best for integration tests
# and the live shielded-tx demo (see the regtest seeder).
serve-regtest: build
	./bin/$(BINARY) --compose-file $(COMPOSE) -serve -network regtest

# Start Zebra via the vendored compose (requires Docker).
up: build
	./bin/$(BINARY) --compose-file $(COMPOSE) -up

clean:
	rm -rf bin
