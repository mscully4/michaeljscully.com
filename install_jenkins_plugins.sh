#!/bin/bash

#Retrieve password
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)

#Retrieve Crumb and Token
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")
JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue)

#Strip extra quotes from JENKINS_TOKEN
JENKINS_TOKEN=$(echo "${JENKINS_TOKEN//\"/}")

#Install plugin
PLUGINS=('git' 'git-client' 'workflow-job' 'build-timeout' 'timestamper' 'pipeline-stage-view' 'workflow-durable-task-step' 'workflow-cps' 'pipeline-model-definition' 'pipeline-model-api') #'durable-task' 'pipeline-model-api' 'pipeline-model-extensions')

for p in "${PLUGINS[@]}"; do
    curl -X POST -d "<jenkins><install plugin=\"${p}@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${JENKINS_TOKEN}" http://localhost:8080/pluginManager/installNecessaryPlugins
done

#Restart Jenkins
curl -X POST --user "admin:${JENKINS_TOKEN}" http://localhost:8080/safeRestart

