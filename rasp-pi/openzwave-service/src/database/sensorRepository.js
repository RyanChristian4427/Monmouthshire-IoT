import logger from '../util/logger.js';

class SensorRepository {
	constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
		CREATE TABLE IF NOT EXISTS sensors (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  node_id INTEGER,
		  hardware TEXT,
		  type TEXT,
		  name TEXT,
		  configured INTEGER DEFAULT 0)`;
    return this.dao.run(sql);
  }

  create(sensor) {
	  this.sensorAlreadyAddedToNetwork(sensor.nodeId)
	  .then((result) => {
		  if(result){
			  return;
		  }
		   //logger.debug('We are adding node to network as it does not already exist in the database');
		   logger.error('Thinks node not added to db');
		   logger.error(result);
		  return this.dao.run(
		  'INSERT INTO sensors (node_id, hardware, name) VALUES (?,?,?)',
		  [sensor.nodeId, sensor.hardware, sensor.name]);
	   })
	   .catch((err) => {
		   logger.error(err);
		});
  }

  sensorAlreadyAddedToNetwork(nodeId){
	  return this.dao.get(`SELECT * FROM sensors WHERE node_id = ?`, [nodeId]);
  }

    updateSensor(sensorId, type, name) {
    return this.dao.run(
      `UPDATE sensors SET type = ?, name = ? WHERE node_id = ?`,
      [type, name, sensorId]
    );
  }

  getAll() {
    return this.dao.get(`SELECT * FROM sensors`)
  }

  getThoseNotConfigured() {
    return this.dao.get(`SELECT * FROM sensors WHERE configured = 0`)
  }

  getById(nodeId){
      return this.dao.get(`SELECT * FROM sensors WHERE node_id = ?`, [nodeId])
  }
}

export default SensorRepository;
