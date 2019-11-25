# IoT-Team-3

## Web Application

### Database
There is a dated data dump of a Neo4j database in express-server/src/database/dumps.
You can use the load command to re-create the database with the dump file e.g. 
neo4j-admin load --from=<path-to-dump-file> --database=graph.db --force.

## Raspberry Pi Setup

### Sensor Pairing

Plug in the Z-Wave stick into the RPi along with a HDMI connection to a display and a mouse/keyboard before giving the RPi a power supply.

The sensors should already be paired. When you plug them into a power source a green light will show for about two seconds. 
This means that they have successfully connected to the Z-Wave network. If there is a flash of orange after the green however,
connection has not been successful. On the back of the Multi-6 sensor, there is a discreet concave button in the corner that you
can press to put the sensor into pairing mode should immediate connection fail (you shouldn't have to do this).

### Running the script
To login to the RPi the username is pi and the password is raspberry. Go to a terminal and run the following:

```bash
cd iot_team_3
npm run build
node lib/sensorPolling.js
```

To start the script you won't have to do this soon, a service will be created to start this on boot.

The script is now polling for sensor changes every two minutes. This is configured in sensorPolling.js. 
The unit is in seconds and the script will divide the number of seconds to poll by the number of seconds
i.e. if 4 minutes is configured, 2 sensors will be polled every 2 minutes.
