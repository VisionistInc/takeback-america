SUBMODULES = '.' 'HHS-API' 'HHS-Theme' 'HHS-UI'
.PHONY: all init deps docker docker-run compile run

init:
	git submodule init
	git submodule update

deps:
	@- $(foreach S, $(SUBMODULES), \
		cd $(S) && npm install \
	)

docker: deps
	docker build -t takeback:latest .

run:
	npm run start

docker-run:
	@echo
	@echo Starting takeback:latest, listening on http://localhost:8000...
	@echo
	docker run -p 8000:80 takeback:latest

