#!/bin/bash

#Retrieve password
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)

#Retrieve Crumb and Token
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")
JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue)

#Strip extra quotes from JENKINS_TOKEN
JENKINS_TOKEN=$(echo "${JENKINS_TOKEN//\"/}")
sudo echo "$(date): Retrieved Jenkins Tokens" >> /home/ubuntu/log.txt

#Install plugin
curl -X POST -d "<jenkins><install plugin=\"git@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${JENKINS_TOKEN}" http://localhost:8080/pluginManager/installNecessaryPlugins
curl -X POST -d "<jenkins><install plugin=\"workflow-job@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${JENKINS_TOKEN}" http://localhost:8080/pluginManager/installNecessaryPlugins
curl -X POST -d "<jenkins><install plugin=\"pipeline-model-definition@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${JENKINS_TOKEN}" http://localhost:8080/pluginManager/installNecessaryPlugins
sudo echo "$(date): Installed Jenkins Plugins" >> /home/ubuntu/log.txt

sleep 30s

#Restart Jenkins
curl -X POST --user "admin:${JENKINS_TOKEN}" 'http://localhost:8080/safeRestart'
sudo echo "$(date): Restarted Jenkins" >> /home/ubuntu/log.txt

sleep 180s

sudo echo "$(date): Slept for a long time" >> /home/ubuntu/log.txt

