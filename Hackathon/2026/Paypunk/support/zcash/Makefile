# zcashd + lightwalletd regtest funding stack.

BLOCKS ?= 120
UA     ?=

.PHONY: help up down reset logs ps info fund cli

help:
	@echo "make up               # build + start zcashd + lightwalletd"
	@echo "make fund UA=<ua>     # mine + shield coinbase into your Orchard UA"
	@echo "make info             # chain info (height, value pools)"
	@echo "make logs             # follow logs"
	@echo "make ps               # container status"
	@echo "make down             # stop, keep data"
	@echo "make reset            # stop and DELETE all regtest data"

up:
	docker compose up -d --build

down:
	docker compose down

reset:
	docker compose down -v

logs:
	docker compose logs -f

ps:
	docker compose ps

info:
	docker compose exec -T zcashd zcash-cli -datadir=/data getblockchaininfo

fund:
	@test -n "$(UA)" || { echo "usage: make fund UA=<orchard-ua> [BLOCKS=120]"; exit 1; }
	./fund.sh $(UA) $(BLOCKS)

# Ad-hoc CLI: make cli ARGS="getblockcount"
cli:
	docker compose exec -T zcashd zcash-cli -datadir=/data $(ARGS)

mine:
	./mine.sh
