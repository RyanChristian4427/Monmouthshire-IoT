#!/bin/sh
#launcher.sh
#execute python script on start up

sudo apt-get install espeak -y
sudo pip install requests
cd /
cd home/pi/iot_team_3/rasp-pr/src/ReadTextMessages
sudo python readMessage.py &
cd /
