class SensorRepository {
	constructor(dao) {
    this.dao = dao
  }

  createTable() {
    const sql = `
		CREATE TABLE IF NOT EXISTS sensors (
		  id INTEGER PRIMARY KEY AUTOINCREMENT,
		  node_id INTEGER,
		  type TEXT,
		  location TEXT,
		  configured INTEGER DEFAULT 0)`;
    return this.dao.run(sql);
  }

  create(sensor) {
    return this.dao.run(
      'INSERT INTO sensors (node_id, type, location) VALUES (?,?,?)',
      [sensor.node_id, sensor.type, sensor.location]);
  }

  updateSensorLocation(sensorId, location) {
    return this.dao.run(
      `UPDATE sensors SET location = ? WHERE node_id = ?`,
      [location, sensorId]
    );
  }

  getById(id) {
    return this.dao.get(
      `SELECT * FROM projects WHERE id = ?`,
      [id])
  }

  getAll() {
    return this.dao.get(`SELECT * FROM sensors`)
  }

  getThoseNotConfigured() {
    return this.dao.get(`SELECT * FROM sensors WHERE configured = 0`)
  }
}

export default SensorRepository;
