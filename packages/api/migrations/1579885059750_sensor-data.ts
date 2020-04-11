/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder } from 'node-pg-migrate';

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable('rooms', {
        id: 'id',
        user_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'users(id)',
        },
        name: {
            type: 'TEXT',
            notNull: true,
        },
        type: {
            type: 'SMALLINT',
            notNull: true,
            check: 'type BETWEEN 0 AND 4',
        },
    });
    pgm.createTable('sensor_data', {
        id: 'id',
        room_id: {
            type: 'INTEGER',
            notNull: true,
            references: 'rooms(id)',
        },
        value: {
            type: 'INTEGER',
            notNull: true,
        },
        type: {
            type: 'SMALLINT',
            notNull: true,
            check: 'type BETWEEN 0 AND 5',
        },
        time: {
            type: 'TIMESTAMPTZ',
            notNull: true,
        },
    });

    pgm.sql(`INSERT INTO rooms(user_id, name, type)
        VALUES (1, 'Kitchen', 0),
               (1, 'Master Bedroom', 1),
               (1, 'Master Bathroom', 2),
               (1, 'Living Room', 3),
               (1, 'Front Door', 4),
               (1, 'Back Door', 4);
    `);
    // 6 rooms of temperature data
    pgm.sql(`INSERT INTO sensor_data(room_id, value, type, time)
        VALUES (1, 72, 0, now()),
               (1, 67, 0, now()+ (2 ||' minutes')::interval),
               (1, 74, 0, now()+ (4 ||' minutes')::interval),
               (1, 69, 0, now()+ (6 ||' minutes')::interval),
               (1, 71, 0, now()+ (8 ||' minutes')::interval),
               (1, 70, 0, now()+ (10 ||' minutes')::interval),
               (1, 71, 0, now()+ (12 ||' minutes')::interval),
               (2, 30, 0, now()),
               (2, 35, 0, now()+ (2 ||' minutes')::interval),
               (2, 43, 0, now()+ (4 ||' minutes')::interval),
               (2, 29, 0, now()+ (6 ||' minutes')::interval),
               (2, 32, 0, now()+ (8 ||' minutes')::interval),
               (2, 28, 0, now()+ (10 ||' minutes')::interval),
               (2, 45, 0, now()+ (12 ||' minutes')::interval),
               (3, 0, 0, now()),
               (3, 12, 0, now()+ (2 ||' minutes')::interval),
               (3, 23, 0, now()+ (4 ||' minutes')::interval),
               (3, -15, 0, now()+ (6 ||' minutes')::interval),
               (3, 6, 0, now()+ (8 ||' minutes')::interval),
               (3, 4, 0, now()+ (10 ||' minutes')::interval),
               (3, 7, 0, now()+ (12 ||' minutes')::interval),
               (4, 29, 0, now()),
               (4, 43, 0, now()+ (2 ||' minutes')::interval),
               (4, 23, 0, now()+ (4 ||' minutes')::interval),
               (4, 73, 0, now()+ (6 ||' minutes')::interval),
               (4, 23, 0, now()+ (8 ||' minutes')::interval),
               (4, 23, 0, now()+ (10 ||' minutes')::interval),
               (4, 67, 0, now()+ (12 ||' minutes')::interval),
               (5, 12, 0, now()),
               (5, 12, 0, now()+ (2 ||' minutes')::interval),
               (5, 32, 0, now()+ (4 ||' minutes')::interval),
               (5, 65, 0, now()+ (6 ||' minutes')::interval),
               (5, 54, 0, now()+ (8 ||' minutes')::interval),
               (5, 4, 0, now()+ (10 ||' minutes')::interval),
               (5, -12, 0, now()+ (12 ||' minutes')::interval),
               (6, 64, 0, now()),
               (6, 45, 0, now()+ (2 ||' minutes')::interval),
               (6, 45, 0, now()+ (4 ||' minutes')::interval),
               (6, 7, 0, now()+ (6 ||' minutes')::interval),
               (6, 23, 0, now()+ (8 ||' minutes')::interval),
               (6, 32, 0, now()+ (10 ||' minutes')::interval),
               (6, 19, 0, now()+ (12 ||' minutes')::interval);
    `);
    // 6 rooms of humidity data
    pgm.sql(`INSERT INTO sensor_data(room_id, value, type, time)
        VALUES (1, 63, 4, now()),
               (1, 67, 4, now()+ (2 ||' minutes')::interval),
               (1, 71, 4, now()+ (4 ||' minutes')::interval),
               (1, 69, 4, now()+ (6 ||' minutes')::interval),
               (1, 68, 4, now()+ (8 ||' minutes')::interval),
               (1, 72, 4, now()+ (10 ||' minutes')::interval),
               (1, 65, 4, now()+ (12 ||' minutes')::interval),
               (2, 64, 4, now()),
               (2, 66, 4, now()+ (2 ||' minutes')::interval),
               (2, 73, 4, now()+ (4 ||' minutes')::interval),
               (2, 67, 4, now()+ (6 ||' minutes')::interval),
               (2, 69, 4, now()+ (8 ||' minutes')::interval),
               (2, 70, 4, now()+ (10 ||' minutes')::interval),
               (2, 66, 4, now()+ (12 ||' minutes')::interval),
               (3, 66, 4, now()),
               (3, 63, 4, now()+ (2 ||' minutes')::interval),
               (3, 73, 4, now()+ (4 ||' minutes')::interval),
               (3, 64, 4, now()+ (6 ||' minutes')::interval),
               (3, 64, 4, now()+ (8 ||' minutes')::interval),
               (3, 77, 4, now()+ (10 ||' minutes')::interval),
               (3, 62, 4, now()+ (12 ||' minutes')::interval),
               (4, 62, 4, now()),
               (4, 64, 4, now()+ (2 ||' minutes')::interval),
               (4, 75, 4, now()+ (4 ||' minutes')::interval),
               (4, 63, 4, now()+ (6 ||' minutes')::interval),
               (4, 66, 4, now()+ (8 ||' minutes')::interval),
               (4, 77, 4, now()+ (10 ||' minutes')::interval),
               (4, 61, 4, now()+ (12 ||' minutes')::interval),
               (5, 62, 4, now()),
               (5, 66, 4, now()+ (2 ||' minutes')::interval),
               (5, 72, 4, now()+ (4 ||' minutes')::interval),
               (5, 67, 4, now()+ (6 ||' minutes')::interval),
               (5, 66, 4, now()+ (8 ||' minutes')::interval),
               (5, 74, 4, now()+ (10 ||' minutes')::interval),
               (5, 62, 4, now()+ (12 ||' minutes')::interval),
               (6, 63, 4, now()),
               (6, 69, 4, now()+ (2 ||' minutes')::interval),
               (6, 78, 4, now()+ (4 ||' minutes')::interval),
               (6, 62, 4, now()+ (6 ||' minutes')::interval),
               (6, 63, 4, now()+ (8 ||' minutes')::interval),
               (6, 74, 4, now()+ (10 ||' minutes')::interval),
               (6, 66, 4, now()+ (12 ||' minutes')::interval);
    `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('sensor_data');
    pgm.dropTable('rooms');
}
