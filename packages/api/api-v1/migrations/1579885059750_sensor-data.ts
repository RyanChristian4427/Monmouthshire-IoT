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
        VALUES (1, 'Master Bedroom', 1),
               (1, 'Guest Bedroom', 1)
        `);

    pgm.sql(`INSERT INTO sensor_data(room_id, value, type, time)
        VALUES (1, 72, 0, timestamptz('2020-01-26T10:30:23Z')),
               (2, 67, 0, timestamptz('2020-01-26T10:30:24Z')),
               (1, 74, 0, timestamptz('2020-01-26T10:30:25Z')),
               (2, 69, 0, timestamptz('2020-01-26T10:30:26Z')),
               (1, 71, 0, timestamptz('2020-01-26T10:30:27Z')),
               (2, 70, 0, timestamptz('2020-01-26T10:30:28Z')),
               (1, 71, 0, timestamptz('2020-01-26T10:30:29Z'))
        `);
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable('sensor_data');
    pgm.dropTable('rooms');
}
