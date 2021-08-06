#! /bin/bash

JOB_NAME=michaeljscully.com
PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)
JENKINS_URL='http://localhost:8080'

#Retrieve Crumb and Token
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")
JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue | tr -d '\"' )

curl "http://localhost:8080/job/${JOB_NAME}/config.xml" -u admin:$JENKINS_TOKEN
