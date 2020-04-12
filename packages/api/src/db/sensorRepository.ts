import { db } from 'src/util/database';

export interface QueryRow {
    roomName: string;
    roomType: number;
    value: number;
    sensorType: number;
    time: Date;
}

export const getAllSensorData = async (userId: number): Promise<QueryRow[]> => {
    return await db.manyOrNone(
        `SELECT rooms.name as room_name, rooms.type as room_type,
                    sensor_data.value, sensor_data.type as sensor_type, sensor_data.time
                FROM users
                INNER JOIN rooms ON (users.id = rooms.user_id)
                INNER JOIN sensor_data ON (rooms.id = sensor_data.room_id)
                WHERE users.id = $1
                ORDER BY sensor_data.time;`,
        [userId],
    );
};
