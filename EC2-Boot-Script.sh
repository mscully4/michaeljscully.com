sudo su 
apt-get update
apt-get install nginx

sudo apt update
sudo apt install python3-pip


#clone repo from Github
#move build/* to /var/www/html
#move nginx/nginx.conf to /etc/nginx/sites-available/
#create symlink from /etc/nginx/sites-available/nginx.conf to /etc/nginx/sites-enabled/nginx.conf

#Node Installation
curl -sL https://deb.nodesource.com/setup_12.x | sudo -E bash -
sudo apt install nodejs

#Jenkins Installation
sudo apt install openjdk-8-jdk

wget -q -O - https://pkg.jenkins.io/debian-stable/jenkins.io.key | sudo apt-key add -
sudo sh -c 'echo deb https://pkg.jenkins.io/debian-stable binary/ > \
    /etc/apt/sources.list.d/jenkins.list'
sudo apt-get install jenkins