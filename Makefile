.PHONY: dev

d: dev
test: tests
log: logs
log-api: logs-api
la: logs-api

dev: start-setup
	make stop
	@docker compose -f ./docker-compose.dev.yaml up -d

build: start-setup
	@docker compose -f ./docker-compose.dev.yaml up --build --force-recreate -d

down:
	@docker compose -f ./docker-compose.dev.yaml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.test.yaml down --remove-orphans --volumes

delete-universe:
	@make down-all & make delete-all-containers & make delete-all-networks & make delete-all-volumes & make delete-all-images & make delete-all-unsed-images & yarn cache clean

delete-all-unsed-images:
	@docker image prune -a

down-all:
	@docker ps -q | xargs -r docker stop

delete-all-containers:
	@docker ps -aq | xargs -r docker rm

delete-all-networks:
	@docker network ls -q | grep -v -e "bridge" -e "host" -e "none" | xargs -r docker network rm

delete-all-volumes:
	@docker volume ls -q | xargs -r docker volume rm

delete-all-images:
	@docker images -q | xargs -r docker rmi

stop:
	@docker compose -f ./docker-compose.dev.yaml stop
	@docker compose -f ./docker-compose.test.yaml stop

dev-db: start-setup
	@docker compose -f ./docker-compose.dev.yaml up -d vavatips-api-mongodb

build-db: start-setup
	@docker compose -f ./docker-compose.dev.yaml up --build --force-recreate -d vavatips-api-mongodb

build-db-test: start-setup
	make stop
	@docker compose -f ./docker-compose.test.yaml up --build --force-recreate -d vavatips-db-test

# this cause broken in docker
tests: start-setup
	@docker compose -f ./docker-compose.test.yaml down --remove-orphans --volumes
	@docker compose -f ./docker-compose.test.yaml up --build -d vavatips-db-test
	@docker compose -f ./docker-compose.test.yaml run -T vavatips-api-test yarn run test
#	@docker compose -f ./docker-compose.test.yaml rm -f -s -v vavatips-db-test vavatips-api-test

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


