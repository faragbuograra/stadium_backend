.PHONY: dev prod down prune migrate-up seed
include .env
export

dev:
	docker-compose -f docker-compose-dev.yml up --build -d
dev.down:
	docker-compose -f docker-compose-dev.yml down
prod:
	docker-compose -f docker-compose.yml up --build -d
down:
	docker-compose down
prune:
	docker system prune && docker volume prune && docker image prune
migrate:
	docker exec -it smdb npm run migrate
seed:
	docker exec -it smdb npm run seed
