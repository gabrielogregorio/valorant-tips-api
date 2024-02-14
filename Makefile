.PHONY: dev

d: dev
test: tests
log: logs
log-api: logs-api

dev: start-setup
	@docker compose -f ./docker-compose.dev.yaml up -d

build: start-setup
	make down
	@docker compose -f ./docker-compose.dev.yaml up --build --force-recreate -d

down:
	@docker compose -f ./docker-compose.dev.yaml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.test.yaml down --remove-orphans --volumes

stop:
	@docker compose -f ./docker-compose.dev.yaml stop
	@docker compose -f ./docker-compose.test.yaml stop

dev-db: start-setup
	@docker compose -f ./docker-compose.dev.yaml up -d vavatips-api-mongodb

build-db: start-setup
	@docker compose -f ./docker-compose.dev.yaml up --build --force-recreate -d vavatips-api-mongodb


build-db-test: start-setup
	@docker compose -f ./docker-compose.test.yaml up --build --force-recreate -d valorant-tips-database-test

tests: start-setup
	@docker compose -f ./docker-compose.test.yaml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.test.yaml up --build --force-recreate -d valorant-tips-database-test
	@docker compose -f ./docker-compose.test.yaml run -T api-test yarn test:docker
	@docker compose -f ./docker-compose.test.yaml rm -f -s -v valorant-tips-database-test api-test

bash:
	@docker exec -it vavatips-api /bin/bash

bash-mongo:
	@docker exec -it vavatips-api-mongodb /bin/bash

logs:
	@docker compose -f ./docker-compose.dev.yaml logs -f

logs-api:
	@docker compose -f ./docker-compose.dev.yaml logs -f vavatips-api

start-setup:
	@if [ ! -f .env ]; then cp .env.example .env; fi


