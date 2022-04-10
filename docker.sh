#!/bin/bash
  
if ! [[ -x "$(command -v aws)" ]]; then
echo 'Error: aws is not installed.' >&2
  exit 1
fi

if ! [[ -x "$(command -v docker-compose)" ]]; then
  echo 'Error: docker-compose is not installed.' >&2
  exit 1
fi

docker login -u AWS -p $(aws ecr get-login-password --region ap-northeast-2) 568080291959.dkr.ecr.ap-northeast-2.amazonaws.com
aws ecr get-login-password --region ap-northeast-2 | docker login --username AWS --password-stdin 568080291959.dkr.ecr.ap-northeast-2.amazonaws.com
docker-compose --compatibility pull
docker-compose --compatibility --env-file development.env up -d