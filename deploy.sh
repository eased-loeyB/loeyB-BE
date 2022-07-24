#!/bin/bash


echo '=========================================='
ssh  -o "StrictHostKeyChecking no" -i loeyb-api.pem ubuntu@13.125.81.111 /home/ubuntu/docker.sh
echo '=========================================='
