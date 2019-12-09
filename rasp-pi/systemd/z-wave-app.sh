DATE=`date '+%Y-%m-%d %H:%M:%S'`
echo "Z-Wave app started at ${DATE}" | systemd-cat -p info

cd /home/pi/iot_team_3/rasp-pi/react-home-client && npm run serve
