import logger from '../util/logger.js';

class RoomRepository {
	constructor(dao) {
		this.dao = dao
  }

  createTable() {
    const sql = `
		CREATE TABLE IF NOT EXISTS rooms (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  name TEXT,
		  type TEXT)`;
    return this.dao.run(sql);
  }

  create(room) {
	  return this.dao.run(
			'INSERT INTO rooms (name, type) VALUES (?,?)',
                  [sensor.nodeId, sensor.hardware, name]);
  }
}

export default RoomRepository;

