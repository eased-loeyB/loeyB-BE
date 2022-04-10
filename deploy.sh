#!/bin/bash

STAGE=${1}
if [[ -z ${STAGE} ]]; then
    echo 'Stop Deploy'
    exit;
fi

IP_LIST=$(aws ec2 describe-instances --filters --query "Reservations[].Instances[].[PublicIpAddress,Tags[?Key=='Name'].Value[]]" --output text --region ap-northeast-2 | sed '$!N;s/\n/\t/' | grep loeyb-${STAGE}-api | awk '{print $1}')

for IP in ${IP_LIST};
do
    echo '===================='
    echo ${IP}
    ssh  -o "StrictHostKeyChecking no" -i loeyb-api.pem ec2-user@${IP} /home/ec2-user/docker.sh
    sleep 3
done;