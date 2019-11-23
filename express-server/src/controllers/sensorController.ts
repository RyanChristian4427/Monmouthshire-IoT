import express from 'express';
import {fetchQuery, insertQuery} from "../database/databaseSetup";

const router = express.Router();

router.get('/all', (req, res, next) => {
    const query = 'MATCH (sensorReading:SensorReading) RETURN sensorReading';
    const objectKey = 'sensorReading';
    fetchQuery(query, objectKey, {})
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
    const query = `MATCH (sensorReading:SensorReading) WHERE sensorReading.userId = {userId}  AND sensorReading.type = {type} RETURN sensorReading`;
    const objectKey = 'sensorReading';
    fetchQuery(query, objectKey, args)
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
    const query = `MATCH (sensorReading:SensorReading) WHERE sensorReading.userId = {userId}  AND sensorReading.type = {type} RETURN sensorReading`;
    const objectKey = 'sensorReading';
    fetchQuery(query, objectKey, args)
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
    const query = `MATCH (sensorReading:SensorReading) WHERE sensorReading.userId = {userId}  AND sensorReading.type = {type} RETURN sensorReading`;
    const objectKey = 'sensorReading';
    fetchQuery(query, objectKey, args)
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
    const query = 'CREATE (sensorReading:SensorReading {userId: {userId}, type: {type}, value: {value}, unit: {unit}, timestamp: datetime() }) RETURN sensorReading';
    const objectKey = 'sensorReading';
    insertQuery(query, objectKey, req.body.sensorReading)
        .then((result) => res.send({data: result}))
        .catch((err) => next(err));
});

export default router;
