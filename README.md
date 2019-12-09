# IoT-Team-3

## Raspberry Pi Setup

### Installing the Software

We are assuming you have the Raspbian Stretch image installed on your Raspberry Pi. Please install git with the command:

```
sudo apt-get install git.
```

In a terminal, run the command:
```
cd ~ && mkdir iot_team_3
```

There is a read protected deployment key in the root of the project folder, read_keypair.key. 
In a directory of your choice, please create a file of this name and copy the contents of read_keypair.key into it.

Run 
```
sudo chmod 400 read_keypair.key
```

On the Raspberry Pi, navigate to ~/iot_team_3 in the terminal. You may then use the deploy key to pull the software onto the Raspberry Pi like so:

```
ssh-agent bash -c 'ssh-add <path_to_your_deploy_key>.key; git init; git clone
https://gitlab.cs.cf.ac.uk/c1717381/iot-team-3.git;''
```

When prompted, enter your credentials for gitlab.

### Instructions to Set Up the Sensor Poll and Data Collection

#### Database
Please install Neo4j on your machine if it is not already installed. To avoid directly installing Neo4j, we recommend using the Neo4j Docker container for this. There is a docker-compose.yaml file located in express-server that you can use. Or you might like to see the official documentation to install the container according to your system’s requirements. This is located at https://hub.docker.com/_/neo4j. When the docker container is started, Neo4j will automatically be started. Ensure that neo4j.conf has the following lines:

dbms.connectors.default_listen_address=0.0.0.0
dbms.connector.bolt.listen_address=0.0.0.0:7687

If these needed to be added, please restart the docker container.
A user is identifiable by the MAC address of the Raspberry Pi that they own. To stop unauthorized users from using the software, a user must be created in the database manually before deployment. The MAC address of the Raspberry Pi is hard coded in the .env file located in rasp-pi/openzwave-service/.env as USER_ID. The default example is set to b8:27:eb:25:bf:f5. As such, open a Neo4j cypher-terminal and run the following command:
CREATE (user:User {id: “b8:27:eb:25:bf:f5”});
Server
Please ensure you have node and npm installed.

In a terminal, navigate to /express-server in the projects directory and run the following commands.

npm i
npm run serve:dev

You should now have the server running locally on port 8000.

#### Sensor Pairing

Plug in the Z-Wave stick into the Raspberry Pi along with a HDMI connection to a display and a mouse and keyboard before giving the Raspberry Pi a power supply. Make sure the Z-Wave USB controller is in pairing mode by pressing it’s center button once. When you plug the MultiSensors into a power source, a light will appear and it will change colour. This means it is not in pairing mode. On the back of the Multi Sensor, there is a discrete concave button in the corner that you can press to put the sensor into pairing mode. A green light will show for about two seconds. This means that they have successfully connected to the Z-Wave network. If there is a flash of orange after the green light however, connection has not been successful. In the outcome of an orange light, repeat the process.

Configuring the Z-Wave Service and Raspberry Pi React Application Script
Login to the Raspberry Pi with the username pi and the password raspberry. Go to a terminal and run the following commands in bash. 

```
cd ~/iot_team_3/rasp-pi/openzwave-service
npm i
```

Ensure that both the machine the express server is running on and the Raspberry Pi are connected to the same network. A new network can be added to the pi by adding it to /etc/wpa_supplicant/wpa_supplicant.conf like so:

network={
    ssid=”{nameOfNetwork}”
    psk=”{networkPassword}”
}

After this, run 

```
sudo wpa_cli -i wlan0 reconfigure.
```

Get the Ipv4 address of the machine you will be running the express server on. Alter the API_URL environment variable in rasp-pi/openzwave-service/.env accordingly to http://<your_ip>:8000/api/v1.

To make a systemd service that will run the z-wave service and z-wave application automatically on boot, there are two shell scripts located in rasp-pi/systemd: z-wave.sh and and z-wave-app.sh. Add these two files to /usr/bin and run the following command on each script to make them executable:

```
sudo chmod +x <script_name>.sh
```

Also located in rasp-pi/systemd are two service files: z-wave.service and z-wave-app.service.

Place these scripts in /etc/systemd/system and run the following command on each script

```
sudo chmod 644 /etc/systemd/system/<service-name>.service
```

To enable both services to start on boot, run the following commands:

```
sudo systemctl enable z-wave
sudo systemctl enable z-wave-app
```

#### SQLite Databse on the Pi

Install Sqlite3 with the command:

```
sudo apt-get install sqlite3
```
Create a sqlite3 database file iot_team_3.sqlite in the folder path ~/databases/iot_team_3.

Reboot the Raspberry Pi.

The z-wave service will now be polling for sensor changes every two minutes on boot. You will be able to access the React client at http://localhost:3000. 

Configuring the Sensor Names and Rooms

Navigate to http://localhost:3000. You will see a list of available sensors. You can set their name and room type in the configuration area to the right of the list once you click on a sensor. You can save these changes by clicking the submit button.

After this has been done for each sensor. They will be added to the database. You can check this in the Neo4j cypher terminal with the command:

MATCH(user:User)--(room:Room)--(sensor:Sensor) return room, sensor;

After the script has been polling for a few minutes, you should be able to see sensor readings in the database. Check this with the command

MATCH(user:User)--(room:Room)--(sensor:Sensor)--(reading:Reading) return sensor, reading;

Nodes are connected with a ‘belongsTo’ relationship. A reading belongs to a sensor, a sensor belongs to a room and a room belongs to a user.



