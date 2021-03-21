#!/bin/bash

function build_jenkins_job() {
        #Create the job in Jenkins if it does not exist yet
        if [ $(curl -o /dev/null -L -s -w "%{http_code}" "$1/job/$2/api/json" -u "admin:$3") == "200" ]; then
                sudo echo "$(date): Job already exists in Jenkins" >> $4
        else
                curl -vs -XPOST "$1/createItem?name=$2" -u "admin:$3" --data-binary @/home/ubuntu/config.xml -H "Content-Type:text/xml"
                sudo echo "$(date): Submitted Job to Jenkins" >> $4
        fi

        sleep 5s

        LAST_BUILD_NUMBER=$(curl -sS "$1/job/$2/lastBuild/api/json" -u "admin:$3" | jq .number);
        

        curl -XPOST "$1/job/$2/build" -u "admin:$3"
        sudo echo "$(date): Building the job, Last Build Number: $LAST_BUILD_NUMBER" >> $4

        ITERS=0
        while : 
        do      
                sleep 5s
                BUILD_NUMBER=$(curl -sS "$1/job/$2/lastBuild/api/json" -u "admin:$3" | jq .number);
                RESULT=$(curl -sS "$1/job/$2/lastBuild/api/json" -u "admin:$3" | jq .result | tr -d '\"');
                if [[ $RESULT == 'SUCCESS' ]] && [[ $LAST_BUILD_NUMBER != $BUILD_NUMBER  ]]; then
                        sudo echo "$(date): Build finished successfully" >> $4
                        return 0;
                elif [ $ITERS -ge 100 ];
                then
                        sudo echo "$(date): Build failed" >> $4
                        return 1;
                else 
                        ITERS=$((ITERS+1));
                        sudo echo "$(date): Build not finished yet.  Build Number: $BUILD_NUMBER, Result: $RESULT" >> $4
                fi
        done
}

