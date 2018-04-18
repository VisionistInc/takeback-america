.PHONY: all clean node_modules webpack build

REGISTRY ?= registry.gitlab.caballero.network/boilerplates
IMAGE ?= react-app-boilerplate
TAG ?= latest

all: build

clean:
	rm -rf node_modules
	rm -rf dist

node_modules: clean
	yarn install

build: node_modules
	yarn build

docker: build
	docker build -t "$(REGISTRY)/$(IMAGE):$(TAG)" .

# deploy:
# 	docker push "$(REGISTRY)/$(IMAGE):$(TAG)"
