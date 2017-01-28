NPMBIN = $(shell npm bin)
TSC = $(NPMBIN)/tsc
WEBPACK = $(NPMBIN)/webpack

transpile:
	# Transpile TypeScript to JavaScript
	@$(TSC); exit 0

test: transpile
	# TODO: Implement
	# Run AVA test
	# @$(AVA)
	# Collect coverage
	# Format report
	@exit 1

build-prod: transpile
	@export NODE_ENV="production"; \
	# Build vendor DLL
	npm run build:client:dll; \
	# Build client bundle
	npm run build:client; \

clean:
	# Remove all JavaScript's
	@sh deploy/clean_javascripts.sh

