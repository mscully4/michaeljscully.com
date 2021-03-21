#! /bin/bash

LOGGING_PATH=/home/ubuntu/log.txt

#Jenkins Dependencies
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo echo "$(date): Gathered Jenkins Dependencies" >> $LOGGING_PATH

#Node Depedencies
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo echo "$(date): Gathered Node Dependencies" >> $LOGGING_PATH

#Update Repositories
sudo apt -y update
sudo apt-get -y update

#Install some stuff
sudo apt-get -y install nginx jenkins
sudo apt -y install python3-pip nodejs openjdk-8-jdk gunicorn awscli jq
sudo echo "$(date): Installed Packages" >> $LOGGING_PATH

#Grant Jenkins Sudo Access
echo "jenkins ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/jenkins
sudo echo "$(date): Granted Jenkins Sudo Access" >> $LOGGING_PATH

#Get other scripts from Github
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/bash/install_jenkins_plugins.sh -O /home/ubuntu/install_jenkins_plugins.sh
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/config.xml -O /home/ubuntu/config.xml
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/bash/build_jenkins_job.sh -O /home/ubuntu/build_jenkins_job.sh
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/bash/attach_elastic_ip.sh -O /home/ubuntu/attach_elastic_ip.sh
sudo echo "$(date): Loaded files from GitHub" >> $LOGGING_PATH

#Starting Jenkins
sudo service jenkins start
sudo echo "$(date): Started Jenkins" >> $LOGGING_PATH

sleep 20s

#Jenkins Parameters
JOB_NAME=michaeljscully.com
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)
JENKINS_URL='http://localhost:8080'

#Retrieve Crumb and Token
function get_token() {
        JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${1}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")
        JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$1 | jq .data.tokenValue | tr -d '\"' )
        echo $JENKINS_TOKEN
}

JENKINS_TOKEN=$(get_token $PASSWORD)

#Install necessary Jenkins Plugins
sudo chmod +x /home/ubuntu/install_jenkins_plugins.sh
. /home/ubuntu/install_jenkins_plugins.sh
install_jenkins_plugins $JENKINS_URL $JENKINS_TOKEN $LOGGING_PATH
sudo echo "$(date): Executed install_jenkins_plugins.sh" >> $LOGGING_PATH

sleep 2s

#Since Jenkins has restarted, a new token needs to be generated
JENKINS_TOKEN=$(get_token $PASSWORD)

sudo chmod +x /home/ubuntu/build_jenkins_job.sh
. /home/ubuntu/build_jenkins_job.sh
build_jenkins_job $JENKINS_URL $JOB_NAME $JENKINS_TOKEN $LOGGING_PATH
sudo echo "$(date): Executed build_jenkins_job.sh" >> $LOGGING_PATH

#Attach Elastic IP to Instance
REGION="us-east-2"
INSTANCE_ID=$(wget -q -O - http://169.254.169.254/latest/meta-data/instance-id)
IP_ADDRESS=3.21.221.96

aws ec2 associate-address --instance-id $INSTANCE_ID --region $REGION --public-ip $IP_ADDRESS
sudo echo "$(date): Attached Elastic IP to instance" >> $LOGGING_PATH

#Upload a copy of Jenkins Password to S3
sudo cat /var/lib/jenkins/secrets/initialAdminPassword >> /home/ubuntu/jenkins.txt
aws s3 cp /home/ubuntu/jenkins.txt s3://michaeljscullydotcom/jenkins.txt
sudo rm /home/ubuntu/jenkins.txt
