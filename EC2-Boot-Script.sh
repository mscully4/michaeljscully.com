#! /bin/bash

curl -sL https://rpm.nodesource.com/setup_15.x | sudo bash -

sudo amazon-linux-extras -y install python3.8
sudo amazon-linux-extras -y install nginx1


sudo yum-config-manager --enable epel
sudo yum -y update
sudo yum -y install jq java-1.8.0 git nodejs

sudo wget -O /etc/yum.repos.d/jenkins.repo http://pkg.jenkins-ci.org/redhat/jenkins.repo
sudo rpm --import https://pkg.jenkins.io/redhat/jenkins.io.key
sudo yum -y install jenkins

#Grant Jenkins Sudo Access
echo "jenkins ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/jenkins

sudo service jenkins start

wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/install_jenkins_plugins.sh -O ./install_jenkins_plugins.sh
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/config.xml -O ./config.xml

chmod +x install_jenkins_plugins.sh
./install_jenkins_plugins.sh