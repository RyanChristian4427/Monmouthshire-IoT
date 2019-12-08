import logger from '../util/logger.js';

class SensorRepository {
	constructor(dao) {
		this.dao = dao
  }

  createTable() {
    const sql = `
		CREATE TABLE IF NOT EXISTS sensors (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  nodeId INTEGER,
		  type TEXT DEFAULT 'None',
		  name TEXT,
		  configured INTEGER DEFAULT 0)`;
    return this.dao.run(sql);
  }

  create(sensor) {
	  logger.debug(`Adding ${sensor.name} to the database`);
	  
	  this.sensorAlreadyAddedToNetwork(sensor.nodeId)
          .then((result) => {
              if(result){
                  return;
              }
              logger.debug('We are adding node to network as it does not already exist in the database');
              
              return this.dao.run(
                  'INSERT INTO sensors (nodeId, hardware, name) VALUES (?,?,?)',
                  [sensor.nodeId, sensor.hardware, sensor.name]);
          })
          .catch((err) => {
              logger.error(err);
          });
  }

  sensorAlreadyAddedToNetwork(nodeId){
	  return this.dao.get(`SELECT * FROM sensors WHERE nodeId = ?`, [nodeId]);
  }

    updateSensor(nodeId, roomType, name) {
	    return this.dao.run(
	        `UPDATE sensors SET roomType = ?, name = ? WHERE nodeId = ?`,
            [roomType, name, nodeId]
        );
  }
  
  getAll() {
	  return this.dao.all(`SELECT * FROM sensors`)
	}
	
	getAllNotConfigured() {
	  return this.dao.all(`SELECT * FROM sensors where isConfigured = 0`)
	}

	getById(nodeId){
	    return this.dao.get(`SELECT * FROM sensors WHERE nodeId = ?`, [nodeId]);
	}
	
	getSensorType(nodeId){
		return this.dao.get(`SELECT hardware FROM sensors WHERE nodeId = ?`, [nodeId]);
	}
}

export default SensorRepository;
