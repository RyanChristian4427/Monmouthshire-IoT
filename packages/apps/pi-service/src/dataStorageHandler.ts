import low from 'lowdb';
import FileSync from 'lowdb/adapters/FileSync';

import { RoomType } from '@core/types';
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

export const getNodeById = (nodeId: number): Node => {
    return db
        .get('nodes')
        .find({ nodeId })
        .value();
};

export const createNode = (node: Node): void => {
    if (getNodeById(node.nodeId)) return;

    db.get('nodes')
        .push({
            nodeId: node.nodeId,
            name: node.name,
            roomType: node.roomType,
            sensorHardwareType: node.sensorHardwareType,
        })
        .write();
};

export const updateNode = (nodeId: number, name: string, roomType: RoomType): void => {
    db.get('nodes')
        .find({ nodeId })
        .assign({ name, roomType })
        .write();
};
