#! /bin/bash

function install_jenkins_plugins() {
        #Install plugin
        curl -X POST -d "<jenkins><install plugin=\"git@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${2}" ${1}/pluginManager/installNecessaryPlugins
        curl -X POST -d "<jenkins><install plugin=\"workflow-job@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${2}" ${1}/pluginManager/installNecessaryPlugins
        curl -X POST -d "<jenkins><install plugin=\"pipeline-model-definition@latest\" /></jenkins>" --header 'Content-Type: text/xml' --user "admin:${2}" ${1}/pluginManager/installNecessaryPlugins
        sudo echo "$(date): Installed Jenkins Plugins" >> $3

        sleep 5s

        #Restart Jenkins
        curl -X POST --user "admin:${2}" "${1}/safeRestart"
        sudo echo "$(date): Restarted Jenkins" >> $3

        resp=0
        iters=0
        while :
        do
                sleep 5s

                resp=$(curl -s -o /dev/null -w "%{http_code}" $1/login)
                if [ $resp = "200" ];
                then
                        sudo echo "$(date): Jenkins has been restarted successfully" >> $3
                        return 0
                elif [ $iters -ge 20 ];
                then
                        sudo echo "$(date): Error, maximum number of iterations reached" >> $3
                        return 1
                else
                        iters=$((iters+1))
                        sudo echo "$(date): Still waiting" >> $3
                fi
        done
}
