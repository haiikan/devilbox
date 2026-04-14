#!/bin/sh

if hash docker-compose 2>/dev/null; then
    docker-compose exec --user devilbox ${1:-php} sh /home/devilbox/user/init-zsh.sh
	docker-compose exec --user devilbox ${1:-php} zsh -l
else
    docker compose exec --user devilbox php sh /home/devilbox/user/init-zsh.sh
	docker compose exec --user devilbox ${1:-php} zsh -l
fi
