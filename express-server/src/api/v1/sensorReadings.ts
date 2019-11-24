import express from 'express';
import { fetch, insert } from 'src/database/databaseConnectors';
import { createSensorReading } from 'src/database/mappers/sensorReadingMapper';

const router = express.Router();

router.get('/all', (req, res, next) => {
    const query = 'MATCH (sensorReading:SensorReading) RETURN sensorReading';
    const objectKey = 'sensorReading';
    fetch(query, objectKey, {})
        .then(
            (result: object) => {
                console.log(result);
                res.send({data: result});
            })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

router.get('/temperature/:userId', (req, res, next) => {
    const args = {userId: parseInt(req.params.userId), type: 'temperature'};
    const query = `MATCH 
                      (sensorReading:SensorReading)
                          WHERE sensorReading.userId = {userId}  AND sensorReading.type = {type} 
                               RETURN sensorReading`;
    const objectKey = 'sensorReading';
    fetch(query, objectKey, args)
        .then(
            (result: object) => {
                console.log(result);
                res.send({data: result});
            })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

router.get('/motion/:userId', (req, res, next) => {
    const args = {userId: parseInt(req.params.userId), type: 'motion'};
    const query = `MATCH 
                      (sensorReading:SensorReading) 
                          WHERE sensorReading.userId = {userId}  AND sensorReading.type = {type} 
                              RETURN sensorReading`;
    const objectKey = 'sensorReading';
    fetch(query, objectKey, args)
        .then(
            (result: object) => {
                console.log(result);
                res.send({data: result});
            })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

router.get('/light/:userId', (req, res, next) => {
    const args = {userId: parseInt(req.params.userId), type: 'light'};
    const query = `MATCH 
                     (sensorReading:SensorReading) 
                         WHERE sensorReading.userId = {userId}  AND sensorReading.type = {type}
                             RETURN sensorReading`;
    const objectKey = 'sensorReading';
    fetch(query, objectKey, args)
        .then(
            (result: object) => {
                console.log(result);
                res.send({data: result});
            })
        .catch((err) => {
            console.log(err);
            next(err);
        });
});

router.post('/new', (req, res, next) => {
    console.log('new reading');
    const objectKey = 'sensorReading';
    const query = `CREATE
                     (sensorReading:SensorReading 
                        { userId: {userId}, type: {type}, value: {value}, unit: {unit}, timestamp: datetime() }) 
                            RETURN sensorReading`;

    insert(query, objectKey, createSensorReading(req.body.sensorReasding))
        .then((result) => res.send({data: result}))
        .catch((err) => next(err));
});

export default router;
