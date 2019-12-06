# How to start Pyhton Script from boot
1. Place the readMessage.py and launcher.sh into the folder /home/pi/Documents
2. Make a log folder in the directory
3. On the Raspberry Pi type 'sudo crontab -e'
4. At the bottom of the file add '@reboot sh /home/pi/Documents/launcher.sh >/home/pi/Documents/logs/cronlogs 2>&1

On reboot the crontab daemon will trigger and run the launcher.sh script which will download and run the python script 