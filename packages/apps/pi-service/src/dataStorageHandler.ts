import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { RoomType, SensorHardwareType } from '@core/types';
import { Node } from 'src/models/Node';

type Schema = {
    nodes: Node[];
};

const adapter = new FileSync<Schema>('db.json');
const db = low(adapter);

export const setupDB = (): void => {
    db.defaults({ nodes: [] }).write();
};

export const getAllNodes = (): Node[] => {
    return db.get('nodes').value();
};

export const getNodeById = (id: number): Node => {
    return db
        .get('nodes')
        .find({ nodeId: id })
        .value();
};

export const getSensorType = (id: number): SensorHardwareType => {
    return db
        .get('nodes')
        .find({ nodeId: id })
        .value().sensorHardwareType;
};

export const createNode = (node: Node): void => {
    if (getNodeById(node.nodeId)) return;
    else {
        db.get('nodes')
            .push({
                nodeId: node.nodeId,
                name: node.name,
                roomType: node.roomType,
                sensorHardwareType: node.sensorHardwareType,
            })
            .write();
    }
};

export const updateNode = (id: number, name: string, roomType: RoomType): void => {
    db.get('nodes')
        .find({ nodeId: id })
        .assign({ name: name, roomType: roomType })
        .write();
};
