// Adapted from https://stackabuse.com/a-sqlite-tutorial-with-node-js/
import sqlite3 from 'sqlite3';
import {Promise} from 'bluebird';
import logger from '../util/logger';

class AppDAO {
  constructor(dbFilePath) {
    this.db = new sqlite3.Database(dbFilePath, (err) => {
      if (err) {
        logger.error(`Could not connect to database ${err}`);
      } else {
        logger.info('Connected to database');
      }
    })
  }
  
  run(sql, params = []) {
    return new Promise((resolve, reject) => {
		  this.db.run(sql, params, (err) => {
				if (err) {
				  logger.error(`Error running sql ${sql}`);
				  logger.error(err);
				  reject(err);
				} else {
				  resolve({ id: this.lastID });
				}
		  })
    })
  }
  
  get(sql, params = []) {
	  return new Promise((resolve, reject) => {
		  this.db.get(sql, params, (err, row) => {
			  if (err) {
				  logger.error(`db get error for ${sql}`);
				  logger.error(err);
				  reject(err);
			  }
			  logger.info(row);
			  resolve(row);
		  });
		})
  }
  
  all(sql, params = []) {
	  return new Promise((resolve, reject) => {
		  this.db.all(sql, params, (err, rows) => {
			  if (err) {
				  logger.error(`db get error for ${sql}`);
				  logger.error(err);
				  reject(err);
			  }
			  logger.debug('We have ROWS');
			  logger.info(rows);
			  resolve(rows);
		  });
    })
  }
}

export default AppDAO;
