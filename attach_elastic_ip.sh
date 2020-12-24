#! /bin/bash

REGION="us-east-2"
INSTANCE_ID=$(wget -q -O - http://169.254.169.254/latest/meta-data/instance-id)
ADDRESSES=$(aws ec2 describe-addresses --region $REGION)

if (( $(jq ".Addresses | length" <<< "$ADDRESSES") > 1 ))
    then echo "More than 1 Elastic IP"
fi

aws ec2 associate-address --instance-id $INSTANCE_ID --region us-east-2 --public-ip 3.21.221.96