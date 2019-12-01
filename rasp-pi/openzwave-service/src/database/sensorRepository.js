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
		  hardware TEXT,
		  type TEXT,
		  name TEXT,
		  configured INTEGER DEFAULT 0)`;
    return this.dao.run(sql);
  }
  
  isControllerNode(hardwareType){
	  return hardwareType === 'Static PC Controller';
  }
  
  create(sensor) {
	  const name = `Sensor ${sensor.nodeId} (${sensor.name})`;
	  logger.debug(`Adding ${name} to the database`);

	  if(this.isControllerNode(sensor.name)){
		  return;
	  }
	  
	  this.sensorAlreadyAddedToNetwork(sensor.nodeId)
	  .then((result) => {
		  if(result){
			  return;
		  }
		   logger.debug('We are adding node to network as it does not already exist in the database');
		  return this.dao.run(
		  'INSERT INTO sensors (nodeId, hardware, name) VALUES (?,?,?)',
		  [sensor.nodeId, sensor.hardware, name]);
	   })
	   .catch((err) => {
		   logger.error(err);
		});
  }

  sensorAlreadyAddedToNetwork(nodeId){
	  return this.dao.get(`SELECT * FROM sensors WHERE nodeId = ?`, [nodeId]);
  }

    updateSensor(sensorId, type, name) {
    return this.dao.run(
      `UPDATE sensors SET type = ?, name = ? WHERE nodeId = ?`,
      [type, name, sensorId]
    );
  }

  getAll() {
    return this.dao.all(`SELECT * FROM sensors`)
  }

  getThoseNotConfigured() {
    return this.dao.get(`SELECT * FROM sensors WHERE configured = 0`)
  }

  getById(nodeId){
      return this.dao.get(`SELECT * FROM sensors WHERE nodeId = ?`, [nodeId])
  }
}

export default SensorRepository;
