/* Create a user and a room */
CREATE (user:User {id: "00:00:00:00:00:00"});
MATCH (user:User) WHERE user.id="00:00:00:00:00:00" CREATE (room:Room {type: 0, name: 'Bathroom 1'})-[r:belongsTo]->(user);

/* Query for room by using relationship but specify that relationship direction doesn't matter */
MATCH (user:User)--(room:Room) WHERE room.type=0 return room;

/* Create a sensor that belongs to a room */
MATCH (user:User)--(room:Room) WHERE user.id = "00:00:00:00:00:00" AND room.type=0 CREATE (sensor:Sensor {nodeId: 1, type: 0, hardware:0})-[r:belongsTo]->(room);

/* Create a reading that belongs to a sensor */
MATCH (user:User)--(room:Room)--(sensor:Sensor) WHERE user.id = "00:00:00:00:00:00" AND room.type=0 AND sensor.nodeId=1 
      CREATE (reading:Reading {value: 22, timestamp: datetime()})-[r:belongsTo]->(sensor);
