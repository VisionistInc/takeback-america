EC2_DEST = ubuntu@takeback.labs.visionistinc.com
DOCKER_IMAGE = takeback

.PHONY: all docker docker-run compile run

deps:
	yarn

run: deps
	yarn start

docker-run:
	@echo
	@echo "** Starting $(DOCKER_IMAGE), listening on http://localhost:8000..."
	@echo
	docker run -p 8000:80 $(DOCKER_IMAGE)

static-assets: deps
	yarn build

docker-build: static-assets
	@echo
	@echo "** Building $(DOCKER_IMAGE)..."
	@echo
	docker build -t $(DOCKER_IMAGE) .

docker-copy:
	@echo
	@echo "** Uploading $(DOCKER_IMAGE) container to: $(EC2_DEST)..."
	@echo
	docker save $(DOCKER_IMAGE) | ssh -i $(echo $TEST_KEY | /dev/stdin) $(EC2_DEST) "docker load"

docker-deploy:
	@echo
	@echo "** Launching takeback:latest on $(EC2_DEST)..."
	@echo
	@echo $(TEST_KEY) | ssh -i /dev/stdin $(EC2_DEST) "docker ps -aq | xargs docker rm -f 2> /dev/null; docker run -d -p 80:3003 --log-opt max-file=2 --log-opt max-size=100m --restart=unless-stopped $(DOCKER_IMAGE)"

docker-all: docker-build docker-copy docker-deploy
