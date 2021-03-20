#! /bin/bash

#Jenkins Dependencies
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo echo "$(date): Gathered Jenkins Dependencies" >> /home/ubuntu/log.txt

#Node Depedencies
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo echo "$(date): Gathered Node Dependencies" >> /home/ubuntu/log.txt

#Update Repositories
sudo apt -y update
sudo apt-get -y update
sudo echo "$(date): Updated Repositories" >> /home/ubuntu/log.txt

#Install Packages
sudo apt-get -y install nginx jenkins
sudo apt -y install python3-pip nodejs openjdk-8-jdk gunicorn awscli jq
sudo echo "$(date): Installed Packages" >> /home/ubuntu/log.txt

#Grant Jenkins Sudo Access
echo "jenkins ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/jenkins
sudo echo "$(date): Granted Jenkins Sudo Access" >> /home/ubuntu/log.txt

#Load scripts from Github
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/bash/install_jenkins_plugins.sh -O /home/ubuntu/install_jenkins_plugins.sh
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/config.xml -O /home/ubuntu/config.xml
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/bash/build_jenkins_job.sh -O /home/ubuntu/build_jenkins_job.sh
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/bash/attach_elastic_ip.sh -O /home/ubuntu/attach_elastic_ip.sh
sudo echo "$(date): Loaded files from GitHub" >> /home/ubuntu/log.txt

#Start Jenkins
sudo service jenkins start
sudo echo "$(date): Started Jenkins" >> /home/ubuntu/log.txt

#Give Jenkins time to set up
sleep 20s

#Run Script to install Jenkins plugins
chmod +x /home/ubuntu/install_jenkins_plugins.sh
/home/ubuntu/install_jenkins_plugins.sh
sudo echo "$(date): Executed install_jenkins_plugins.sh" >> /home/ubuntu/log.txt

#Run script to 
chmod +x /home/ubuntu/build_jenkins_job.sh
/home/ubuntu/build_jenkins_job.sh
sudo echo "$(date): Executed build_jenkins_job.sh" >> /home/ubuntu/log.txt

chmod +x /home/ubuntu/attach_elastic_ip.sh
/home/ubuntu/attach_elastic_ip.sh
sudo echo "$(date): Executed attach_elastic_ip.sh" >> /home/ubuntu/log.txt

sudo cat /var/lib/jenkins/secrets/initialAdminPassword > /home/ubuntu/jenkins.txt
aws s3 cp /home/ubuntu/jenkins.txt s3://michaeljscullydotcom/jenkins.txt