#!/bin/bash

#Retrieve password
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)

#Retrieve Crumb and Token
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")
JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue)

#Strip extra quotes from JENKINS_TOKEN
JENKINS_TOKEN=$(echo "${JENKINS_TOKEN//\"/}")
sudo echo "$(date): Retrieved Jenkins Tokens" >> /home/ubuntu/log.txt

#Create the job
curl -XPOST 'http://localhost:8080/createItem?name=michaeljscully.com' -u "admin:${JENKINS_TOKEN}" --data-binary @config.xml -H "Content-Type:text/xml"
sudo echo "$(date): Submitted Job to Jenkins" >> /home/ubuntu/log.txt

sleep 5s

#Build the job
curl -XPOST 'http://localhost:8080/job/michaeljscully.com/build' -u "admin:${JENKINS_TOKEN}"
sudo echo "$(date): Built the job" >> /home/ubuntu/log.txt