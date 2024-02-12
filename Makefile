.PHONY: dev stop

dev: d
stop: s
log: l
build: b


d: start-setup
	@yarn
	@docker compose up --build -d

b: start-setup
	@yarn
	@docker compose -f ./docker-compose.yml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.yml up --build --force-recreate -d

s:
	@docker compose down

bash:
	@docker exec -it api /bin/bash

bash-mongo:
	@docker exec -it database /bin/bash

l:
	@docker compose -f ./docker-compose.yml logs -f

lint:
	@docker compose -f ./docker-compose.yml run -it api yarn lint

start-setup:
	@if [ ! -f .env ]; then cp .env.example .env; fi
