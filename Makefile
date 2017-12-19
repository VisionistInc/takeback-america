SUBMODULES = '.' 'HHS-API' 'HHS-Theme' 'HHS-UI'
EC2_DEST = ubuntu@takeback.labs.visionistinc.com
DOCKER_IMAGE = takeback

.PHONY: all init deps docker docker-run compile run

init:
	git submodule init
	git submodule update

deps:
	@- $(foreach S, $(SUBMODULES), \
		cd $(S) && npm install \
	)

run:
	npm run start

docker-run:
	@echo
	@echo "** Starting $(DOCKER_IMAGE), listening on http://localhost:8000..."
	@echo
	docker run -p 8000:80 $(DOCKER_IMAGE)

docker-build: 
	@echo
	@echo "** Building $(DOCKER_IMAGE)..."
	@echo
	cd HHS-UI && npm run build && cd ..
	docker build -t $(DOCKER_IMAGE) . 

docker-copy:
	@echo
	@echo "** Uploading $(DOCKER_IMAGE) container to: $(EC2_DEST)..."
	@echo
	docker save $(DOCKER_IMAGE) | ssh -C $(EC2_DEST) docker load 

docker-deploy:  
	@echo 
	@echo "** Launching takeback:latest on $(EC2_DEST)..."
	@echo 
	ssh $(EC2_DEST) "docker ps -aq | xargs docker rm -f 2> /dev/null; docker run -d -p 80:80 --log-opt max-file=2 --log-opt max-size=100m --restart=unless-stopped $(DOCKER_IMAGE)"

docker-all: docker-build docker-copy docker-deploy

