#!/bin/bash


echo '=========================================='
ssh  -o "StrictHostKeyChecking no" -i loeyb-api.pem ubuntu@3.38.117.249 /home/ubuntu/docker.sh
echo '=========================================='
