#!/bin/bash 

touch log.txt
chown ubuntu:ubuntu /home/ubuntu/log.txt

echo "$(date): Begin" >> log.txt
wget https://raw.githubusercontent.com/mscully4/michaeljscully.com/master/EC2-Boot-Script.sh -O /home/ubuntu/EC2-Boot-Script.sh 
chmod +x /home/ubuntu/EC2-Boot-Script.sh 

echo "$(date): Running Boot Script" >> log.txt
/home/ubuntu/EC2-Boot-Script.sh