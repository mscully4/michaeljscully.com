#!/bin/bash

#Retrieve password
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)

#Retrieve Crumb and Token
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")
JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue)

#Strip extra quotes from JENKINS_TOKEN
JENKINS_TOKEN=$(echo "${JENKINS_TOKEN//\"/}")

#Install plugin
PLUGINS=('git' 'git-client' 'workflow-job' 'build-timeout' 'timestamper' 'pipeline-stage-view' 'workflow-durable-task-step' 'workflow-api' 'workflow-cps' 'pipeline-model-definition' 'pipeline-model-api' 'pipeline-github-lib') #'durable-task' 'pipeline-model-api' 'pipeline-model-extensions')

curl -X POST -d "<jenkins><install plugin=\"git@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${JENKINS_TOKEN}" http://localhost:8080/pluginManager/installNecessaryPlugins
curl -X POST -d "<jenkins><install plugin=\"workflow-job@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${JENKINS_TOKEN}" http://localhost:8080/pluginManager/installNecessaryPlugins
curl -X POST -d "<jenkins><install plugin=\"pipeline-model-definition@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${JENKINS_TOKEN}" http://localhost:8080/pluginManager/installNecessaryPlugins

sleep 30s

#Restart Jenkins
curl -X POST --user "admin:${JENKINS_TOKEN}" 'http://localhost:8080/safeRestart'

sleep 60s

#Need to re-authenticate after restart

#Retrieve password
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)

#Retrieve Crumb and Token
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")
JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue)

#Strip extra quotes from JENKINS_TOKEN
JENKINS_TOKEN=$(echo "${JENKINS_TOKEN//\"/}")

#Create the job
curl -XPOST 'http://localhost:8080/createItem?name=michaeljscully.com' -u "admin:${JENKINS_TOKEN}" --data-binary @config.xml -H "Content-Type:text/xml"

#Build the job
curl -XPOST 'http://localhost:8080/job/michaeljscully.com/build' -u "admin:${JENKINS_TOKEN}" 