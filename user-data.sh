#!/bin/bash 

touch /home/ubuntu/log.txt
sudo chown ubuntu:ubuntu /home/ubuntu/log.txt

sudo echo "$(date): Begin" >> /home/ubuntu/log.txt
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/EC2-Boot-Script.sh -O /home/ubuntu/EC2-Boot-Script.sh 
chmod +x /home/ubuntu/EC2-Boot-Script.sh 

sudo echo "$(date): Running Boot Script" >> /home/ubuntu/log.txt
/home/ubuntu/EC2-Boot-Script.sh