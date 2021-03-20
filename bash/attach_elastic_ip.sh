REGION="us-east-2"
ELASTIC_IP="3.21.221.96"
INSTANCE_ID=$(wget -q -O - http://169.254.169.254/latest/meta-data/instance-id)

function allocate_elastic_ip() {
        ADDRESSES=$(aws ec2 describe-addresses --region $3 | jq -r ".Addresses[].PublicIp")

        if [[ $ADDRESSES == *$1* ]]; then
                aws ec2 associate-address --instance-id $2 --region $3 --public-ip $ELASTIC_IP
                return 1
        else
                return 0
        fi
}

allocate_elastic_ip $ELASTIC_IP $INSTANCE_ID $REGION
