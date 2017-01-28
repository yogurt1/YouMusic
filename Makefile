NPMMBIN = $(shell npm bin)
WEBPACK = $(NPMBIN)/webpack

build-prod: export NODE_ENV = production
	@npm run build:server
	@npm run build:client:dll
	@npm run build:client

test:
	@echo "WTF"

