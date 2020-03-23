/* eslint-disable @typescript-eslint/camelcase */
import { MigrationBuilder, ColumnDefinitions } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

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
               (1, 'Back Door', 4)
        `);

    // 6 rooms of temperature data
    pgm.sql(`INSERT INTO sensor_data(room_id, value, type, time)
        VALUES (1, 72, 0, timestamptz('2020-01-26T10:30:23Z')),
               (1, 67, 0, timestamptz('2020-01-26T10:32:24Z')),
               (1, 74, 0, timestamptz('2020-01-26T10:34:25Z')),
               (1, 69, 0, timestamptz('2020-01-26T10:36:26Z')),
               (1, 71, 0, timestamptz('2020-01-26T10:38:27Z')),
               (1, 70, 0, timestamptz('2020-01-26T10:40:28Z')),
               (1, 71, 0, timestamptz('2020-01-26T10:42:29Z')),
               (2, 30, 0, timestamptz('2020-01-26T10:30:23Z')),
               (2, 35, 0, timestamptz('2020-01-26T10:32:24Z')),
               (2, 43, 0, timestamptz('2020-01-26T10:34:25Z')),
               (2, 29, 0, timestamptz('2020-01-26T10:36:26Z')),
               (2, 32, 0, timestamptz('2020-01-26T10:38:27Z')),
               (2, 28, 0, timestamptz('2020-01-26T10:40:28Z')),
               (2, 45, 0, timestamptz('2020-01-26T10:42:29Z')),
               (3, 0, 0, timestamptz('2020-01-26T10:30:23Z')),
               (3, 12, 0, timestamptz('2020-01-26T10:32:24Z')),
               (3, 23, 0, timestamptz('2020-01-26T10:34:25Z')),
               (3, -15, 0, timestamptz('2020-01-26T10:36:26Z')),
               (3, 6, 0, timestamptz('2020-01-26T10:38:27Z')),
               (3, 4, 0, timestamptz('2020-01-26T10:40:28Z')),
               (3, 7, 0, timestamptz('2020-01-26T10:42:29Z')),
               (4, 29, 0, timestamptz('2020-01-26T10:30:23Z')),
               (4, 43, 0, timestamptz('2020-01-26T10:32:24Z')),
               (4, 23, 0, timestamptz('2020-01-26T10:34:25Z')),
               (4, 73, 0, timestamptz('2020-01-26T10:36:26Z')),
               (4, 23, 0, timestamptz('2020-01-26T10:38:27Z')),
               (4, 23, 0, timestamptz('2020-01-26T10:40:28Z')),
               (4, 67, 0, timestamptz('2020-01-26T10:42:29Z')),
               (5, 12, 0, timestamptz('2020-01-26T10:30:23Z')),
               (5, 12, 0, timestamptz('2020-01-26T10:32:24Z')),
               (5, 32, 0, timestamptz('2020-01-26T10:34:25Z')),
               (5, 65, 0, timestamptz('2020-01-26T10:36:26Z')),
               (5, 54, 0, timestamptz('2020-01-26T10:38:27Z')),
               (5, 4, 0, timestamptz('2020-01-26T10:40:28Z')),
               (5, -12, 0, timestamptz('2020-01-26T10:42:29Z')),
               (6, 64, 0, timestamptz('2020-01-26T10:30:23Z')),
               (6, 45, 0, timestamptz('2020-01-26T10:32:24Z')),
               (6, 45, 0, timestamptz('2020-01-26T10:34:25Z')),
               (6, 7, 0, timestamptz('2020-01-26T10:36:26Z')),
               (6, 23, 0, timestamptz('2020-01-26T10:38:27Z')),
               (6, 32, 0, timestamptz('2020-01-26T10:40:28Z')),
               (6, 19, 0, timestamptz('2020-01-26T10:42:29Z'))
        `);

    pgm.sql(`INSERT INTO sensor_data(room_id, value, type, time)
        VALUES (1, 63, 4, timestamptz('2020-01-26T10:30:27Z')),
               (2, 55, 4, timestamptz('2020-01-26T10:30:28Z')),
               (3, 50, 4, timestamptz('2020-01-26T10:30:29Z'))
        `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('sensor_data');
    pgm.dropTable('rooms');
}
