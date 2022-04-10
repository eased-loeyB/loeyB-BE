#!/bin/bash


echo '===================='
ssh  -o "StrictHostKeyChecking no" -i loeyb-api.pem ec2-user@3.39.85.24 /home/ec2-user/docker.sh
