NPMBIN = $(shell npm bin)
WEBPACK = $(NPMBIN)/webpack
TSC = $(NPMBIN)/tsc

build-prod: export NODE_ENV = production
	# Transpile TypeScript to JavaScript
	@$(TSC) app server
	# Build DLL with vendor deps
	@npm run build:client:dll
	# Build client bundle
	@npm run build:client

test:
	# TODO: Implement
	# Transpiple TypeScript to JavaScript
	# Run AVA
	# Generate coverage report
	# Clean JavaScript's
	@exit 1



