#!/bin/bash

PASSWORD=$(sudo cat /var/lib/jenkins/secrets/initialAdminPassword)
JENKINS_CRUMB=$(curl -sS --cookie-jar ./cookie "http://admin:${PASSWORD}@localhost:8080/crumbIssuer/api/xml?xpath=concat(//crumbRequestField,\":\",//crumb)")

JENKINS_TOKEN=$(curl -sS --cookie ./cookie -H $JENKINS_CRUMB 'http://localhost:8080/me/descriptorByName/jenkins.security.ApiTokenProperty/generateNewToken' -X POST --data 'newTokenName=jenkins' --user admin:$PASSWORD | jq .data.tokenValue | tr -d '\"' )
JENKINS_URL='http://localhost:8080'
LOGGING_URL=/home/ubuntu/log.txt

function install_jenkins_plugins() {
        #Install plugin
        curl -X POST -d "<jenkins><install plugin=\"git@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${2}" ${1}/pluginManager/installNecessaryPlugins
        curl -X POST -d "<jenkins><install plugin=\"workflow-job@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${2}" ${1}/pluginManager/installNecessaryPlugins
        curl -X POST -d "<jenkins><install plugin=\"pipeline-model-definition@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${2}" ${1}/pluginManager/installNecessaryPlugins
        sudo echo "$(date): Installed Jenkins Plugins" >> $3

        #Restart Jenkins
        curl -X POST --user "admin:${2}" "${1}/safeRestart"
        sudo echo "$(date): Restarted Jenkins" >> $3

        resp=0
        iters=0
        while :
        do
                sleep 5s
        
                resp=$(curl -s -o /dev/null -w "%{http_code}" $1/login)
                echo $resp
                echo $iters
                if [ $resp = "200" ];
                then
                        sudo echo "$(date): Restarted Jenkins" >> $3
                        return 0
                elif [ $iters -ge 20 ];
                then
                        sudo echo "$(date): Error, maximum number of iterations reached" >> $3
                        return 1
                else
                        iters=$((iters+1))
                fi
        done
}

install_jenkins_plugins $JENKINS_URL $JENKINS_TOKEN $LOGGING_URL
