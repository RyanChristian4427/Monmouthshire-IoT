DATE=`date '+%Y-%m-%d %H:%M:%S'`
echo "Openzwave service started at ${DATE}" | systemd-cat -p info

cd /home/pi/iot_team_3/rasp-pi/openzwave-service && npm run dev
