#!/bin/bash


echo '=========================================='
ssh  -o "StrictHostKeyChecking no" -i loeyb-api.pem ubuntu@43.200.170.189 /home/ubuntu/docker.sh
echo '=========================================='
