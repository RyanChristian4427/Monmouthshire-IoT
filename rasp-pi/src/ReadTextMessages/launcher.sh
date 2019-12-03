#!/bin/sh
#launcher.sh
#execute python script on start up

sudo apt-get install espeak -y
sudo pip install requests
cd /
cd home/pi/Documents
sudo python readMessage.py &
cd /
