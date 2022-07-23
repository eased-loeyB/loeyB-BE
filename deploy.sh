#!/bin/bash


echo '=========================================='
ssh  -o "StrictHostKeyChecking no" -i loeyb-api.pem ubuntu@3.36.85.171 /home/ubuntu/docker.sh
echo '=========================================='
