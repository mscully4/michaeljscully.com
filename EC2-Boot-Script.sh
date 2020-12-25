#! /bin/bash

#Create logging file
touch /home/ubuntu/log.txt
chown ubuntu:ubuntu /home/ubuntu/log.txt

#Jenkins Dependencies
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'

#Node Depedencies
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -


sudo apt -y update
sudo apt-get -y update

sudo apt-get -y install nginx jenkins
sudo apt -y install python3-pip nodejs openjdk-8-jdk gunicorn awscli jq
#Grant Jenkins Sudo Access
echo "jenkins ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/jenkins

wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/install_jenkins_plugins.sh -O /home/ubuntu/install_jenkins_plugins.sh
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/config.xml -O /home/ubuntu/config.xml

sudo service jenkins start

sleep 20s

chmod +x /home/ubuntu/install_jenkins_plugins.sh
/home/ubuntu/install_jenkins_plugins.sh 