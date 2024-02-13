.PHONY: dev

dev: d
build: b
test: t
tests: t
log: l
stop: s

d: start-setup
	@yarn
	@docker compose -f ./docker-compose.dev.yml up --build -d

db: start-setup
	@yarn
	@docker compose -f ./docker-compose.dev.yml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.dev.yml up --build vavatips-api-mongodb

t: start-setup
	@docker compose -f ./docker-compose.test.yaml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.test.yaml up -d --build database-test
	@docker compose -f ./docker-compose.test.yaml run -T api-test yarn test:docker
	@docker compose -f ./docker-compose.test.yaml rm -f -s -v database-test api-test

b: start-setup
	@yarn
	@docker compose -f ./docker-compose.dev.yml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.dev.yml up --build --force-recreate -d

s:
	@docker compose -f ./docker-compose.dev.yml down

bash:
	@docker exec -it vavatips-api /bin/bash

bash-mongo:
	@docker exec -it vavatips-api-mongodb /bin/bash

l:
	@docker compose -f ./docker-compose.dev.yml logs -f

la:
	@docker compose -f ./docker-compose.dev.yml  logs -f vavatips-api

lint:
	@docker compose -f ./docker-compose.dev.yml run -it vavatips-api yarn lint

start-setup:
	@if [ ! -f .env ]; then cp .env.example .env; fi
