#Jenkins Dependencies
wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'

#Node Depedencies
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -

sudo apt update
sudo apt-get update

sudo apt-get -y install nginx
sudo apt -y install python3-pip
sudo apt -y install nodejs
sudo apt -y install openjdk-8-jdk
sudo apt-get -y install jenkins
sudo apt -y install gunicorn
sudo apt -y install awscli
sudo apt -y install jq

#Grant Jenkins Sudo Access
echo "jenkins ALL=(ALL) NOPASSWD:ALL" | sudo tee /etc/sudoers.d/jenkins

wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/install_jenkins_plugins.sh -O ./install_jenkins_plugins.sh
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/config.xml -O ./config.xml

chmod +x install_jenkins_plugins.sh
./install_jenkins_plugins.sh