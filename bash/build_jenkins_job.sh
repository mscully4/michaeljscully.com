#!/bin/bash

#Retrieve password
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${3}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")

JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB "${1}/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken" -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue | tr -d '\"' )
JENKINS_URL='http://localhost:8080'
JOB_NAME='michaeljscully.com'
LOGGING_PATH=/home/ubuntu/log.txt

function build_jenkins_job() {
        sudo echo "$(date): Retrieved Jenkins Tokens" >> $4
        
        curl -vs -XPOST "$1/createItem?name=$2" -u "admin:${3}" --data-binary @/home/ubuntu/config.xml -H "Content-Type:text/xml" >> $4 2>&1
        sudo echo "$(date): Submitted Job to Jenkins" >> $4
        
        sleep 5s

        curl -XPOST "$1/job/$2/build" -u "admin:${JENKINS_TOKEN}"
        sudo echo "$(date): Built the job" >> $4
}

build_jenkins_job $JENKINS_URL $JOB_NAME $JENKINS_TOKEN $LOGGING_PATH
